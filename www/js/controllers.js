angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $state, $ionicHistory, $ionicPopup) {
 
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
      //alert("Success! You are now registered");
        $ionicPopup.alert({
              title: 'Success',
              content: 'You are now registered!'
            })
                  $state.go('app.home');

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
        $ionicPopup.alert({
              title: 'Error',
              content: error.code + '' + error.message
            })
      //alert("Error: " + error.code + " " + error.message);
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
      //alert("Error! Please check your information and try again");
        $ionicPopup.alert({
              title: 'Error',
              content: 'Please check your information and try again'
            })
        //var alertPopup = 
    }
  });
  };
    
    $scope.forgetPasswordButton = function(){
            $state.go('forgetpassword');

    }
 
})


.controller('ForgotPasswordController', function($scope, $state, $ionicLoading, $ionicHistory) {
    $scope.myGoBack = function(){
        $ionicHistory.goBack();
    }  
    
    
    $scope.user = {};
    $scope.error = {};
    $scope.state = {
        success: false
    };

    $scope.reset = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        Parse.User.requestPasswordReset($scope.user.email, {
            success: function() {
                // TODO: show success
                $ionicLoading.hide();
                $scope.state.success = true;
                $scope.$apply();
            },
            error: function(err) {
                $ionicLoading.hide();
                if (err.code === 125) {
                    $scope.error.message = 'Email address does not exist';
                } else {
                    $scope.error.message = 'An unknown error has occurred, ' +
                        'please try again';
                }
                $scope.$apply();
            }
        });
    };

    $scope.login = function() {
        $state.go('login');
    };
})



.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cordovaImagePicker,$ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
    //Parse Current User
    $scope.currentuser = Parse.User.current();
   // $scope.urlPicture = Parse.User.current().get("profile_pic");

    
     $scope.uploadfile = function(){
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 300,
                height: 300,
                quality: 80,
                encodingType: 0     // 0=JPG 1=PNG
// Higher is better
            };
 
           $cordovaImagePicker.getPictures(options).then(function (imageData) {
                           $scope.image = imageData;
            
                }, function(error) {
                // error getting photos
                         $ionicPopup.alert({
                            title: 'Error',
                            content: 'Unable to obtain photo.'
                    })
                },options);
         
        convertImgToBase64URL($scope.image, function(base64Img){
         var imageFile = new Parse.File("profilePic.jpg", {base64: base64Img});
            var currentUser = Parse.User.current();
            currentUser.set("profile_pic", imageFile);
            currentUser.save(null,{
                     success: function(currentUser){
                     $ionicPopup.alert({
              title: 'Success',
              content: 'Your profile picture has been saved!'
            })
                $state.go('app.events');
            },
               error: function(currentUser,error){
                   $ionicPopup.alert({
              title: 'Error',
              content: ""+error.message
               })
               }
            });
        
        
                    });
     }
                              
    function convertImgToBase64URL(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null; 
        };
        img.src = url;
    }

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

.controller('EventsCtrl',['$scope','$state','$location','Clubs','$ionicModal','$ionicLoading','$window', function($scope,$state,$location,Clubs,$ionicModal,$ionicLoading,$window) {
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
    
    $scope.flagEvent = function(){
        var link = "mailto:support@aggiesland.me?subject=Flagged Event Detail&body=items.Title"+
                   "Name: " + $scope.contact.name + "Number: " + $scope.contact.phone;     
    window.location.href = link;
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

.controller('AddEventsCtrl', ['$scope','Clubs','$state','$ionicPopup','$cordovaImagePicker', function($scope,Clubs,$state,$ionicPopup,$cordovaImagePicker,$rootScope){
        $scope.newsdata={};
         var currentuser = Parse.User.current();
    
      
        $scope.uploadfile = function(){
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
                width: 300,
                height: 300,
                quality: 80,
                encodingType: 0     // 0=JPG 1=PNG
// Higher is better
            };
 
           $cordovaImagePicker.getPictures(options).then(function (imageData) {
                           $scope.image = imageData;
            
                }, function(error) {
                // error getting photos
                         $ionicPopup.alert({
                            title: 'Error',
                            content: 'Unable to obtain photo.'
                    })
                },options);   
        }

    function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}
        
       $scope.create=function(){
           var CreateEvent = Parse.Object.extend("Clubs");
           var createevent = new CreateEvent();
           //var query = new Parse.Query("Clubs");
           //query.equalTo("CreatedBy",Parse.User.current())
           

           convertImgToBase64URL($scope.image, function(base64Img){
                    var parseFile = new Parse.File("eventPic.png",{base64:base64Img});
               
                     createevent.set("Title",$scope.newsdata.Title);
           createevent.set("Date",$scope.newsdata.Date);
           createevent.set("socialHandle",$scope.newsdata.socialHandle);
           createevent.set("Price",$scope.newsdata.Price);
           createevent.set("Details",$scope.newsdata.Details);
           createevent.set("CreatedBy",Parse.User.current());
           createevent.set("imageFile", parseFile);
           
           createevent.save(null,{
               success: function(createevent){
                   Parse.User.current().increment('Posts').save();
                     $ionicPopup.alert({
              title: 'Published',
              content: 'Thank you for submiting your events. Keep in mind that we will have review the post.'
            })
                $state.go('app.events');
            },
               error: function(createevent,error){
                   $ionicPopup.alert({
              title: 'Error',
              content: 'Unable to publish your event. Please check your information and try again. Error Details: '+error.message
               })
               }
           });
           

           });

           

           /*
           createevent.set("Title",$scope.newsdata.Title);
           createevent.set("Date",$scope.newsdata.Date);
           createevent.set("socialHandle",$scope.newsdata.socialHandle);
           createevent.set("Price",$scope.newsdata.Price);
           createevent.set("Details",$scope.newsdata.Details);
           createevent.set("CreatedBy",Parse.User.current());
           createevent.set("imageFile", parseFile);
           
           createevent.save(null,{
               success: function(createevent){
                     $ionicPopup.alert({
              title: 'Published',
              content: 'Thank you for submiting your events. Keep in mind that we have review the post.'
            })
                $state.go('app.events');
            },
               error: function(createevent,error){
                   $ionicPopup.alert({
              title: 'Error',
              content: 'Unable to publish your event. Please check your information and try again. Error Details: '+error.message
               })
               }
           });
           */
           
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
