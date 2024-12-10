/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

AFRAME.registerComponent('cloak', {
    init: function () {
        var geometry = new THREE.BoxGeometry(1.1, 0.2, 1.1);
        var material = new THREE.MeshBasicMaterial({ colorWrite: false });
        var cube = new THREE.Mesh(geometry, material);
        this.el.object3D.add(cube);
    }
});

function recStart() {
    console.log("print Click start");
    var recorder = document.querySelector('[recorder]');
    recorder.dispatchEvent(new CustomEvent('start'));
}

function recStop() {
    console.log("print Click stop");
    var recorder = document.querySelector('[recorder]');
    recorder.dispatchEvent(new CustomEvent('stop'));
}



AFRAME.registerComponent('limit-my-distance', {
    init: function () {
        // nothing here
    },
    tick: function () {
        // limit Z
        if (this.el.object3D.position.z > 9) {
            this.el.object3D.position.z = 9;
        }
        if (this.el.object3D.position.z < -9) {
            this.el.object3D.position.z = -9;
        }

        // limit X
        if (this.el.object3D.position.x > 9) {
            this.el.object3D.position.x = 9;
        }
        if (this.el.object3D.position.x < -9) {
            this.el.object3D.position.x = -9;
        }

    }
});

AFRAME.registerComponent('foo', {
    init: function () {

        this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
        this.el.addEventListener('collide', function (e) {
            console.log('Player has collided with ', e.detail.body.el);
        });
    },
    tick: function (t, dt) { }
});



// var m = document.querySelector("a-marker")
// m.addEventListener("markerFound", (e) => {
//     console.log("found")
// })

// m.addEventListener("markerLost", (e) => {
//     console.log("lost")
// })