class myMap {
  constructor() {
    this.iconsMarkers = {
      iconMakerGreen: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      iconMakerRed: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      iconMakerOrange: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
    };
  }

  initMap() {
    let initMapOptions = {
      zoom: 12,
      center: {
        lat: 45.75,
        lng: 4.85
      }
    };
    let map = new google.maps.Map(document.getElementById("map"), initMapOptions);
    var addWindowInfo = this.addWindowInfo;

    function addMarker(props) {
      var infoWindow = new google.maps.InfoWindow();
      if (props.status === "OPEN") {
        var icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      }
      if (props.status === "CLOSED") {
        icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      }
      if (props.available_bikes > 0 && props.available_bikes < 3 && props.status === "OPEN") {
        icon = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      }

      var marker = new google.maps.Marker({position: props.position, map: map, title: props.name, icon: icon});

      if (props.status === "OPEN") {
        var statusStation = "Ouvert";
        var contentWindow = "Station: " + props.name + "<br>" + statusStation + "<br>" + "Vélos disponibles: " + props.available_bikes;
        infoWindow.setContent(contentWindow);
      } else {
        statusStation = "fermée";
        contentWindow = "La station " + props.number + " est " + statusStation + "<br>" + "Vélos disponibles: " + props.available_bikes;
        infoWindow.setContent(contentWindow);
      }

      function addWindowInfo() {
        $("#map").after("<div></div>");
        $("#map+div").addClass("popup-container");
        $(".popup-container").append("<p></p>");
        $(".popup-container>p").append(props.name);
      }

      marker.addListener("click", function () {
        addWindowInfo();
      });
    }

    var getJSON = $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=b24e960af23e5b3e9278008070fd8a3a56b3d064", function (element) {
      for (const item of element) {
        addMarker(item);
      }
    });
  }
}
