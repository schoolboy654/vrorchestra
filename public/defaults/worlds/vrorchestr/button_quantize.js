this.intersectEventMethod = function() {
    this.width = this.width - 0.01
    this.parent.quantize_toggle=!this.parent.quantize_toggle
    var quantize_toggle = this.parent.quantize_toggle
    if (quantize_toggle === true) {
      this.parent.label_quantize.opacity = 1
      this.parent.label_quantize.button_quantize_change.opacity = 1
      this.parent.label_quantize_percentage.opacity = 1
    } else {
      this.parent.label_quantize.opacity = 0.2
      this.parent.label_quantize.button_quantize_change.opacity = 0.2
      this.parent.label_quantize_percentage.opacity = 0.2
    }
    this.parent.label_quantize.load_quantize()
    this.parent.label_quantize_percentage.load_quantize_percentage()
}
this.clearIntersectEventMethod = function() {
    this.width = 0.4
}
