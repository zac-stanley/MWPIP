## Proposal - MAP673 Final Project
### Project Description and Title

**Project Title**

Rates of Detection of Bobcat, Coyote and Grey Fox Mount Tamalpais - 2014-2017

**Project Description**

My project will be an interactive map showing rates for rates of detection of three Mesocarnivores in the Mount Tamalpais region of North California. The map will consist of a a drop filter letting end users pick a year of interest and camera of interest if need be. Once these variable are chose the user will be able to use a time slider to move through all twelve months of the chosen year at all location or those of their choosing. 

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

The map will display point features as graduated symbols

### Anticipated User Interface

The anticipated user interface will be a bootstrap template that will use CSS to deploy the One Tam branding with custom fonts and color schemes. The title bar/banner will likely have a photo background and the logos of the four partner agencies. There will be a side bar with extensive information about agency updates and hyperlinks to their sites. Inside the map area there will be a dynamic legend that changes as a dropdown filter status changes: Open, Open with Parking Restrictions, Open to walk, bike and horse access and Closed. The park features themselves will have a popup or tooltip with the park name, its closure status, a photo of the park and summary statisics about the type of trails that exist there with mileage by type summarized. There will all be a control object that will allow a layer of bicycle routes to be turned on and off, these routes will be classified to show some level of safety for bike access to sites (can be more specific when I have data in hand)

### Technology Stack

1. QGIS will be used to wrangle the data and prepare use in the web application
2. Park boundaries will be hosted as public hosted feature layers on ArcGIS Online (I know this is an open source course - I hope this is ok) that all agencies can update, administrative boundaries and bike route data will be stored in the app as geoJson/js files
3. Libraries used will be leaflet, jQuery and Esri leaflet tools 
4. The map will use a bootstrap HTML template along with CSS and native JavaScript
5. The hosting platform that will be used is GitHub pages












