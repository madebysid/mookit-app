var gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    browserSync = require('browser-sync').create(),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    reactify = require('reactify');

var paths = {
    html: 'app-dev/index.html',
    js: 'app-dev/js/**/*.js',
    css: 'app-dev/css/*.css',
    img: ['app-dev/img/*.png', 'app-dev/img/*.jpg', 'app-dev/img/*.svg'],
    all: ['app-dev/index.html' , 'app-dev/js/**/*.js' , 'app-dev/css/*.css'],
    dist: 'app-dist',
    distImg: 'app-dist/img'
}

gulp.task('refreshServer', function() {
    browserSync.reload()
});

gulp.task('startServer', function(){
    browserSync.init({
        server: {
            baseDir: "app-dist"
        }
    });
})

gulp.task('main', function(){

    //Copy HTML
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist))
    //Copy CSS
    gulp.src(paths.css)
        .pipe(gulp.dest(paths.dist))
    //Copy Assets
    gulp.src(paths.img)
        .pipe(gulp.dest(paths.distImg))

    //Concatenate and browserify all files
    gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(browserify({
            insertGlobals : true,
            transform: reactify
        }))
        .pipe(gulp.dest(paths.dist))

})

gulp.task('default', function(){
    //gulp.run('startServer')
    gulp.watch(paths.all, ['main'])
})