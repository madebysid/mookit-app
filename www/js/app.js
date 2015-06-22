angular.module('mookit-app', ['ionic', 'mookit.controllers', 'mookit.services', 'ngMaterial'])

.run(['$ionicPlatform', '$rootScope', '$location', 'authService', function($ionicPlatform, $rootScope, $location, authService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    $rootScope.$on('$stateChangeStart', function(event, newValue){
      // if( !authService.isLoggedIn ){
      //   event.preventDefault();
      //   $location.url('/login');
      // }
    });
    
  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
    
      .state('dash', {
        url: '/dash',
        templateUrl: 'templates/dash.html',
        controller: 'dashCtrl'
      })
      
      .state('course', {
        url: '/course/:courseId',
        templateUrl: 'templates/course.html',
        controller: 'courseCtrl'
      })
      .state('course.content', {
        url: '/content',
        views: {
          'main': {
            templateUrl: 'templates/courseContent.html'
          }
        }
      })
      .state('course.lecture', {
        url: '/:lectureId',
        views: {
          'main': {
            templateUrl: 'templates/lecture.html'
          }
        }
      })
      .state('course.announcement', {
        url: '/announcement',
        views: {
          'main': {
            templateUrl: 'templates/courseAnnouncement.html'
          }
        }
      })
      .state('course.resource', {
        url: '/resource',
        views: {
          'main': {
            templateUrl: 'templates/courseResource.html'
          }
        }
      })
      .state('course.forum', {
        url: '/forum',
        views: {
          'main': {
            templateUrl: 'templates/courseForum.html'
          }
        }
      })
      .state('course.forum.general', {
        url: '/general',
        views: {
          'forumView': {
            templateUrl: 'templates/forumGeneral.html'
          }
        }
      })
      .state('course.forum.subscribed', {
        url: '/subscribed',
        views: {
          'forumView': {
            templateUrl: 'templates/forumSubscribed.html'
          }
        }
      })
      .state('course.forum.topics', {
        url: '/topics',
        views: {
          'forumView': {
            templateUrl: 'templates/forumTopics.html'
          }
        }
      })
      
      .state('course.chat', {
        url: '/chat',
        views: {
          'main': {
            templateUrl: 'templates/courseChat.html'
          }
        }
      })
      
    $urlRouterProvider.otherwise('/login');
}])
