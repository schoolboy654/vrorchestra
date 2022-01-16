this.clickEventMethod = function() {
  let genColor = this.generateColor()
  this.color = genColor
}

this.intersectEventMethod = function() {
   //this.synth.triggerAttack(['C4'], ['2n'], null, 0.3)
}

this.clearIntersectEventMethod = function() {

}

this.generateColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(this.random() * 16)];
  }
  return color
}
