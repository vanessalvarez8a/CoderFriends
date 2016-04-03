angular.module("githubLogIn", ['ui.router']);

angular.module("githubLogIn")
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'mainCtrl'
        resolve: {
          friends: function(gitHubService) {
            return gitHubService.getFollowing();
      }
      })
      .state('friend', {
        url: '/friend/:github_username',
        templateUrl: 'templates/friend.html'
      })
      $urlRouterProvider.otherwise('/');
})
