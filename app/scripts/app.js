'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
 

 
 
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      /*.when('/podcast/:podcastId', {
        templateUrl: 'views/podcast.html',
        controller: 'podcast',
        controllerAs: 'podcast'
      })*/
     .when('/podcast', {
        templateUrl: 'views/podcast.html',
        controller: 'podcast',
        controllerAs: 'podcast'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
