'use strict';

FalconSocialApp.controller('GraphController', function($rootScope, $scope, $http, $timeout, GraphService) {
  if(!sessionStorage.getItem('graphData')){
    GraphService.getData().success(function(response){
      sessionStorage.setItem('graphData', JSON.stringify(response));
      $scope.graphData = response;
    });
  } else {
    $scope.graphData = JSON.parse(sessionStorage.getItem('graphData'));
  }

  // loading chart script after template
  function loadScript(url, callback)
  {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
  }

  loadScript('/javascripts/chart.js', function(){
    console.log("Hola chart");
  });
});