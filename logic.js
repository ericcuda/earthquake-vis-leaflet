// logic.js

// earthquakeURL:
// picking a data set from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php that is over a 
// most optimal data set return:  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
// below courtesy of github user Hugo Ahlenius ("fraxen" per assignment)..need the raw url, or will get CORS error
//var tectonicplatesURL = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json"
var tectonicplatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

function createFeatures(earthquakeData, tectdata) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    console.log("in createFeatures")

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    var earthquakes = L.geoJSON(earthquakeData, {

        // Run the onEachFeature function once for each piece of data in the array
        onEachFeature: function (feature, layer) {

            console.log("in onEachFeature")
            //console.log(feature.properties.place)
            layer.bindPopup("<h3>" + "Place: " + feature.properties.place +
                "<hr><p>" + "Date: " + new Date(feature.properties.time) + "</p>" +
                "<hr><p>" + "Magnitude: " + feature.properties.mag + "</p>");

        }, pointToLayer: function (feature, latlng) {
            return new L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                fillOpacity: 1,
                fillColor: markerColor(feature.properties.mag),
                stroke: false,
            })
        }
    });


    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, tectdata);
}

function createMap(earthquakes, tectdata) {
    console.log("in createMap")
    // Define streetmap and darkmap and sat layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.streets",
        accessToken: API_KEY
    });
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.dark",
        accessToken: API_KEY
    });
    var satmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    // define bonus tectonic plate layer group
    var tectonicPlates = new L.layerGroup();


    // Create a GeoJSON layer containing the features array on the tectdata object
    L.geoJSON(tectdata, {
        style: {
            color: 'orange',
            weight: 2,
            opacity: 1
        }
    }).addTo(tectonicPlates);


    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "World Map": streetmap,
        "Dark Map": darkmap,
        "Satelite Map": satmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        "Earthquakes": earthquakes,
        "Fault Lines": tectonicPlates
    };


    // Create our map, giving it the streetmap and earthquakes and tectonic plates layers to display on load
    var myMap = L.map("map", {
        center: [31.09, -99.71],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control.   
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    //add a legend, sourced from  https://leafletjs.com/examples/choropleth/#custom-legend-control
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitudes = [0, 1, 2, 3, 4, 5];

        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> ' +
                + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
        }

        return div;
    };
    legend.addTo(myMap);

};

function markerColor(mag) {
    if (mag <= 1) {
        return "#ADFF2F";
    } else if (mag <= 2) {
        return "#9ACD32";
    } else if (mag <= 3) {
        return "#FFFF00";
    } else if (mag <= 4) {
        return "#FFD700";
    } else if (mag <= 5) {
        return "#FFA500";
    } else {
        return "#FF0000";
    };
}

function markerSize(mag) {
    return mag * 27000;
}

(async function () {

    //get earthquake info into data
    console.log(earthquakeURL);
    console.log("Quake url: " + earthquakeURL)
    var data = await d3.json(earthquakeURL);
    console.log("Quake Data returning:")
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data)

    //get plate info into tectdata
    console.log("Tectonic plate url: " + tectonicplatesURL)
    var tectdata = await d3.json(tectonicplatesURL);
    console.log("Plate Data returning:")
    console.log(tectdata)

    createFeatures(data.features, tectdata);

})()



