

this.setupSequencer = function() {
  //let timeline=this.setupTimeline()
  //this.setupBeat(1, timeline)

  this.opacity=0
  this.firstChild.opacity=0
  this.position = [0,-10, 0]
  //this.setupPlayButton()
  //this.setupNavigation()
  //this.setupAddBeatButton()
}

this.intersectEventMethod = function() {
  this.setupSequencer()
}

this.setupTimeline = function() {

  let timeline = {
      "extends": "proxy/aframe/abox.vwf",
      "properties": {
        "position": [0,0,0],
        "width": 0.1,
        "depth": 2,
        "height": 1.5
      },
      "children": {}
  }

  this.parent.children.create("timeline", timeline)
  return timeline
}


this.setupBeat = function(beatnum, timeline) {
  let beat = {
      "extends": "proxy/aframe/abox.vwf",
      "properties": {
        "position": [0,0,0],
        "width": 0.1,
        "depth": 2,
        "height": 1.5,
        "beatnum": beatnum
      }
  }
  timeline.children.create("beat"+beatnum, beat)
}
