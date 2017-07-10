var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    gulpNotify = require("gulp-notify");

gulp.task('concat', function() {
    return gulp.src('./resources/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./assets/'))
        .pipe(gulpNotify("合併檔案完成"));;
});

gulp.task('uglify',['concat'], function() {
    return gulp.src('./assets/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(gulpNotify("混淆js完成"));;
});

gulp.task('sass', function() {
    sass('resources/sass/app.sass', {
            sourcemap: true,
            style: 'compressed'
        })
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(gulpNotify("編譯成Sass"));;
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

gulp.task('watch', ['sass', 'browser-sync', 'concat', 'uglify'], function() {
    gulp.watch("resources/sass/*.sass", ['sass']);
    gulp.watch("resources/js/*.js", ['uglify']);
});