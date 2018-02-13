var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');

var paths = {
    srcHTML: './views/**/*.html',
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

gulp.task('sass', function () {
    return gulp.src(paths.srcCSS).pipe(concat('style.scss')).pipe(sass()).pipe(gulp.dest(paths.distCSS));
});

gulp.task('font', function () {
    return gulp.src(paths.srcFont).pipe(gulp.dest(paths.distFont));
});

gulp.task('watch', ['nunjucks-en', 'nunjucks-fr', 'sass', 'js', 'img', 'font'], function () {
    gulp.watch([
        paths.srcHTML,
        paths.srcCSS,
        paths.srcJs
    ], ['nunjucks-en', 'nunjucks-fr', 'sass', 'js', 'img', 'font']);
});

gulp.task('nunjucks-en', function () {
    return gulp.src('./views/en/*.html').pipe(nunjucksRender({
        path: ['views/layouts'],
        data: {
            en: 'en',
            fr: 'fr'
        }
    })).pipe(gulp.dest('dist/html/en'));
});

gulp.task('nunjucks-fr', function () {
    return gulp.src('./views/fr/*.html').pipe(nunjucksRender({
        path: ['views/layouts'],
        data: {
            en: 'en',
            fr: 'fr'
        }
    })).pipe(gulp.dest('dist/html/fr'));
});