this.checkElement = function(element, index, array, quantize) {
  var quantize_percentage = this.parent.parent.quantize_percentage
  if (element === quantize_percentage) {
    return true
  }
}
this.intersectEventMethod = function() {
    var quantize_percentage_list=[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1]
    this.width = this.width - 0.01
    var quantize_percentage = this.parent.parent.quantize_percentage
    var quantize_percentage_newIndex = quantize_percentage_list.findIndex(this.checkElement, this)+1
    if (quantize_percentage_newIndex === quantize_percentage_list.length) {
      quantize_percentage_newIndex = 0
    }
    this.parent.parent.quantize_percentage = quantize_percentage_list[quantize_percentage_newIndex]
    this.parent.load_quantize_percentage()
}
this.clearIntersectEventMethod = function() {
    this.width = 0.1
}
