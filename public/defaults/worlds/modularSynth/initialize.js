this.initialize = function () {
  if (Object.getPrototypeOf(this).id.includes('scene.vwf')) {
      console.log("Initialize of Scene...", this.id)
      this.initAddButton([0,1,0], [0,0,0])
  }
}

this.initAddButton = function(pos,rot) {
  let addButton = {
      "extends": "proxy/aframe/abox.vwf",
      "children": {
        "material": {
          "extends": "proxy/aframe/aMaterialComponent.vwf",
          "properties": {
            "color": "#3c7249",
            "opacity": 0.5,
            "transparent": true
          }
        },
        "label": {
          "extends": "proxy/aframe/atext.vwf",
          "properties": {
            "value": "Add",
            "color": "#FFFFFF",
            "position": [0,0.2,0],
            "align": "center",
            "anchor": "center",
            "width": 1
          }
        }
      },
      "properties": {
        "position": pos,
        "rotation": rot,
        "width": 0.2,
        "height": 0.2,
        "depth": 0.2
      }
    }

  this.children.create("addButton", addButton)
  console.log("Initialized", this.addButton)
}
