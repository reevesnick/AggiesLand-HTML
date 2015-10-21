angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/tab-home.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', ['$scope','News', function($scope,News) {
	// Dummy data. Just ignore it
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  
  News.getAll().success(function(data){
		$scope.items = data.results;	
	})

}])

.controller('HomeDetailCtrl',function(){

})

.controller('EventsCtrl',['$scope','$state','$location','Clubs', function($scope,$state,$location,Clubs) {
 	Clubs.getAll().success(function(data){
		$scope.items = data.results;
	})
    
    $scope.addEvents = function(){
       $state.go('app.add-events');
       // $location.path("/tab/add-events");
    };

}])

.controller('SportsCtrl', function($scope){
	
})


.controller('RoutesCtrl', function($scope) {
  $scope.alertTest = function alertTest(){
	  alert("This is a test");
  };
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
