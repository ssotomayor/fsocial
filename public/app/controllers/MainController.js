'use strict';

FalconSocialApp.controller('MainController', function($rootScope, $scope, $http, $timeout, PublishingService) {
  if(!sessionStorage.getItem('publishingData')){
    PublishingService.getPublishing().success(function(response){
      sessionStorage.setItem('publishingData', JSON.stringify(response));
      $scope.data = JSON.parse(sessionStorage.getItem('publishingData'));
    });
  } else {
    $scope.data = JSON.parse(sessionStorage.getItem('publishingData'));
  }
});