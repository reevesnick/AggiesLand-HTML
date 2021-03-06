// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ngCordova','starter.controllers','starter.services','AggiesLand.services','ngTwitter','twitter.timeline'])



.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function($ionicPopup,$cordovaCamera,$cordovaImagePicker) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
       // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
     
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
      Parse.initialize("5b91v6F6A0GaeC64FuIgeCctYaEM81LFybSR4g7K", "1fSBU7HwbAFCGwDDg6rdG9fEe4Grfc3dm8GV8VuB");
 
      

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('login', {
    url: '/',
    templateUrl: 'templates/login 2.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })
  
   .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  })

  .state('forgetpassword', {
    url: '/forgetpassword',
    templateUrl: 'templates/forgetpassword.html',
    controller: 'ForgotPasswordController'
  })


    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.events', {
    url: '/events',
    
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-campus-parties.html',
        controller: 'EventsCtrl'
      }
    }
  })
  
     .state('app.add-events',{
	    url:'/events/add-events',
	    views: {
		    'menuContent': {
			    templateUrl: 'templates/add-event.html',
			    controller: 'AddEventsCtrl'
		    }
	    }
    })
    
  .state('app.routes', {
      url: '/routes',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-routes.html',
          controller: 'RoutesCtrl'
        }
      }
    })
    
 .state('app.routes.71', {
	  url: '/routes-71',
	  views: {
		  'menuContent': {
			  templateUrl: 'templates/bus-routes/71.html',
			  controller: '71Ctrl'
		  }
	  }
  })
 .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    
      // News Feed Detail Controller
 .state('app.home-detail', {
	 url:'/home/:objectId',
	 views: {
		 'menuContent' :{
			 templateUrl: 'templates/tab-home-detail.html',
			 controller: 'HomeDetailCtrl'
		 }
	 }
 })
 
  .state('app.sports', {
    url: '/sports',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-sports.html',
        controller: 'SportsCtrl'
      }
    }
  })
  
    .state('app.feed', {
    url: '/feed',
    views: {
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'FeedCtrl'
      }
    }
  });
    
    if (Parse.User.current()){
          $urlRouterProvider.otherwise('/app/home');
    }
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
