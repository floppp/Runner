const mapsModule = (function() {
  return {
    renderMap: function(mapDom, position, zoom=10) {
      const options = {
        center          : position,
        disableDefaultUI: true,
        mapTypeId       : window.google.maps.MapTypeId.ROADMAP,
        zoom            : zoom,
      }
      
      const map = new window.google.maps.Map(mapDom, options);
      
      return map;
    },

    createMarker: function(map, position) {
      return new window.google.maps.Marker({
        position:  new window.google.maps.LatLng(position),
        map:       map,
      })
    }
  }
}());

export default mapsModule;
