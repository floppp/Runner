function Route(id, coordinates, title='Título') {
    this.id = id;
    this.coordinates = coordinates;
    this.title = title;
    this.date = new Date().getTime();
}

export default Route;