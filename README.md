# Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

Eric Staveley  (MWSa)
Data Analytics and Visualization Bootcamp  
Date Due:  29May2019

Required:
Run a simple server to view index.html from the VS Code terminal:  
python -m http.server  
For the url:  use localhost:8000/index.html  

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Visualize an earthquake data set.

1. **Get your data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   We created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * Your data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes  appear larger and darker in color.

   * Included popups that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that will provide context for your map data.

   * The visualization is the map above.

- - -

### Level 2: More Data (Optional)


The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

![6-Advanced Plate Data](Images/6-Advanced.png)

---
In this step we..

* Plotted a second data set on our map.

* Added a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Added layer controls to our map..and it looks like:

![5-Advanced](Images/5-Advanced.png)

