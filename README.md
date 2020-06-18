# MWPIP
Repo for interactive map of meso carnivore species rates of detection at locations in northern array of Marin wildlife picture index project.
### Methodology
Data were provided as a long format csv consisting of species, cameraID, month and year. In orer to to make the time slider UI element work a pivot needed to be created that that coded each species by consecutive month for a three year period i.e. b9-b45. In order to display these values in the slider a lookup had to be created that made the month and year understandable by the user. 

For the HTML a simple Assembly sidebar template was used. 

### Technology Stack

1. Excel and QGIS will be used to wrangle the data and prepare use in the web application
2. Data will be in CSV and GeoJson format
3. Libraries used will be leaflet, jQuery, and Omnivore
4. The map will use a bootstrap or flexbox HTML template along with CSS, Assembly and native JavaScript
5. The hosting platform that will be used is GitHub pages