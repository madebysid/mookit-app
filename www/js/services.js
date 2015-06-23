angular.module('mookit.services', ['ionic', 'ngStorage', 'ngMaterial'])

.service('linkService', [function(){
	var self = this;
	
	self.serverUrl = "http://node.mooconmooc.org";
	self.loginUrl = "http://mooconmooc.org";
}])

.service('authService', ['$window', '$http', '$state', '$localStorage', '$ionicLoading', 'linkService', 'transformRequestAsFormPost', function($window, $http, $state, $localStorage, $ionicLoading, linkService, transformRequestAsFormPost){
	var self = this;
	
	self.serverUrl = linkService.loginUrl + '/api/user/login.json'//'http://staging.mookit.co/api/user/login.json';
	self.isLoggedIn = $localStorage.isLoggedIn;
	self.token = $localStorage.token;
	self.userId = $localStorage.userId;
	self.username = $localStorage.username;
	self.role = $localStorage.role;
	
	$localStorage.userData = self.userObj;
	
	self.login = function(username, password, callback){
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http({
			method: 'POST',
			url: self.serverUrl,
			transformRequest: transformRequestAsFormPost,
			data: {
				username: username,
				password: password,
			}
		}).success(function(response){
			self.isLoggedIn = true;
			self.token = response.token;
			self.userId = response.uid;
			self.username = response.username;
			self.role = response.role;
			
			$localStorage.isLoggedIn = true;
			$localStorage.token = response.token;
			$localStorage.userId = response.uid;
			$localStorage.username = response.username;
			$localStorage.role = response.role;
			
			console.log("Logged in as ", response.token)
			$ionicLoading.hide();			
			$state.transitionTo('dash');
		})
		.error(function(response){
			$ionicLoading.hide();
			callback();
		})
	}
	
	self.logout = function(){
		//Actual Logout
		self.isLoggedIn = false;
		self.token = '';
		self.userId = '';
		self.username = '';
		self.role = '';
		
		$localStorage.isLoggedIn = false;
		$localStorage.token = '';
		$localStorage.userId = '';
		$localStorage.username = '';
		$localStorage.role = '';
		
		$state.transitionTo('login');
		$window.location.reload();
	}
	
	self.signUp = function(fname, lname, username, email){
		console.log('Sign Up')
		$state.transitionTo('login');
	}
}])

.service('profileService', ['$http', 'transformRequestAsFormPost', 'authService', 'linkService', function($http, transformRequestAsFormPost, authService, linkService){
	var self = this;
	
	self.serverUrl = linkService.serverUrl + '/users/' + authService.userId;
	
	self.getProfile = function(){
		return $http({
			method: 'GET',
			url: self.serverUrl,
			headers: {
				token: authService.token,
            	uid: authService.userId,
			}
		});
	}
}])

.service('courseService', ['$http', 'authService', 'linkService', function($http, authService, linkService){
	var self = this;
	self.serverUrl = linkService.serverUrl;
	
	self.getCourses = function(){
		return $http.get('http://demo6849607.mockable.io/courses')
	}
	
	self.getCourseContents = function(courseId){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/lectures/summary/",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		});
	}
	
	self.getCourseAnnouncements = function(courseId){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/announcement/summary",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		});
	}
	
	self.getCourseResources = function(courseId){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/resources",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		}); 
	}
	
	self.getGeneralForums = function(){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/forums/getdiscussions/general",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		});
	}
	
	self.getTopicForums = function(){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/forums/getdiscussions/lectures",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		});
	}
	
	self.getSubscribedForums = function(){
		return $http({
			method: 'GET',
			url: self.serverUrl + "/forums/getdiscussions/subscribed",
			headers: {
				token: authService.token,
				uid: authService.userId,
			}
		});
	}
}])

.service('menuService', ['$ionicModal', '$mdDialog', function($ionicModal, $mdDialog){
	var self = this;
	
	self.dialogCtrl = ['$scope', '$mdDialog', function($scope, $mdDialog){
		$scope.save = function(){
			$mdDialog.hide();
		}
		
		$scope.okay = function(){
			$mdDialog.hide();
		}
	}]
	
	self.about = function(){
		$mdDialog.show({
			controller: self.dialogCtrl,
	      	templateUrl: 'templates/about.html',
	      	parent: angular.element(document.body),
	    })
	    .then(function(answer) {}, function() {});
	}
	
	self.settings = function(){
		$mdDialog.show({
			controller: self.dialogCtrl,
	      	templateUrl: 'templates/settings.html',
	      	parent: angular.element(document.body),
	    })
	    .then(function(answer) {}, function() {});
	}
}])


.factory('transformRequestAsFormPost', function() {
	function transformRequest( data, getHeaders ) {
		var headers = getHeaders();
		headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
		return( serializeData( data ) );
	}
	
	return( transformRequest );
	
	function serializeData( data ) {
		if ( !angular.isObject( data ) ) {
			return( ( data == null ) ? "" : data.toString() );
		}
		
		var buffer = [];
		
		for ( var name in data ) {
			if ( ! data.hasOwnProperty( name ) ) {
				continue;
			}
			var value = data[ name ];
			buffer.push(encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value ));
		}
		
		var source = buffer.join( "&" ).replace( /%20/g, "+" );
		return( source );
	}
});