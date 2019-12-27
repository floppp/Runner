function Route(coordinates, title='Título') {
    this.coordinates = coordinates;
    this.title = title;
    this.date = new Date().getTime();
}

export default Route;