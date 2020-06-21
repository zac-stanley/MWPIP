# MWPIP

Final Project link: https://zac-stanley.github.io/MWPIP/

Repo for interactive app of meso carnivore species rates of detection at locations in northern array of Marin wildlife picture index project.

### Methodology
The intent of this app is to give reasonably sophisticated users the ability gather trends about ecosystem health from three mesocarnivores. Data were provided as a long format csv consisting of species, cameraID, month and year and rate of detection. 

In order to to make the data usable for the intended interface and to display the data in a meaningful way a pivot table needed to be created that coded each species by consecutive month for a three year period i.e. b9-b45. In order to display these values in the slider a lookup js file had to be created that assigned the month and year to the slider control label allowing it to be understandable by the user. 

The map ended up being a tri-variate map that resulted in 4 different representations of the data shown in a dropdown UI element with the default map state being All Species:

1. All species
2. Bobcat only
3. Coyote only
4. Grey Fox only

One of the challenges of working with the data that forced moderation of expectations was the normalization of the data. This resulted in many cameras at the same location to have the same rate of detection and required re-thinking the symbology approach. Using hollow circles with different colors by species was no longer an option because you of couldn't differtiate between them. This realization helped guide the representations listed above.

The big conclusion that should come as no surprise is that the data needs to be thoroughly understood before committing to a project and setting expectations of the results of that project. The normalization rate and the resulting overlapping values would not come as a surprise had I spent to time thoroughly examining the data a testing different approaches to visualizing it. 


### Technology Stack
1. Excel and QGIS were used to wrangle the data and prepare use in the web application
2. Data is in CSV and GeoJson format
3. Libraries used will be leaflet, jQuery, and Omnivore
4. The app uses an Assembly HTML template along with CSS, and native JavaScript
5. The app is hosted GitHub pages