var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var njkRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');


var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
    ttf:  'src/fonts/*.ttf',
    img:  'src/images/*.*',
    dist: {
      css:  'dist/styles/',
      html: 'dist/',
      ttf: 'dist/fonts/',
      img: 'dist/images/',
    }
};

gulp.task('default', ['build', 'serve', 'watch']);
      
gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
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

gulp.task('build', ['html', 'css', 'ttf', 'img']);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.ttf, ['ttf']);
  gulp.watch(path.img, ['img']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
