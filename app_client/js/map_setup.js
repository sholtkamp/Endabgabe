//Initializing Leaflet map
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 12, attribution: osmAttrib});

var map = L.map('map');
map.setView([40.6, -0.944844], 6);
map.addLayer(osm);

logger.info("Map is ready");

var baseMaps = {
    "OSM-Basemap": osm,
};

var feature_group =  new L.FeatureGroup().addTo(map);

var layerControl = L.control.layers(baseMaps, null, {position: "topleft"}).addTo(map);

logger.info("Map Control is ready");
