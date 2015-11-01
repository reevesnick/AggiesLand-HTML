// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','ionic.service.core','starter.controllers','starter.services','AggiesLand.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
      Parse.initialize("5b91v6F6A0GaeC64FuIgeCctYaEM81LFybSR4g7K", "1fSBU7HwbAFCGwDDg6rdG9fEe4Grfc3dm8GV8VuB");

      var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });
 
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

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
 
     // Add Events
   .state('app.add-events',{
	    url:'events/add-events',
	    views: {
		    'menuContent': {
			    templateUrl: 'templates/add-event.html',
			    controller: 'AddEventsCtrl'
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
