var gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    shell = require('gulp-shell'),
    jeditor = require('gulp-json-editor'),
    del = require('del'),
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
gulp.task('build-courses', function(){
    return
    gulp.src('courseList.json')
        .pipe(jeditor({
            "title": config.appName,
            "main": config.main,
            "login": config.login
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
        .pipe(shell('ionic start ' + config.appName + ' blank && ' +
                    'cd ' + config.appName + ' && ' +
                    'ionic platform add android && ' +
                    'ionic browser add crosswalk && ' +
                    'rm -r www && ' +
                    'cp -r ../app-dist ./ && ' +
                    'mv ./app-dist ./www && ' +
                    'cp ../resources/*.* ./resources && ' +
                    'ionic resources && ' +
                    'ionic build && ' +
                    'cp ./platforms/android/build/outputs/apk/android-armv7-debug.apk ../ && ' +
                    'cd .. && ' +
                    'mv ./android-armv7-debug.apk ./' + config.appName + '.apk && ' +
                    'rm -r ./' + config.appName))
})

gulp.task('build', ['build-apk'])
