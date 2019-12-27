function Route(id, coordinates, title, time, distance) {
    this.id          = id;
    this.coordinates = coordinates;
    this.title       = title;
    this.date        = new Date().getTime();
    this.time        = time;
    this.distance    = distance;
    this.kmh         = distance / time * 1000 * 3.6;
}

export default Route;