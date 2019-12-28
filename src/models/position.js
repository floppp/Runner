function Position(lat, lng, alt, speed) {
  this.lat = lat;
  this.lng = lng;
  this.alt = alt;
  this.speed = speed;
  this.distance = 0;
  this.kmh = 0;
  this.minkm = 0;
}

Position.prototype.setDistance = function(lastPos) {
  if (lastPos) {
    this.distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(this.lat, this.lng),
      new window.google.maps.LatLng(lastPos.lat, lastPos.lng)
    );
  }
}

Position.prototype.setSpeedAndPace = function(time) {
  if (this.distance) {
    this.kmh = this.distance / time * 1000 * 3.6;
    this.minkm = 60 / this.kmh;
  } else {
    this.kmh = 0;
    this.minkm = 0;
  }
}

export default Position;