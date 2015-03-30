'use strict';

FalconSocialApp.controller('AddController', function($rootScope, $scope, $http, $timeout, PublishingService) {
  if(!sessionStorage.getItem('publishingData')){
    PublishingService.getPublishing().success(function(response){
      sessionStorage.setItem('publishingData', JSON.stringify(response));
      $scope.data = JSON.parse(sessionStorage.getItem('publishingData'));
    });
  } else {
    $scope.data = JSON.parse(sessionStorage.getItem('publishingData'));
  }

  function generateId()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  $scope.notif = "";

  $scope.addPost = function(){
    var arrObjCountries = [],
      arrObjLanguages = [];
    $scope.tags = $scope.tags || [];
    $scope.countries = $scope.countries || [];

    if(!Array.isArray($scope.countries)){
      $scope.countries = $scope.countries.split(',');
    }

    _.each($scope.countries, function(el){
      arrObjCountries.push({
        key: "",
        value: el
      })
    });

    if(!Array.isArray($scope.languages)){
      $scope.languages = $scope.languages.split(',');
    }

    _.each($scope.languages, function(el){
      arrObjLanguages.push({
        key: "",
        value: el
      })
    });

    $scope.data.response.push({
      id: generateId(),
      channels: {},
      content: {
        message: $scope.message || "",
        media: {
          filename: '',
          url: $scope.media || ""
        }
      },
      geo: {
        countries: arrObjCountries,
        languages: arrObjLanguages
      },

      tags: $scope.tags.split(','),

      postType: $scope.postType,

      status: $scope.status
    });

    PublishingService.setPublishing($scope.data).success(function(response){
      sessionStorage.setItem('publishingData', JSON.stringify(response));
      $scope.notif = "Published!";
      console.log("Added");
    })
  }
});