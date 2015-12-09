/**
 * Created by edgilmore on 12/9/2015.
 */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// variables
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%']
};

gulp.task('sass', function () {
    return gulp
        .src('app/css/sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['sass'], function () {

});