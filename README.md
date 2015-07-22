# MooKIT
Making teaching as easy as learning

![MooKIT](./heroImg.png)

### Previewing:
1. Install global dependencies: `npm install -g gulp ionic`
2. Install local dependencies: `npm install`
3a. To develop, run gulp with the default task: `gulp`

3b. To build APK, run gulp with the 'build' task: `gulp build`

#### General Instructions for building APKs:

1. Edit the buildConfig.json at the root with desired preferences.
2. Place desired Icon & Splash Screen in the resources directory. Icons must be 192 x 192px & Splash screens may be 2208 x 2208px (With the main content within a 1200 x 1200px box in the center )
3. Run: `gulp build`
