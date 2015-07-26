var gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    shell = require('gulp-shell'),
    jeditor = require('gulp-json-editor'),
    browserSync = require('browser-sync').create(),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    reactify = require('reactify'),

    config = require('./buildConfig.json')

var paths = {
    html: 'app-dev/index.html',
    js: 'app-dev/js/**/*.js',
    css: 'app-dev/css/*.css',
    all: ['app-dev/index.html' , 'app-dev/js/**/*.js' , 'app-dev/css/*.css'],
    dist: 'app-dist'
}

gulp.task('main', function(){
    //Copy HTML
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist))
    //Copy CSS
    gulp.src(paths.css)
        .pipe(gulp.dest(paths.dist))

    //Concatenate and browserify all files
    gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(browserify({
            insertGlobals : true,
            transform: reactify
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', function(){
            browserSync.reload()
        })
})

gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: "app-dist"
        }
    });
    gulp.watch(paths.all, ['main']);
})









//Build tasks
gulp.task('build-config-check', function(){
    gulp.src('./buildConfig.json')
        .pipe(jeditor(function(json) {
            json.title = config.appName.replace(/ /g,'').toLowerCase()
            return json
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('build-courses', ['build-config-check'], function(){
    gulp.src('./app-dev/courseList.json')
        .pipe(jeditor(function(json) {
            json.title = config.appName
            json.login = config.login
            json.main = config.main
            return json
        }))
        .pipe(gulp.dest('./app-dev'))
})

gulp.task('build-compile', ['build-courses'], function(){
    return
    gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(browserify({
            insertGlobals : true,
            transform: reactify
        }))
        .pipe(gulp.dest(paths.dist))
})

gulp.task('build-apk', ['build-compile'], function(){
    gulp.src('./')
        .pipe(shell('cordova create ' + config.title + ' com.mookit.' + config.title + ' "' + config.appName + '" && ' +
                    'cd "' + config.title + '" && ' +
                    'cordova platform add android && ' +
                    'rm -r www && ' +
                    'cp -r ../app-dist ./ && ' +
                    'mv ./app-dist ./www && ' +
                    'mkdir resources &&' +
                    'cp ../resources/*.* ./resources && ' +
                    'ionic resources &&' +
                    'cordova build && ' +
                    'cp ./platforms/android/build/outputs/apk/android-debug.apk ../ && ' +
                    'cd .. && ' +
                    'mv ./android-debug.apk ./"' + config.appName + '".apk && ' +
                    'rm -r ./"' + config.title + '" && ' +
                    'echo -------------------------ALL DONE------------------------- &&' +
                    'echo Thank you for using the build tool. &&' +
                    'echo Enjoy your app!'))
})

gulp.task('build-success', ['build-apk'], function(){
    gulp.src('./')
        .pipe(shell('echo -------------------------STARTING BUILD------------------------ '))
})

gulp.task('build', ['build-success'])
