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
  this.core.radius = 0.2
  var quantize_toggle = this.parent.quantize_toggle
  if (quantize_toggle === true) {
    this.synth.triggerAttackRelease(['C2'], ['8n'], Tone.Time(Tone.now()).quantize(this.parent.quantize, this.parent.quantize_percentage), 0.3)
  } else {
    this.synth.triggerAttackRelease(['C2'], ['8n'], null, 0.3)
  }
}

this.clearIntersectEventMethod = function() {
  this.core.radius = 0.19
}
