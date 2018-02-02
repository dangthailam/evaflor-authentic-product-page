var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');

var paths = {
    srcHTML: './views/*.*',
    srcCSS: './css/**/*.scss',
    srcJs: './scripts/*.js',
    srcFont: './assets/font/**/**.*',
    srcImages: './assets/images/**/**.*',

    distHTML: './dist/html',
    distCSS: './dist/css',
    distJs: './dist/scripts',
    distImages: './dist/images',
    distFont: './dist/font'
};

gulp.task('img', function () {
    return gulp.src(paths.srcImages).pipe(gulp.dest(paths.distImages));
});

gulp.task('js', function () {
    return gulp.src(paths.srcJs).pipe(gulp.dest(paths.distJs));
});

gulp.task('html', function () {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.distHTML));
});

gulp.task('sass', function () {
    return gulp.src(paths.srcCSS).pipe(concat('style.scss')).pipe(sass()).pipe(gulp.dest(paths.distCSS));
});

gulp.task('font', function () {
    return gulp.src(paths.srcFont).pipe(gulp.dest(paths.distFont));
});

gulp.task('watch', ['nunjucks', 'sass', 'js', 'img', 'font'], function () {
    gulp.watch([
        paths.srcHTML,
        paths.srcCSS
    ], ['nunjucks', 'sass', 'js', 'img', 'font']);
});

gulp.task('nunjucks', function () {
    return gulp.src('views/*.html').pipe(nunjucksRender({
        path: ['views']
    })).pipe(gulp.dest('dist/html'));
});