var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var njkRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');


var path = {
    css:  'src/styles/*.css',
    vendor: 'src/vendor/css/*.css',
    js: 'src/scripts/*.js',
     mock: 'src/mock/*.json',
    html: 'src/templates/*.html',
    ttf:  'src/fonts/*.ttf',
    img:  'src/images/*.*',
    partials: 'src/templates/partials/*.html',
    dist: {
      css:  'dist/styles/',
      vendor: 'dist/vendor/css/',
      js: 'dist/scripts/',
      html: 'dist/',
      ttf: 'dist/fonts/',
      img: 'dist/images/',
      mock: 'dist/mock/',
      partials: 'dist/partials/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);
 
gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js-min', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
});
gulp.task('partials', function () {
  return gulp.src(path.partials)
    .pipe(gulp.dest(path.dist.partials));
});


gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('css-min', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('vendor-css', function () {
  return gulp.src(path.vendor)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('vendor-css-min', function () {
  return gulp.src(path.vendor)
    .pipe(concat('vendor-css-min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('ttf', function () {
  return gulp.src(path.ttf)
    .pipe(gulp.dest(path.dist.ttf));
});
gulp.task('img', function () {
  return gulp.src(path.img)
    .pipe(gulp.dest(path.dist.img));
});

gulp.task('build', ['html', 'css', 'img', 'vendor-css', 'ttf', 'js', 'mock', 'partials']);
gulp.task('prod', ['html', 'css-min', 'img', 'vendor-css-min', 'ttf', 'js-min', 'mock', 'partials']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.img, ['img']);
  gulp.watch(path.mock, ['mock']);
  gulp.watch(path.vendor.css, ['vendor-css']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
