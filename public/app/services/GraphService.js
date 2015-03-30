FalconSocialApp.factory('GraphService', function(API_ENDPOINTS, $http) {
  return {
    getData: function() {
      return $http({
        url: API_ENDPOINTS.GET_DATA,
        method: 'GET'
      });
    },
    setData: function() {
      return $http({
        url: API_ENDPOINTS.SET_DATA,
        method: 'GET'
      });
    }
  };
});