# MooKIT
Making teaching as easy as learning

![MooKIT](./heroImg.png)

### Previewing:
1. Install global dependencies: `npm install -g gulp ionic`
2. Install local dependencies: `npm install`
3. Run gulp
&nbsp;&nbsp;&nbsp;&nbsp;a. To develop, run gulp with the default task: `gulp`  
&nbsp;&nbsp;&nbsp;&nbsp;b. To build APK, run gulp with the 'build' task: `gulp build`

#### General Instructions for building APKs:

(The build script is platform dependent & currently only works on OSX & Linux. Windows script is under development)

1. Edit the buildConfig.json at the root with desired preferences.
2. Place desired Icon & Splash Screen in the resources directory. Icons must be 192 x 192px & Splash screens must be 2208 x 2208px (With the main content within a 1200 x 1200px box in the center )
3. Run: `gulp build`

#### Libraries:
A BIG thank you to all the wonderful developers of the following libraries/utilities, without  which this project could not have been successful:

1. Browser-Sync
2. Cordova
3. Gulp
&nbsp;&nbsp;&nbsp;&nbsp;a. Browserify + Reactify
&nbsp;&nbsp;&nbsp;&nbsp;b. gulp-shell
4. Material-UI
5. Material Design Icons
6. React
7. React Router
8. React-YouTube
9. Socket.IO
10. Superagent
