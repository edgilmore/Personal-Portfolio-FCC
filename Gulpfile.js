/**
 * Created by edgilmore on 12/9/2015.
 */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodesass = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var livereload = require('gulp-livereload');

// variables
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'ie 9']
};
var config = {
    filename:{
        bootstrapcss: 'bootstrap.css',
        bootstrapjs: 'bootstrap.js'
    }
};
var paths = {
    bower: './bower_components/',
    sass: './app/css/sass/',
    css: './app/css/',
    js: './app/js/',
    fonts: './app/fonts/'
};

gulp.task('build:bootstrap', function() {
    //compile and move sass
    nodesass.render({file: paths.bower + 'bootstrap-sass/assets/stylesheets/_bootstrap.scss', outputStyle: 'compressed'}, function (err, result) {
        if (err) {
            console.log(err);
        }
        return fs.writeFile(paths.css + config.filename.bootstrapcss , result.css.toString());
    });
    //move javascript
    gulp.src([paths.bower + 'bootstrap-sass/assets/javascripts/bootstrap.min.js', paths.bower + 'jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(paths.js +'/vendor/'));
    //move fonts
    gulp.src(paths.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.*')
        .pipe(gulp.dest(paths.fonts));
});

gulp.task('build:font-awesome', function () {

});

gulp.task('build:sass', function () {
    return gulp
        .src(paths.sass + 'style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.css));
});

gulp.task('build', ['build:bootstrap', 'build:sass'], function (){
    gulp.start('build:watch');
});

gulp.task('build:watch', function(){
    gulp.watch(paths.sass + '**/*.scss', ['build:sass']);
});
gulp.task('default', function () {
    gulp.start('build');
});