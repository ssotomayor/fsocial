/**
 * Created by tehsoto on 30/03/15.
 */
'use strict';

FalconSocialApp.controller('EditController', function($rootScope, $scope, $http, $timeout, PublishingService, $stateParams, _) {
    PublishingService.getPublishing().success(function(response){
      sessionStorage.setItem('publishingData', JSON.stringify(response));
      $scope.data = JSON.parse(sessionStorage.getItem('publishingData'));
      $scope.pubId = $stateParams.pubId;

      $scope.publication = _.find($scope.data.response, function(obj) { return obj.id == $stateParams.pubId });
      var pubKey = _.findKey($scope.data.response, function(obj) { return obj.id == $stateParams.pubId }),
        arrCountries = [];

      $scope.message = $scope.publication.content.message;
      $scope.network = $scope.publication.content.network;
      $scope.postType = $scope.publication.content.postType;
      $scope.status = $scope.publication.status;
      $scope.media = $scope.publication.content.media.url;
      $scope.tags = $scope.publication.tags;
      $scope.countries = [];
      $scope.languages = [];

      _.each($scope.publication.geo.countries, function(el, k){
        $scope.countries.push(el.value);
      });

      _.each($scope.publication.geo.languages, function(el, k){
        $scope.languages.push(el.value);
      });

      $scope.editPost = function(){
        var arrObjCountries = [],
          arrObjLanguages = [];
        if(!Array.isArray($scope.countries)) {
          $scope.countries = $scope.countries.split(',');
        }

        if(!Array.isArray($scope.languages)) {
          $scope.languages = $scope.languages.split(',');
        }

        _.each($scope.countries, function(el, k){
          arrObjCountries.push({
            key: "",
            value: el
          })
        });

        _.each($scope.languages, function(el, k){
          arrObjLanguages.push({
            key: "",
            value: el
          })
        });

        $scope.publication.content.message = $scope.message;
        if(!Array.isArray($scope.tags)) {
          $scope.tags = $scope.tags.split(',');
        }
        $scope.data.response[pubKey].content.message = $scope.message;
        $scope.data.response[pubKey].content.network = $scope.network;
        $scope.data.response[pubKey].content.postType = $scope.postType;
        $scope.data.response[pubKey].status = $scope.status;
        $scope.data.response[pubKey].content.media.url = $scope.media;
        $scope.data.response[pubKey].tags = $scope.tags;
        $scope.data.response[pubKey].geo.countries = arrObjCountries;
        $scope.data.response[pubKey].geo.languages = arrObjLanguages;

        PublishingService.setPublishing($scope.data).success(function(){
          sessionStorage.removeItem('publishingData');
        });
      }
    });


});