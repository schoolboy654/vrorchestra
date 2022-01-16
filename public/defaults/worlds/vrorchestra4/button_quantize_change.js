this.checkElement = function(element, index, array, quantize) {
  var quantize = this.parent.parent.quantize
  if (element === quantize) {
    return true
  }
}
this.intersectEventMethod = function() {
    var quantize_list=["128n","64n","32n","16n","8n","4n","2n"]
    this.width = this.width - 0.01
    var quantize = this.parent.parent.quantize
    var quantize_newIndex = quantize_list.findIndex(this.checkElement, this)+1
    if (quantize_newIndex === quantize_list.length) {
      quantize_newIndex = 0
    }
    this.parent.parent.quantize = quantize_list[quantize_newIndex]
    this.parent.load_quantize()
}
this.clearIntersectEventMethod = function() {
    this.width = 0.1
}
