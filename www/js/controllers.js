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
	$scope.heading;
	profileService.getProfile().then(function(response){
		$scope.firstname = response.data[0].firstname;
		$scope.lastname = response.data[0].lastname;
		$scope.username = response.data[0].username;
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
	
	$scope.goToLecture = function(cid, lid, lt, vurl){
		$scope.lectureId = lid;
		$scope.lectureTitle = lt;
		$scope.openModal(vurl);
	}
	
	//Announcements Tab
	$scope.getAnnouncements = function(){
		$ionicLoading.show();
		courseService.getCourseAnnouncements().then(function(response){
			$scope.announcements = response.data;
		})
		$ionicLoading.hide();
	}
	
	$scope.expandAnnouncement = function(t, bv){
		
		var html = bv;
		var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		
	    var confirm = $mdDialog.confirm()
	      .parent(angular.element(document.body))
	      .title(t)
	      .content(text)
	      .ok('Okay')
	    $mdDialog.show(confirm).then(function() {
	      
	    }, function() {
	      
	    });
	}
	
	//Resources Tab
	
	$scope.expandResource = [];
	
	$scope.getResources = function(){
		$ionicLoading.show();
		
		courseService.getCourseResources($scope.courseId).then(function(response){
			if(response.data.data == "null")
				console.log("No resources")
			
			var maxResource = response.data.length;
			
			for(var i=0 ; i<=maxResource ; i++){
				$scope.expandResource[i] = false;
		}
			
			$scope.resources = response.data;
			if($scope.resources.filename != null)
				console.log('File here')
		})
		$ionicLoading.hide();
	}
	
	$scope.goToResource = function(bv){
		console.log($scope.expandResource[bv])
		$scope.expandResource[bv] = !$scope.expandResource[bv]
	}
	
	$scope.downloadResource = function(filename){
		console.log("Downloading ", filename)
	}
	
	//Forums Tab
	
	$scope.getGeneralForums = function(){
		$ionicLoading.show();
		$scope.forumSelectedTab = 'general';
		courseService.getGeneralForums().then(function(response){
			$scope.generalForums = response.data;
			if(response.data.data == 'null'){
				$scope.generalForums[0].topic = 'Nothing to show!';
			}
		});
		$ionicLoading.hide();
	}
	
	$scope.getTopicForums = function(){
		$ionicLoading.show();
		$scope.forumSelectedTab = 'topics';
		courseService.getTopicForums().then(function(response){
			$scope.topicForums = response.data;
			if(response.data.data == 'null'){
				$scope.topicForums[0].topic = 'Nothing to show!';
			}
		});
		$ionicLoading.hide();
	}
	
	$scope.getSubscribedForums = function(){
		$ionicLoading.show();
		$scope.forumSelectedTab = 'subscribed';
		courseService.getSubscribedForums().then(function(response){
			$scope.subscribedForums = response.data;
			if(response.data.data == 'null'){
				$scope.subscribedForums[0].topic = 'Nothing to show!';
			}
		});
		$ionicLoading.hide();
	}
	
	$scope.forumSelectedTab = 'general'
	
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
				$scope.heading = 'Content'
			 	$state.transitionTo('course.content', {courseId:$scope.courseId});
				$scope.getContents();
				break;
			case 1:
				$scope.heading = 'Announcements'
				$state.transitionTo('course.announcement', {courseId:$scope.courseId});
				$scope.getAnnouncements();
				break;
			case 2:
				$scope.heading = 'Resources'
				$state.transitionTo('course.resource', {courseId:$scope.courseId});
				$scope.getResources();
				break;
			case 3:
				$scope.heading = 'Forums'
				$state.transitionTo('course.forum.general', {courseId:$scope.courseId});
				$scope.getGeneralForums();
				break;
			case 4:
				$scope.heading = 'Chat'
				$state.transitionTo('course.chat', {courseId:$scope.courseId});
				$scope.getChats();
				break;
		}
	});
}])