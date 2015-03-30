//Factory style, more involved but more sophisticated
FalconSocialApp.factory('PublishingService', function (API_ENDPOINTS, $http) {
  return {
    getPublishing: function () {
      return $http({
        url: API_ENDPOINTS.GET_PUBLISHING,
        method: 'GET'
      });
    },
    setPublishing: function (data) {
      return $http({
        url: API_ENDPOINTS.SET_PUBLISHING,
        method: 'POST',
        data: data,
        headers: {
          'content-type': "application/json; charset=utf-8"
        }
      });
    }
  }
});