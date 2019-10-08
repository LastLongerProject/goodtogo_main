var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    addsrc = require('gulp-add-src'),
    gulpNotify = require("gulp-notify");

sass.compiler = require('node-sass');

function js() {
    return gulp.src('resources/js/jquery-3.2.1.min.js')
        .pipe(addsrc.append('resources/js/bootstrap.min.js'))
        .pipe(addsrc.append('resources/js/jquery.easing.min.js'))
        .pipe(addsrc.append('resources/js/parallax.min.js'))
        .pipe(addsrc.append('resources/js/scrolling-nav.js'))
        .pipe(addsrc.append('resources/js/jquery.scrollify.js'))
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
    return gulp.src('resources/sass/pages/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourcemap: true,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(gulpNotify("css 編譯成功"));
}

function browser_sync() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch(['build/**/*.*']).on('change', function () {
        browserSync.reload();
    });
}

function watch() {
    gulp.watch("resources/sass/**/*.sass", css);
    gulp.watch("resources/js/*.js", js);
}

const build_assets = gulp.parallel(js, css);
const develop = gulp.series(gulp.parallel(js, css), gulp.parallel(browser_sync, watch));

gulp.task('default', develop);
gulp.task('build', build_assets);