/**
 * Created by edgilmore on 12/9/2015.
 */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodesass = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');

// variables
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'ie 9']
};
var config = {
    filename:{
        bootstrapcss: 'bootstrap.css',
        bootstrapjs: 'bootstrap.js',
        stylesheet: 'stylesheet.min.css'
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
});

gulp.task('build:font-awesome', function () {
    gulp.src(paths.bower + 'font-awesome/scss/font-awesome.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

gulp.task('build:move-fonts', function () {
    //font-awesome
    gulp.src(paths.bower + 'font-awesome/fonts/*.*')
        .pipe(gulp.dest(paths.fonts));
    //bootstrap
    gulp.src(paths.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.*')
        .pipe(gulp.dest(paths.fonts));
});

gulp.task('build:move-javascript', function () {
    gulp.src([paths.bower + 'bootstrap-sass/assets/javascripts/bootstrap.min.js', paths.bower + 'jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(paths.js + '/vendor/'));
});

gulp.task('build:sass', function () {
    return gulp
        .src(paths.sass + 'style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.css));
});

gulp.task('build', ['build:bootstrap', 'build:sass', 'build:font-awesome', 'build:move-fonts', 'build:move-javascript'], function () {
    gulp.start('build:watch');
});

gulp.task('build:watch', function(){
    gulp.watch(paths.sass + '**/*.scss', ['build:sass']);
});
gulp.task('default', function () {
    gulp.start('build');
});