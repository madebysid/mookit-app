angular.module('mookit.services', ['ionic', 'ngStorage'])

.service('authService', ['$http', '$state', '$localStorage', '$ionicLoading', 'transformRequestAsFormPost', function($http, $state, $localStorage, $ionicLoading, transformRequestAsFormPost){
	var self = this;
	
	self.serverUrl = 'http://mooconmooc.org/api/user/login.json';
	self.isLoggedIn = $localStorage.isLoggedIn;
	self.token = $localStorage.token;
	self.userId = $localStorage.userId;
	self.username = $localStorage.username;
	self.role = $localStorage.role;
	
	$localStorage.userData = self.userObj;
	
	self.login = function(username, password, callback){
		console.log('Called Login')
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
	}
	
	self.signUp = function(fname, lname, username, email){
		console.log('Sign Up')
		$state.transitionTo('login');
	}
}])

.service('profileService', ['$http', 'transformRequestAsFormPost', 'authService', function($http, transformRequestAsFormPost, authService){
	var self = this;
	
	self.serverUrl = 'http://node.mooconmooc.org/users/' + authService.userId;
	
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

.service('courseService', ['$http', 'authService', function($http, authService){
	var self = this;
	self.serverUrl = "http://node.mooconmooc.org";
	
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
}])

.service('menuService', ['$ionicModal', function($ionicModal){
	var self = this;
	
	self.about = function(){
		console.log('Opened About');
	}
	
	self.settings = function(){
		console.log('Opened Settings');
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