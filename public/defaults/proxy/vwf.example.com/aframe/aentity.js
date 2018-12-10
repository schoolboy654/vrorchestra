this.getChildByName = function(name){
    let nodes = this.children.filter(el=>el.displayName == name);
    return nodes[0]
}

this.setGizmoMode = function (mode) {
    if (this.gizmo) {
        this.gizmo.properties.mode = mode
    }
}

this.showCloseGizmo = function () {
    let gizmoNode =
        {
            "extends": "http://vwf.example.com/aframe/gizmoComponent.vwf",
            "type": "component",
            "properties":
            {
                "mode": "translate"
            }
        }
    if (this.properties.edit) {
        this.children.create("gizmo", gizmoNode);
    } else {
        if (this.gizmo) {
            this.children.delete(this.gizmo)
        }
    }
}

  // Parse a parameter as a translation specification.
  this.translationFromValue = function( propertyValue ) {

      var value = goog.vec.Vec3.create();
    if (propertyValue.hasOwnProperty('x')) {
        value = goog.vec.Vec3.createFromValues(propertyValue.x, propertyValue.y,  propertyValue.z)
    } 
    else if (Array.isArray(propertyValue) || propertyValue instanceof Float32Array ) {
        value = goog.vec.Vec3.createFromArray(propertyValue);}
    else if (typeof propertyValue === 'string') {
        let val = AFRAME.utils.coordinates.parse(propertyValue);
        value = goog.vec.Vec3.createFromValues(val.x, val.y, val.z)
        }

    return value


    // return value && value.length >= 3 ?
    //   value :
    //   goog.vec.Vec3.create();
  };

  this.sendOSC = function(msg){
        //sending OSC msg

        vwf_view.kernel.fireEvent(this.id, "sendOSC", [msg]);

        // if (_OSCManager.port !== null) {
        //     _OSCManager.port.send(msg);
        // }
    
        //on driver side
    
  }

  this.intersectEvent = function(){
    //this.intersectEventMethod();
   }
   this.clearIntersectEvent = function(){
    //this.clearIntersectEventMethod();
   }

  this.intersectEventMethod = function(){

        //intersect method
  }


    this.clearIntersectEventMethod = function(){
        
         //clearIntersect method

    }