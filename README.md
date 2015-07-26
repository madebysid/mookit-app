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

1. [Cordova](https://github.com/apache/cordova-js)
2. [Material-UI](https://github.com/callemall/material-ui)
3. [Material Design Icons](https://github.com/templarian/MaterialDesign/)
4. [React](https://github.com/facebook/react)
5. [React Router](https://github.com/rackt/react-router)
6. [React-YouTube](https://github.com/compedit/react-youtube)
7. [Socket.IO](https://github.com/socketio/socket.io-client)
8. [Superagent](https://github.com/visionmedia/superagent)
