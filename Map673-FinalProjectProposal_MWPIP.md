## Proposal - MAP673 Final Project
### Project Description and Title

**Project Title**

Rates of Detection of Bobcat, Coyote and Grey Fox Mount Tamalpais - 2014-2017

**Project Description**

My project will be an interactive map showing rates for rates of detection of three Mesocarnivores in the Mount Tamalpais region of North California.

### Map Objectives

**User Needs** This map is being made to allow the scientists identify patterns in generally in the numbers of species and how they change over relatively short periods of time and to identify seasonal patterns in the rates of detection. Since the extinction of many apex predators in North America, mesocarnivores play an essential role in function and health of an ecosystem. Becasue of this role,  this tool will allow users to make assumptions as to the general of health of Mt. Tamalpais.

**Persona** Janet Holbrook is director at a local non-profit and is writing a report that is produced every 5 years that looks at key indicators on the health of Mt. Tamalpais. She has experience with well known GIS tools such ArcGIS Desktop etc. She will use this tool to help develop key indicators for the 5 year report.

**Scenario** Janet would like to see the rates of detection for the month of December at a specfic camera. With this tool she can select all, a subset or a single camera along with a year and then use a time slider to provide her information for the three mesocarnivores of interest at any of the given locations and times.


### Data Sources

The samples provided are a polygon geojson of closures that is up to date as of 6/1/2020, a polyline shapefile of 6ft wide trails, and a polyline shapefile trails with use types respecively. The data from Marin County Parks, National Park Service, California State Parks, The Marin Municipal Water District and the Marin County Bicycle Coaltion (anticipated source not yet in hand).

**Data Samples:**
1. MarinClosures.geojson
2. GOGATrails_6ftWide.geojson
3. ONETAM_TRANS_Trails_ln.shp

### Methods of Thematic Representation

The map will display point features as hollow graduated symbols for three species at each camera location color coded by species

### Anticipated User Interface

The anticipated user interface will be a minimal bootstrap template that will use CSS to deploy the One Tam branding with custom fonts and color schemes. There will be a side bar with information about the project, data source and instructions on how to use the tool.  The map will consist of drop down filters letting end users pick a year of interest and camera of interest if need be. Once these variables are chosen the user will be able to use a time slider to move through all twelve months of the chosen year at all location or those of their choosing. 

### Technology Stack

1. QGIS will be used to wrangle the data and prepare use in the web application
2. Data will be in CSV and GeoJson format
3. Libraries used will be leaflet, jQuery and Omnivore
4. The map will use a bootstrap HTML template along with CSS, Assembly and native JavaScript
5. The hosting platform that will be used is GitHub pages












