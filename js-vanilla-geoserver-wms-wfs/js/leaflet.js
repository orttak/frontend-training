//geoserver settings
geoserverUrl = "http://localhost:8080/geoserver/"; //geoserver url
var workspace_name = 'vector'; //workspace name
var layer_name = 'bezirke'
const getWmsBaseUrl = (workspace) => {
    //geoserver_url = http://localhost:8080/geoserver/
    //console.log(`${geoserverUrl}${workspace}/wms`);
    return `${geoserverUrl}${workspace}/wms`;
};

var wms = L.tileLayer.wms(
    getWmsBaseUrl(workspace_name),
    {
      layers: `${workspace_name}:${layer_name}`,
      format: 'image/png',
      transparent: true,
      tiled: true,
      attribution : "bezirke data from geoserver"
    }
  );

// Define WFS URL
var url_geoserver_wfs = "http://localhost:8080/geoserver/vector/ows?";
var wfsURL_metro = url_geoserver_wfs +
  "service=WFS&version=1.0.0&request=GetFeature&typeName=vector%3Ametro_station&maxFeatures=50&outputFormat=application%2Fjson";
var wfsURL_stadtteile= url_geoserver_wfs +
"service=WFS&version=1.0.0&request=GetFeature&typeName=vector%3Astadtteile&maxFeatures=50&outputFormat=application%2Fjson";
// Create WFS layer group
var metroWFS = L.featureGroup();
var stadtteileWFS = L.featureGroup();

// Fetch WFS GeoJSON data and add to map
async function addWFSPoint(wfsURL,featureGroup) {
  try {
    const response = await fetch(wfsURL);
    const data = await response.json();
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        var popupContent = "<h3>Station Name: " + feature.properties.name + "</h3>";
        layer.bindPopup(popupContent);
      },
    }).addTo(featureGroup);
  } catch (error) {
    console.log(error);
  }
}
addWFSPoint(wfsURL_metro,metroWFS);

// ADD polygon feature from WFS
async function addWFSPolygon(wfsURL, featureGroup, inputValue) {
  try {
    const response = await fetch(wfsURL);
    const data = await response.json();
    L.geoJSON(data, {
      filter: function(feature) {
        if (inputValue === "") {
          return true; // Show all polygons if inputValue is empty
        } else {
          return feature.properties.name.toLowerCase().includes(inputValue.toLowerCase()); // Filter polygons based on inputValue
        }
      },
      style: function (feature) {
        return {
          color: 'red',
          fillColor: 'lightblue',
          weight: 1
        }
      },
      onEachFeature: function (feature, layer) {
        var popupContent = "<h3>Station Name: " + feature.properties.name + "</h3>";
        for (var key in feature.properties) {
          if (key !== 'name') { // exclude 'name' property if desired
            popupContent += "<p>" + key + ": " + feature.properties[key] + "</p>";
          }
        }        
        layer.bindPopup(popupContent);
      }
    }).addTo(featureGroup);
  } catch (error) {
    console.log(error);
  }
}

// Call the addWFS function to add the layer to the map
addWFSPolygon(wfsURL_stadtteile, stadtteileWFS, "");

// //fucntion to search keyword from WFS service
var searchWFS = function() {
  var queryBox = document.getElementById("search-value");
  var inputValue = queryBox.value.trim().toLowerCase();
  stadtteileWFS.clearLayers(); // Remove current layer before adding the new filtered layer
  addWFSPolygon(wfsURL_stadtteile, stadtteileWFS, inputValue);
};

// Call addWFSPolygon function again when the search box value changes
document.getElementById("search-value").addEventListener("input", function() {
  var inputValue = this.value.trim().toLowerCase();
  stadtteileWFS.clearLayers(); // Remove current layer before adding the new filtered layer
  if (inputValue === "") {
    addWFSPolygon(wfsURL_stadtteile, stadtteileWFS, "");
  } else {
    addWFSPolygon(wfsURL_stadtteile, stadtteileWFS, inputValue);
  }
})
var clearResult   = function(feature) {
  document.getElementById("search-value").value = ''
  stadtteileWFS.clearLayers(); // Remove current layer before adding the new unfiltered layer
  addWFSPolygon(wfsURL_stadtteile, stadtteileWFS,''); // Add unfiltered layer
  return false;
}


const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const hot = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; Humanitarian map style by <a href="https://www.hotosm.org/">HOT</a>'
});


var myAttr = "";
// var osm = L.tileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: myAttr});


var map = L.map('map', {
    center: [53.50011419758796,10.125417177488977],
    zoom: 8,
    minZoom: 5,
    // when you write layer into layers, it will be added to the map
    layers: [osm]
});
//web service laters
var baseLayers = {
    "OpenStreetMap": osm,
    "Hot-Osm": hot
    
};

//Overlay layers
var overlayLayers = { 
    'bezirke': wms,
    "metroWFS" : metroWFS,
    "stadtteileWFS" : stadtteileWFS
    
 };

//add base layers
var controlLayers = L.control.layers(baseLayers, overlayLayers,
    {
        collapsed: true
    }).addTo(map);
// add base layers
// var controlLayers = L.control.layers(baseLayers,{},{collapse:false}).addTo(map);
// var controlLayers = L.control.layers(overlayLayers).addTo(map);

