this.load_quantize = function() {
  var labelstart="Quantize"
  var number=this.parent.quantize.slice(0,-1)
  console
  this.value=labelstart+" "+number+"th"+" "+"note"
}

this.load_quantize_percentage = function() {
  var labelstart="Quantize percentage"
  var number=this.parent.quantize_percentage*100
  this.value=labelstart+" "+number+"%"
}
