var isRecordingStarted = false;
var isStoppedRecording = false;

(function looper() {
    if (!isRecordingStarted) {
        return setTimeout(looper, 500);
    }

    html2canvas(elementToShare, {
        grabMouse: true,
        onrendered: function (canvas) {
            context.clearRect(0, 0, canvas2d.width, canvas2d.height);
            context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

            if (isStoppedRecording) {
                return;
            }

            setTimeout(looper, 1);
        }
    });
})();


var recorder = new RecordRTC(canvas2d, {
    type: 'canvas'
});

document.getElementById('start').onclick = function () {
    document.getElementById('start').disabled = true;

    isStoppedRecording = false;
    isRecordingStarted = true;

    playVideo(function () {
        recorder.startRecording();
        setTimeout(function () {
            document.getElementById('stop').disabled = false;
        }, 1000);
    });
};

function querySelectorAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
}

document.getElementById('stop').onclick = function () {
    this.disabled = true;

    isStoppedRecording = true;

    recorder.stopRecording(function () {
        querySelectorAll('video').forEach(function (video) {
            video.pause();
            video.removeAttribute('src');
        });

        videoElement.stream.getTracks().forEach(function (track) {
            track.stop();
        });

        document.body.innerHTML = '';
        document.body.style = 'margin: 0; padding: 0;background: black; text-align: center; overflow: hidden;';

        var blob = recorder.getBlob();

        var video = document.createElement('video');
        video.src = URL.createObjectURL(blob);
        video.setAttribute('style', 'height: 100%;');
        document.body.appendChild(video);
        video.controls = true;
        video.play();
    });
};

window.onbeforeunload = function () {
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
};

var videoElement = document.querySelector('#camera');
function playVideo(callback) {
    function successCallback(stream) {
        videoElement.stream = stream;
        videoElement.onloadedmetadata = function () {
            callback();
        };
        videoElement.srcObject = stream;
    }

    function errorCallback(error) {
        console.error('get-user-media error', error);
        callback();
    }

    var mediaConstraints = { video: true };

    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

// canvas animation
(function () {
    if (!innerWidth) var innerWidth = document.body.clientWidth;
    if (!innerHeight) var innerHeight = document.body.clientHeight;
    innerHeight = innerHeight - (innerHeight / 3);

    document.createElement("canvas").getContext ? (function () { function a() { s.closePath(), s.fillStyle = "rgba(" + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", .9)", s.fill(), s.beginPath() } function l() { var v; c += 5, h === 1 && (t += 5, o += 5, n += 5, u += 5, c > 20 && (h = 2)), h === 2 && (t -= 5, o -= 5, n -= 5, u -= 5, c > 40 && (h = 3)), h === 3 && (f += 5, r += 5, i += 5, e += 5, c > 60 && (h = 4)), h === 4 && (f -= 5, r -= 5, i -= 5, e -= 5, c > 80 && (c = 0, h = 1)), s.clearRect(0, 0, 5e4, 5e4); var y = [[t, n], [t, n], [t + 269, n + 69], [t + 269, n + 69], [t + 211, n - 162], [t + 211, n - 162], [t + 23, n - 213], [t + 23, n - 213], [t - 165, n - 60], [t - 165, n - 60], [t - 72, n + 116], [t - 72, n + 116], [t + 74, n + 117], [t + 74, n + 117], [t + 128, n + 128], [t + 128, n + 128], [t + 274, n + 15], [t + 274, n + 15], [t + 137, n - 158], [t + 137, n - 158], [t - 80, n - 97], [t - 80, n - 97], [t - 114, n - 10], [t - 114, n - 10], [t - 165, n - 57], [t - 165, n - 57], [t - 72, n + 118], [t - 72, n + 118], [t + 72, n + 117], [t + 72, n + 117], [t + 268, n + 67], [t + 268, n + 67], [t + 211, n - 162], [t + 211, n - 162], [t + 24, n - 211], [t + 24, n - 211]], p = [[f, i, r, e, o, u], [f + 95, i + 139, r - 46, e + 104, o, u], [f + 186, i + 153, r - 44, e + 97, o + 29, u + 3], [f + 326, i + 112, r + 24, e + 55, o + 29, u + 3], [f + 317, i + 12, r - 7, e + 77, o + 5, u - 65], [f + 262, i - 64, r - 58, e - 55, o + 5, u - 65], [f + 154, i - 43, r - 116, e + 6, o - 88, u - 76], [f + 72, i - 84, r - 187, e - 35, o - 88, u - 76], [f - 81, i + 111, r - 162, e + 70, o - 142, u - 39], [f - 51, i + 31, r - 195, e - 15, o - 142, u - 39], [f + 78, i + 239, r - 123, e + 142, o - 124, u + 47], [f - 9, i + 207, r - 250, e + 109, o - 124, u + 47], [f + 107, i + 229, r - 162, e + 130, o - 55, u + 61], [f + 206, i + 213, r - 81, e + 127, o - 55, u + 61], [f + 196, i + 191, r + 67, e + 166, o + 151, u + 108], [f + 250, i + 283, r + 110, e + 204, o + 151, u + 108], [f + 283, i + 100, r + 87, e + 12, o + 136, u - 78], [f + 409, i + 38, r + 137, e - 10, o + 136, u - 78], [f + 164, i - 44, r - 76, e - 50, o - 36, u - 163], [f + 204, i - 101, r - 53, e - 107, o - 36, u - 163], [f + 23, i - 2, r - 156, e - 53, o - 118, u - 132], [f - 43, i - 51, r - 162, e - 77, o - 118, u - 132], [f - 26, i + 101, r - 190, e + 86, o - 189, u + 73], [f - 65, i + 121, r - 264, e + 117, o - 189, u + 73], [f - 65, i + 121, r - 264, e + 117, o - 363, u - 30], [f - 55, i + 5, r - 326, e - 61, o - 363, u - 30], [f - 61, i + 140, r - 261, e + 205, o - 239, u + 204], [f + 101, i + 266, r - 208, e + 249, o - 239, u + 204], [f + 110, i + 237, r - 161, e + 190, o - 22, u + 238], [f + 110, i + 237, r + 47, e + 161, o - 22, u + 238], [f + 309, i + 214, r + 121, e + 202, o + 254, u + 160], [f + 309, i + 214, r + 192, e + 61, o + 254, u + 160], [f + 325, i + 14, r + 161, e - 98, o + 178, u - 203], [f + 239, i - 124, r + 116, e - 130, o + 178, u - 203], [f + 179, i - 105, r - 74, e - 175, o - 104, u - 255], [f + 13, i - 51, r - 152, e - 169, o - 104, u - 255]], w = 36; for (v = 0; v < w; v++)s.moveTo(y[v][0], y[v][1]), s.bezierCurveTo(p[v][0], p[v][1], p[v][2], p[v][3], p[v][4], p[v][5]), s.translate(y[v][0], y[v][1]), s.rotate(.001), s.translate(-y[v][0], -y[v][1]), a(); oninterval(l) } var s; window.oninterval = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) { window.setTimeout(n, 1e3 / 60) } }(), s = document.getElementById("animation").getContext("2d"), s.canvas.width = innerWidth, s.canvas.height = innerHeight, s.lineWidth = 2; var c = 0, h = 1, t = 396, n = 342, f = 339, i = 232, r = 529, e = 255, o = 498, u = 322; l() })() : (alert("Your browser is not supporting HTML5 Canvas APIs!"))
})();