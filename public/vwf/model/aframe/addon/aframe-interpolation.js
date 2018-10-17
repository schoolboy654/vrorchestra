
// Copyright (c) 2018 Nikolai Suslov
// Krestianstvo.org MIT license (https://github.com/NikolaySuslov/livecodingspace/blob/master/LICENSE.md)
//
//For using in LiveCoding.space and A-Frame 0.8.x
/* globals AFRAME, performance, THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('interpolation', {
  schema: {
    enabled: { default: true },
    deltaPos: { default: 0.001 },
    deltaRot: { default: 0.1 }
  },

  init: function () {

    this.driver = vwf.views["vwf/view/aframeComponent"];

  },

  update: function (oldData) {

    if (!this.interpolation) {
      this.deltaPos = parseFloat(this.data.deltaPos);
      this.deltaRot = THREE.Math.degToRad(parseFloat(this.data.deltaRot));

      this.enabled = JSON.parse(this.data.enabled);
      if (this.enabled) {
      }
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (t, dt) {

    if (!this.node) {
      let interNode = Object.entries(this.driver.state.nodes).find(el => 
        el[1].parentID == this.el.id && el[1].extendsID == "http://vwf.example.com/aframe/interpolation-component.vwf"
      );
      this.node = this.driver.nodes[interNode[0]];
      this.nodeState = interNode[1];
    }

    if (this.enabled && this.node && this.node.interpolate) {

      this.setInterpolatedTransforms(dt);
      //this.restoreTransforms();

    }

  },

  vecCmp: function (a, b, delta) {

    let distance = a.distanceTo(b);
    if (distance > delta) {
      return false;
    }

    return true;
  },

  restoreTransforms: function () {

    let r = new THREE.Euler();
    let rot = r.copy(this.node.interpolate.rotation.selfTick);

    if (rot && this.node.needTransformRestore) {
      this.el.object3D.rotation.set(rot.x, rot.y, rot.z)
      this.node.needTransformRestore = false;
    }

  },

  setInterpolatedTransforms: function (deltaTime) {

    var step = (this.node.tickTime) / (this.driver.realTickDif);
    step = Math.min(step, 1);
    deltaTime = Math.min(deltaTime, this.driver.realTickDif)
    this.node.tickTime += deltaTime || 0;

    this.interpolatePosition(step);
    this.interpolateRotation(step);

  },
  radians: function (degrees) {
    // return degrees * Math.PI / 180.0;
    return THREE.Math.degToRad(degrees)
  },

  interpolateRotation: function (step) {

    let last = this.node.interpolate.rotation.lastTick;
    let now = this.node.interpolate.rotation.selfTick;

    if (last && now) {

      let comp = this.vecCmp(last.toVector3(), now.toVector3(), this.deltaRot);

      if (!comp) {

        // console.log('Last:', last, ' Now: ', now);

        let lastV = (new THREE.Quaternion()).setFromEuler(new THREE.Euler(
          (last.x),
          (last.y),
          (last.z), 'YXZ'
        ));

        let nowV = (new THREE.Quaternion()).setFromEuler(new THREE.Euler(
          (now.x),
          (now.y),
          (now.z), 'YXZ'
        ));

        let q = new THREE.Quaternion();
        let e = new THREE.Euler();

        THREE.Quaternion.slerp(lastV, nowV, q, step || 0);
        let interp = e.setFromQuaternion(q, 'YXZ');

        this.el.object3D.rotation.set(interp.x, interp.y, interp.z);
        this.node.needTransformRestore = true;
      }
    }
  },

  interpolatePosition: function (step) {

    var last = this.node.interpolate.position.lastTick; //this.node.lastTickTransform;
    var now = this.node.interpolate.position.selfTick; //Transform;

    if (last && now) {

      let comp = this.vecCmp(last, now, this.deltaPos);

      if (!comp) {

        var lastV = (new THREE.Vector3()).copy(last);
        var nowV = (new THREE.Vector3()).copy(now);

        var interp = lastV.lerp(nowV, step || 0);
        //this.el.setAttribute('position',interp);

        this.el.object3D.position.set(interp.x, interp.y, interp.z);
        this.node.needTransformRestore = true;
      }
    }
  },
  pause: function () { },
  play: function () { }
});