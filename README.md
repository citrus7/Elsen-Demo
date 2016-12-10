# elsen

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

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