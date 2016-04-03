angular.module('githubLogIn').service('gitHubService', function($q, $http) {
  this.getFollowing = function() {
    return $http ({
      method: 'GET',
      url:'/api/github/following'
    });
  };
})
