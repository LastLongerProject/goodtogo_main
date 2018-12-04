var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    addsrc = require('gulp-add-src'),
    gulpNotify = require("gulp-notify");

function js() {
    return gulp.src('resources/js/jquery-3.2.1.min.js')
        .pipe(addsrc.append('resources/js/bootstrap.min.js'))
        .pipe(addsrc.append('resources/js/jquery.easing.min.js'))
        .pipe(addsrc.append('resources/js/parallax.min.js'))
        .pipe(addsrc.append('resources/js/scrolling-nav.js'))
        .pipe(addsrc.append('resources/js/slick.min.js'))
        .pipe(addsrc.append('resources/js/jquery.scrollify.min.js'))
        .pipe(addsrc.append('resources/js/app.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify().on("error", gulpNotify.onError(function (error) {
            return "Js 編譯發生錯誤： " + error;
        })))
        .pipe(sourcemaps.write('source-maps'))
        .pipe(gulp.dest('build/assets/js/'))
        .pipe(gulpNotify("js 檔案混淆成功"));
}

function css() {
    sass('resources/sass/pages/*.sass', {
            sourcemap: true,
            style: 'compressed'
        }).on('error', sass.logError)
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(gulpNotify("css 編譯成功"));
}

function browser_sync() {
    connect.server({}, function () {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });

    gulp.watch(['build/*.*']).on('change', function () {
        browserSync.reload();
    });
}

function watch() {
    gulp.watch("resources/sass/**/*.sass", css);
    gulp.watch("resources/js/*.js", js);
}

const build_assets = gulp.parallel(js, css);
const develop = gulp.series(build_assets, gulp.parallel(browser_sync, watch));

gulp.task('default', develop);
gulp.task('build', build_assets);