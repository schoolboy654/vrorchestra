
this.generateColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(this.random() * 16)];
  }
  return color
}

this.clickEventMethod = function() {
  let genColor = this.generateColor();
  this.material.color = genColor
}
this.intersectEventMethod = function() {
  this.core.height = 0.02
  this.core.width = 0.19
  this.core.depth = 0.19
  var quantize_toggle = this.parent.quantize_toggle
  if (quantize_toggle === true) {
    this.synth.triggerAttackRelease([this.frequency], ['8n'], Tone.Time(Tone.now()).quantize(this.parent.quantize, this.parent.quantize_percentage), 0.3)
  } else {
    this.synth.triggerAttackRelease([this.frequency], ['8n'], null, 0.3)
  }
}

this.clearIntersectEventMethod = function() {
  this.core.height = 0.02
  this.core.width = 0.18
  this.core.depth = 0.18
}
