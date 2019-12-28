function Route(id, coordinates, title, time) {
  this.id          = id;
  this.coordinates = coordinates;
  this.title       = title;
  this.date        = new Date().getTime();
  this.time        = time;
  this.distance    = coordinates.reduce((acc, c) => acc + c.distance, 0);
  this.kmh         = this.distance / time * 1000 * 3.6;
  this.center      = getCenter(this);
}

function getCenter(route) {
  const sum = route.coordinates.reduce((acc, c) => {
      acc.lat += c.lat;
      acc.lng += c.lng;

      return acc;
  }, { lat: 0, lng: 0 });
  console.log('casa');
  return { lat: sum.lat / route.coordinates.length, lng: sum.lng / route.coordinates.length };
}


export default Route;