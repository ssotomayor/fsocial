'use strict';

/***
 AngularJS App Main Script
 ***/

// Declare app level module which depends on filters, and services
var FalconSocialApp = angular.module('FalconSocialApp', ['ui.router', 'oc.lazyLoad', 'underscore'])
  .config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('!');

    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "/app/views/view.html",
        controller: "MainController",
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'FalconSocialApp',
              files: [
                '/app/services/PublishingService.js',
                '/app/controllers/MainController.js'
              ]
            });
          }]
        }
      })

      .state("addPublication", {
        url: "/add",
        templateUrl: "/app/views/add.html",
        controller: "AddController",
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'FalconSocialApp',
              files: [
                '/app/services/PublishingService.js',
                '/app/controllers/AddController.js'
              ]
            });
          }]
        }
      })

      .state("editPublication", {
        url: "/edit/:pubId",
        templateUrl: "/app/views/edit.html",
        controller: "EditController",
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'FalconSocialApp',
              files: [
                '/app/services/PublishingService.js',
                '/app/controllers/EditController.js'
              ]
            });
          }]
        }
      })

      .state("graph", {
        url: "/graph",
        templateUrl: "/app/views/graph.html",
        controller: "GraphController",
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'FalconSocialApp',
              files: [
                '/app/services/GraphService.js',
                '/app/controllers/GraphController.js'
              ]
            });
          }]
        }
      });
  });

FalconSocialApp.value('API_ENDPOINTS', {
  GET_PUBLISHING: 'http://localhost:3000/api/get/publishing',
  SET_PUBLISHING: 'http://localhost:3000/api/update/publishing',
  GET_DATA: 'http://localhost:3000/api/get/data',
  SET_DATA: 'http://localhost:3000/api/update/data'
});

FalconSocialApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
//  console.log(PublishingService.sayHello());
}]);