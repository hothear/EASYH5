var gulp = require('gulp');
var webserver = require('gulp-webserver'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
rename = require('gulp-rename');

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,//本地开发端口，如被占有请手动替换
      livereload: true,
      open: './index.html',
      directoryListing: {
        enable: true,
        path: './'
      },
      proxies: [
        {
            source: '/api', 
            target: 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/sep_xina' //代理设置，这里请替换为具体后台接口地址
        }
      ]
    }))
});
gulp.task('minifycss', function() {
  return gulp.src('css/*.css')    //需要操作的文件
      .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
      .pipe(minifycss())   //执行压缩
      .pipe(gulp.dest('dist/css'));   //输出文件夹
});
gulp.task('minifyjs', function() {
  return gulp.src('js/*.js')      //需要操作的文件
      .pipe(concat('main.js'))    //合并所有js到main.js
      .pipe(gulp.dest('js'))       //输出到文件夹
      .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
      .pipe(uglify())    //压缩
      .pipe(gulp.dest('dist/js'));  //输出
});
gulp.task('sass', function () {
  gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('h5_js', function () {
  return gulp.src('js/*.js')      //需要操作的文件
      .pipe(gulp.dest('js'));  //输出
});
gulp.task('h5_html', function () {

});
gulp.task('h5_image', function () {
  return gulp.src('image/**/*')      //需要操作的文件
      .pipe(gulp.dest('image'));  //输出
});
gulp.task('h5_css', function () {
  return gulp.src('css/*.css')      //需要操作的文件
      .pipe(gulp.dest('css'));  //输出
});
gulp.task('watch',function(){
  // 实时刷新，如不需要请注释
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('js/*.js', ['h5_js']);
  gulp.watch('*.html', ['h5_html']);
  gulp.watch('image/**/*', ['h5_image']);
  gulp.watch('css/*.css', ['h5_css']);
})
gulp.task('default', ['webserver','watch'], function () {
  console.log('success');
  // gulp.start('minifycss','minifyjs'); 
});