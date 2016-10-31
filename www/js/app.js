// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
//---------------roj work-------------------
 

  .state('tab.ListClaim', {
    url: '/ListClaim',
    views: {
      'tab-ListClaim': {
        templateUrl: 'templates/ListClaim.html',
          controller: 'ReclamationCtrl'
      }
    }
  })
 .state('tab.claim', {
      url: '/claim',
      views: {
        'tab-claim': {
          templateUrl: 'templates/claim.html',
          controller: 'AddCtrl'
        }
      }
    })
 
    .state('tab.plannings', {
      url: '/plannings',
      views: {
        'tab-plannings': {
          templateUrl: 'templates/plannings.html',
          controller: 'PlanningCtrl'
        }
      }
    })


    .state('tab.Subscription', {
        url: '/Subscription',
        views: {
          'tab-Subscription': {
            templateUrl: 'templates/tab-Subscription.html',
            controller: 'addSubscriptionCtrl'
          }
        }
      })
	  
	  
	  //-----khalil-- 
	   .state('tab.ajoutTrain', {
    url: '/ajoutTrain',
    views: {
      'tab-vehicule': {
        templateUrl: 'templates/showVehicule.html'
        
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
	  


  
  //------------end roj work-----------
  
  //work cyrine
  .state('bus',{
   url:'/bus', 
      views: {
        'tab-plannings': {                       templateUrl:'templates/mapsBus.html',
   controller:'busCtrl'           
       }
      }                       
                             })
  .state('login',{
    url:'/login', 
                             templateUrl:'templates/login.html',
    controller:'LoginCtrl'           
                             
                             })
  //end work cyrine
  //------------banwork-----------------
  // setup an abstract state for the tabs directive
    

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html'
       
      }
    }
  })
  
  
  .state('tab.ListReservations', {
      url: '/ListReservations',
      views: {
        'tab-ListReservations': {
          templateUrl: 'templates/ListReservations.html',
          controller: 'ReservationCtrl'
        }
      }
    })


  .state('tab.AddReservation', {
    url: '/AddReservation',
    views: {
      'tab-add': {
        templateUrl: 'templates/Add-Reservation.html',
        controller: 'AddReservation'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
