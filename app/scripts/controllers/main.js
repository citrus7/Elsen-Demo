'use strict';

/**
 * @ngdoc function
 * @name elsenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elsenApp
 */
angular.module('elsenApp')
  .controller('MainCtrl', ['$scope', '$filter', 'DataService', function ($scope, $filter, DataService) {

  	$scope.users = [];
	$scope.editRow = "";
	$scope.dataMap = {};
	$scope.dataArray = [];
	$scope.idSelectedRow = null;
	
	init();

	/**
	* Init:
	* Service call to load data from CSV
	* Maps data from JSON to an array
	**/
	function init() {
		DataService.loadData().then(function(data){
			$scope.dataMap = data;
			$scope.dataArray = $.map(data, function(value, key){
				return {'identifier':key, 'startDate': value[0], 'endDate': value[1], 'count': value[2]};
			});
		});
	}

	/**
	* Set selected row on click and refresh graph
	**/
	$scope.setSelected = function (idSelectedRow) {
	   $scope.idSelectedRow = idSelectedRow;
	   drawGraph(idSelectedRow, $scope.dataMap[idSelectedRow][3]);
	};
	
	/**
	* HighCharts call to draw graph
	**/
	function drawGraph(title, data){
		Highcharts.stockChart('chartContainer', {
			rangeSelector: {
				selected: 1
			},

			title: {
				text: title
			},

			series: [{
				name: title,
				data: data,
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
	}
	  
  }]);
