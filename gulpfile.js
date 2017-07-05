var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer');

gulp.task('sass', function() {
    sass('resources/sass/app.sass', {
            sourcemap: true,
            style: 'compressed'
        })
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('browser-sync', function() {
    connect.server({}, function() {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });

    gulp.watch('*.php').on('change', function() {
        browserSync.reload();
    });
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
    gulp.watch("resources/sass/*.sass", ['sass']);
});