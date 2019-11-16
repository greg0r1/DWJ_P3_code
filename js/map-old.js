// Recup Json
// prend en paramètres le lien de la requête
// var requestJsonDataLink = "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b24e960af23e5b3e9278008070fd8a3a56b3d064";
// var request = new XMLHttpRequest();
// request.open("GET", requestJsonDataLink, false);
// request.send(null);
// var responseJson = request.responseText;

// var elementsArrayJson; -> un tableau d'objets du fichier JSON
// ajaxGet(requestJsonDataLink, function (responseJson) {
//    Transforme la réponse en tableau d'objets JavaScript
//   var arrayJson = JSON.parse(responseJson);
//   elementsArrayJson = arrayJson;
//   for (let index = 0; index < elementsArrayJson.length; index++) {}
// });

// Google Maps

function initMap() {
  var options = {
    zoom: 12,
    center: {
      lat: 45.75,
      lng: 4.85
    }
  };

  // new map
  var map = new google.maps.Map(document.getElementById("map"), options);

  function addMarker(props) {
    var infoWindow = new google.maps.InfoWindow();
    var iconGreen = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    var iconGoogle = iconGreen;
    var marker = new google.maps.Marker({position: props.position, map: map, title: props.name, icon: iconGoogle});
    if (props.status === "OPEN" && props.available_bikes > 0) {
      var contentWindow = "Station: " + props.name + "<br>" + props.status;
      infoWindow.setContent(contentWindow);
    } else {
      contentWindow = "La station est fermée" + props.number + "<br>" + props.status + "<br>" + props.available_bikes;
      infoWindow.setContent(contentWindow);
    } //else if (props.available_bikes === 0) {
    //   contentWindow = "Plus de vélo disponible :-(" + "<br>" + props.number + "<br>" + props.status + "<br>" + props.available_bikes;
    //   infoWindow.setContent(contentWindow);
    // }
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }

  //Tableau JSON à partir de l'api
  var arrayJson = $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b24e960af23e5b3e9278008070fd8a3a56b3d064", function (element) {
    for (const item of element) {
      addMarker(item);
    }
  });
}
