angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $state, $ionicHistory) {
 
  $scope.myGoBack = function(){
    $ionicHistory.goBack();
  } 
  $scope.data = {};
    
 // Auto Login for User
var currentUser = Parse.User.current();
if (currentUser) {
   $state.go('app.home');
} else {

}
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

.controller('HomeCtrl', ['$scope','News','$ionicLoading','$ionicActionSheet','$state', function($scope,News,$ionicLoading,$ionicActionSheet,$state) {
	// Dummy data. Just ignore it

    // Loading Screen
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
 
  // Pull to Refresh function
  $scope.doRefresh = function() {
      News.getAll().success(function(data){
		$scope.items = data.results;	
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }
  
  //Setings Menu
   // Triggered on a button click, or some other target
 $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
    
     destructiveText: 'Log Out',
     titleText: 'Settings',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
       
    destructiveButtonClicked: function() {
        //Do Stuff
       
       Parse.User.logOut();
       $state.go('login');
       return true;
    }
    
});

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };
  
  // Share Methods 
  
  
  // share anywhere
$scope.share = function () {
    $cordovaSocialSharing.share('This is my message', 'Subject string', null, 'http://www.mylink.com');
}

// Share via email. Can be used for feedback
$scope.sendFeedback = function () {
    $cordovaSocialSharing
            .shareViaEmail('Some message', 'Some Subject', 'to_address@gmail.com');
}

// Share via SMS. Access multiple numbers in a string like: '0612345678,0687654321'
$scope.sendSMS = function (message, number) {
    $cordovaSocialSharing.shareViaSMS(message, number);
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

    $scope.addEvent = function(){
        $state.go('app.add-events');
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



.controller('FeedCtrl',function($scope,$ionicPlatform, $twitterApi,$cordovaOauth){
	//$scope.test = function
});
