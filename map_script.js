//Initializing Leaflet map
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
//var drawnItems = new L.FeatureGroup();

var map = L.map('map');
map.setView([51.961, 7.618], 13);
map.addLayer(osm);