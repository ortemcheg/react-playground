ymaps.ready(function() {
  var myMap = new ymaps.Map("map", {
    center: [55.809, 38.438],
    zoom: 17,
    controls: []
  });
  ymaps.theMap = myMap;
  myMap.setType("yandex#satellite");
  const stalCoords = ymaps.geocode("Электросталь");
  stalCoords
    .then(res =>
      res.geoObjects.each(geoObj => {
        let coords = geoObj.geometry.getCoordinates();
        AddGeoObj(myMap, coords);
        console.log(`Coordinates: ${coords}`);
      })
    )
    .catch(err => console.log("Geocoding error", err));
});

function AddGeoObj(map, coords) {
  console.log("Hoho!");
  const placeMark = new ymaps.Placemark(coords);
  map.geoObjects.add(placeMark);
}
const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", () => {
  AddGeoObj(ymaps.theMap, [55.808628, 38.436736]);
});