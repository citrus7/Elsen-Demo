'use strict';

/**
 * @ngdoc overview
 * @name elsenApp
 * @description
 * # elsenApp
 *
 * Main module of the application.
 */
angular
  .module('elsenApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'smart-table',
	'ngPapaParse'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
