this.initialize = function() {
  if (Object.getPrototypeOf(this).id.includes('scene.vwf')) {
      console.log("Initialize of Scene...", this.id)
      this.createInstruments()
  }
}

this.iterateSynths = function(array, index) {
  let instrumentBox = {
    "extends": "proxy/aframe/abox.vwf",
    "properties": {
      "position": [0+index,1,-1],
      "color": "#000000",
      "height": 0.3,
      "width": 0.3,
      "depth": 0.3,
    },
    "methods": {
      "clickEventMethod": {},
      "intersectEventMethod": {},
      "clearIntersectEventMethod": {},
      "generateColor": {}
    },
    "scripts": {
      "source": "instrumentBox.js"
    }
  }
  this.children.create(array[index]+"Box", instrumentBox)


  //console.log("Created instrument box", synths[i])
  //let synth = {
  //  "extends": "proxy/synths/"+synths[i]+".vwf"
  //}
  //console.log(this.children[synths[i]])
  //this.children[synths[i]].children.create(synths[i], synth)
  //console.log("Created synth", synths[i], "in", synths[i],"box")

}

this.createInstruments = function() {
  console.log("Creating Instruments")
  let synths=[
    "sawtooth",
    "sine"
  ]
  console.log(synths.length)
  for (var i = 0; i < 5; i++) {
    console.log(i)
  }
}
