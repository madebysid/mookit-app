angular.module('mookit.controllers', ['ionic', 'ngAnimate', 'ngMaterial', 'youtube-embed'])

.controller('appCtrl', ['$scope', function($scope){
	
}])

.controller('loginCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', 'authService', function($scope, $state, $timeout, $ionicLoading, authService){
	$scope.username = '';
	$scope.password = '';
	$scope.loginError = false;
	$scope.loginText = "Login";
	
	$scope.login = function(username, password){
		$ionicLoading.show();
		authService.login(username,password, function(){
			$scope.loginError = true;
			$scope.loginText = "Invalid Credentials";
			$timeout(function(){
				$scope.loginError = false;
				$scope.loginText = "Login";
				console.log($scope.loginError, $scope.loginText);
			}, 2000);
		});
	}
	
	$scope.signUp = function(){
		$state.transitionTo('signup');
	}
	
	//$scope.login($scope.username, $scope.password)
}])

.controller('signupCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService){
	
	//Definitions
	$scope.goBack = function(){
		$state.transitionTo('login');
	}
	
	$scope.signup = function(fname, lname, username, email){
		authService.signUp(fname, lname, username, email);
	}
}])

.controller('dashCtrl', ['$scope', '$state', 'authService', 'profileService', 'courseService', 'menuService', function($scope, $state, authService, profileService, courseService, menuService){
	
	//Definitions
	$scope.getCourses = function(){
		$scope.courses = courseService.getCourses().then(function(response){;
			$scope.courses = response.data;
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
	
	$scope.toggleFav = function(courseId){
		if( $scope.favIcon == "favorite_outline" ){
			$scope.favIcon = "favorite";
		}
		else{
			$scope.favIcon = "favorite_outline";
		}
	}
	
	$scope.logout = function(){
		authService.logout();
	};
	
	$scope.openAbout = function(){
		menuService.about();
	}
	
	$scope.openSettings = function(){
		menuService.settings();
	}
	
	//Initializers
	$scope.getCourses();
	$scope.favIcon = "favorite_outline";
	$scope.courses;
	$scope.avatar = 'img/profile.svg';
	profileService.getProfile().then(function(response){
		$scope.avatar = "http://mooconmooc.org/sites/default/files/pictures/" + response.data[0].avatar;
	});
}])

.controller('courseCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicModal', '$mdDialog', 'courseService', 'menuService', function($scope, $state, $stateParams, $ionicLoading, $ionicModal, $mdDialog, courseService, menuService){
	
	//Definitions
	$scope.goBack = function(){
		$state.transitionTo('dash');
	}
	
	//Contents Tab
	
	$scope.expandWeek = [];
	$scope.lectures = [];
	
	$scope.toggleWeek = function(weekId){
		$scope.expandWeek[weekId] = !$scope.expandWeek[weekId];
	}
	
	$scope.getContents = function(){
		$ionicLoading.show();
		courseService.getCourseContents().then(function(response){
			$scope.contents = response.data;
			
			var maxWeek = 0;
			response.data.forEach(function(element){
				if( element.week.slice(5) > maxWeek)
					maxWeek = element.week.slice(5);
			});
			
			for(var i=0 ; i<=maxWeek ; i++){
				$scope.lectures[i] = new Array(0);
				$scope.expandWeek[i] = false;
			}
			
			response.data.forEach(function(element){
				var index = parseInt(element.week.slice(5));
				$scope.lectures[index].push(element);
			});
		});
		$ionicLoading.hide();
	}
	
	//Video Modal
	$ionicModal.fromTemplateUrl('templates/lecture.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function(vurl) {
		$scope.lectureUrl = vurl;
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	
	$scope.goToLecture = function(cid, lid, vurl){
		$scope.lectureId = lid;
		$scope.openModal(vurl);
	}
	
	//Announcements Tab
	$scope.getAnnouncements = function(){
		$ionicLoading.show();
		courseService.getCourseAnnouncements().then(function(response){
			$scope.announcements = response.data;
			console.log(response.data[0])
		})
		$ionicLoading.hide();
	}
	
	$scope.expandAnnouncement = function(t, bv){
	    var confirm = $mdDialog.confirm()
	      .parent(angular.element(document.body))
	      .title(t)
	      .content(bv)
	      .ok('Okay')
	    $mdDialog.show(confirm).then(function() {
	      
	    }, function() {
	      
	    });
	}
	
	//Resources Tab
	
	$scope.getResources = function(){
		$ionicLoading.show();
		console.log('Fetching Resources for ', $scope.courseId);		
		$ionicLoading.hide();
	}
	
	//Forums Tab
	
	$scope.getForums = function(){
		$ionicLoading.show();
		console.log('Fetching Forums for ', $scope.courseId);		
		$ionicLoading.hide();
	}
	
	//Chats Tab
	
	$scope.getChats = function(){
		$ionicLoading.show();
		console.log('Fetching Chats for ', $scope.courseId);		
		$ionicLoading.hide();
	}
	
	$scope.openAbout = function(){
		menuService.about();
	}
	
	$scope.openSettings = function(){
		menuService.settings();
	}
	
	//Initializers
	$scope.courseId = $stateParams.courseId;
	$scope.selectedIndex;
	
	$scope.$watch('selectedIndex', function(newValue, oldValue){
		switch(newValue){
			case 0:
			 	$state.transitionTo('course.content', {courseId:$scope.courseId});
				$scope.getContents();
				break;
			case 1:
				$state.transitionTo('course.announcement', {courseId:$scope.courseId});
				$scope.getAnnouncements();
				break;
			case 2:
				$state.transitionTo('course.resource', {courseId:$scope.courseId});
				$scope.getResources();
				break;
			case 3:
				$state.transitionTo('course.forum', {courseId:$scope.courseId});
				$scope.getForums();
				break;
			case 4:
				$state.transitionTo('course.chat', {courseId:$scope.courseId});
				$scope.getChats();
				break;
		}
	});
}])