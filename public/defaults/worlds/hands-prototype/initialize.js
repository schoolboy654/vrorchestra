this.initialize = function() {
  if (AFRAME.utils.device.checkHeadsetConnected()) {
    this.createHands()
  } else {
    this.createHands()
  }
}
