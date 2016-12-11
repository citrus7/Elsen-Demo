'use strict';
/**
 * @ngdoc function
 * @name elsenApp.services:DataServcice
 * @description
 * # DataService
 * Service for transforming the CSV into a useable format
 */
angular.module('elsenApp')
	.factory('DataService', ['$q', 'Papa', function ($q, Papa) {
		/**
		* Load and Parse CSV Data
		**/
		function loadData() {
			var deferred = $q.defer();
			var dataMap = {};
			var skipFirst = false;
			//hosted file: https://citrus7.github.io/Elsen-Demo/dist/timeseries.csv
			//local: /timeseries.csv
			Papa.parse('/timeseries.csv', {
				download: true,
				worker: true,
				step: function(row) {
					// Sort items into a map
					// Format of the map is identifier: [start date, end date, count, [all data]]
					
					// Skip first row of data
					if (skipFirst === false) {
						skipFirst = true;
					}
					// If Identifier key exists in map:
					else if (dataMap.hasOwnProperty(row.data[0][0])) {
						// Format raw data into epoch time and floats
						var formattedData = [Date.parse(row.data[0][1]),parseFloat(row.data[0][2])];
						// Add data, compare dates to start/end date, increment count
						dataMap[row.data[0][0]][3].push(formattedData);
						dataMap[row.data[0][0]][2] += 1;
						if (Date.parse(row.data[0][1]) < Date.parse(dataMap[row.data[0][0]][0])) {
							dataMap[row.data[0][0]][0] = row.data[0][1];
						}
						if (Date.parse(row.data[0][1]) > Date.parse(dataMap[row.data[0][0]][1])) {
							dataMap[row.data[0][0]][1] = row.data[0][1];
						}
					}
					// Else create key and add entry:
					else {
						var formattedData = [Date.parse(row.data[0][1]),parseFloat(row.data[0][2])];
						dataMap[row.data[0][0]] = [row.data[0][1], row.data[0][1], 1, [formattedData]];
					}
				},
				complete: function() {
					deferred.resolve(dataMap);
				}
			});
			return deferred.promise;
		}
		
		return {
			loadData:loadData
		};
		
	}]);