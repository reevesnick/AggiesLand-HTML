angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $state, $ionicHistory) {
 
  $scope.myGoBack = function(){
    $ionicHistory.goBack();

  }
    
  $scope.data = {};
 
  $scope.signupEmail = function(){  
	   //Create a new user on Parse
  var user = new Parse.User();
  user.set("username", $scope.data.username);
  user.set("password", $scope.data.password);
  user.set("email", $scope.data.email);
 
  // other fields can be set just like with Parse.Object
  user.set("somethingelse", "like this!");
 
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("Success! You are now registered");
                  $state.go('app.home');

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
  };
 
  $scope.loginEmail = function(){
  	Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
      $state.go('app.home');

    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("Error! Please check your information and try again");
        //var alertPopup = 
    }
  });
  };
 
})

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

.controller('HomeCtrl', ['$scope','News','$ionicLoading', function($scope,News,$ionicLoading) {
	// Dummy data. Just ignore it
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
    
var _this = this
  $ionicLoading.show({
    template: 'Loading News'
  })
  News.getAll().success(function(data){
		$scope.items = data.results;	
	}).then(function(result) {
    $ionicLoading.hide()
    _this.breweries = result.data.breweries
  })
 
  $scope.doRefresh = function() {
      News.getAll().success(function(data){
		$scope.items = data.results;	
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

}])

.controller('HomeDetailCtrl', ['$scope','News','$stateParams',function($scope,News,$stateParams){
	News.get($stateParams.objectId, function(news){
		$scope.news = news;
	})
}])

.controller('EventsCtrl',['$scope','$state','$location','Clubs','$ionicModal','$ionicLoading', function($scope,$state,$location,Clubs,$ionicModal,$ionicLoading) {
    var _this = this
  $ionicLoading.show({
    template: 'Loading Events'
  })
 	Clubs.getAll().success(function(data){
		$scope.items = data.results;
	}).then(function(result) {
    $ionicLoading.hide()
    _this.breweries = result.data.breweries
  })
 
    
    $scope.doRefresh = function() {
      Clubs.getAll().success(function(data){
		$scope.items = data.results;	
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete')
     });
  }
/*
	$ionicModal.fromTemplateUrl('templates/add-event.html', {
		animation: 'slide-in-up',
		scope: $scope
	}).then(function(modal){
		$scope.modal = modal;
	});
	
	$scope.openModal = function(){
		$scope.modal.show();
	}
    
    $scope.closeModal = function(){
        $scope.modal.hide();
  }
  */
}])

.controller('AddEventsCtrl', ['$scope','Clubs','$state', function($scope,Clubs,$state){
        $scope.newsdata={};

                              
       $scope.create=function(){
            Clubs.create({Title:$scope.newsdata.Title, Date:$scope.newsdata.Date,socialHandle:$scope.newsdata.socialHandle,Price:$scope.newsdata.Price,Details:$scope.newsdata.Details}).success(function(data){
                alert("Thank you for submiting your events. Keep in mind that we have to monitize the events published.");
                $state.go('app.events');
      });  
         	
  
   }                       
}])


.controller('SportsCtrl', function($scope){
	
})


.controller('RoutesCtrl', function($scope,$state) {
  $scope.alertTest = function alertTest(){
	  $state.go('/routes-71');
  };
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('71Ctrl',function($scope){
	//$scope.test = function
});
