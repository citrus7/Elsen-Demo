# elsen

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

A live demo can be viewed here: https://citrus7.github.io/Elsen-Demo/demo/#!/
- Click on items in the list to display a graph
- Click on table headers to sort that column

## Build & development

###If you have cloned this repository and are running for the first time you must run these commands:

`bower install`

`npm install`

Following that you can run `grunt serve` for preview.

If the CSV file is not loading check that it's present in /app and that the uri in dataService.js is set to the correct location

## Testing

Running `grunt test` will run the unit tests with karma.

## Contents
The following is where most of the interesting logic are located:

app/scripts/services/dataService.js
Contains the logic to load and parse the CSV file

app/scripts/controllers/main.js
Contains the logic for the main page
Contains functions to display the table of data, draw the chart, sort and select items in the table, etc

app/views/main.html
Contains the HTML of the main page

styles/main.css
A couple of styles for formatting

## Note:
It seems like PapaParse can't be minified so I've placed the include line outside of the grunt build section in index.html.  When building (grunt build or grunt serve:dist) papaparse.min.js must be copied into dist manually and the include line in index.html must be changed to its location.