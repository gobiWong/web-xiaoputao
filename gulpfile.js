var gulp = require('gulp');
var $ = require('gulp-load-plugins')()
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var less = require('gulp-less');
// var cssClean = require('gulp-clean-css');
// var htmlMin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
const sass = require('gulp-sass')
gulp.task('sass',function(){
  return gulp.src('styles/index.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe($.cleanCss({ compatibility: 'ie8' }))//压缩css文件
  .pipe($.rename({ suffix: '.min' }))//重命名
  .pipe(gulp.dest('dist/css'))
})
const config = {
  root: 'dist',
  port: 8080,
  livereload: true,
}
gulp.task('images', function () {
  return gulp.src('iamges/**/*')//找到目标源文件,所有文件，包括文件夹
    .pipe(gulp.dest('dist/images'))
    // .pipe($.connect.reload())
});
//gulp任务异步文件流，不写return就是同步文件流
//注册合并压缩JS的任务
gulp.task('js', function () {
  return gulp.src('js/*.js')//找到目标源文件，将数据读取到gulp内存
    .pipe($.concat('build.js'))//合并文件
    .pipe(gulp.dest('dist/js'))//临时输出文件到本地
    .pipe($.uglify())//压缩文件
    .pipe($.rename({ suffix: '.min' }))//重命名
    .pipe(gulp.dest('dist/js'))
    .pipe($.connect.reload())
});
// //注册转换less文件为css文件，并压缩的任务
// gulp.task('less', function () {
//   return gulp.src('src/less/*.less')
//     .pipe($.less())
//     .pipe(gulp.dest('src/css'))
//     .pipe($.connect.reload())
// });
//注册合并压缩css文件

// gulp.task('css', function () {
//   return gulp.src('src/css/*.css')
//     // .pipe($.concat('build.css'))//合并src/css/下的所有css文件并命名为build.css
//     .pipe($.rename({ suffix: '.min' }))//重命名
//     .pipe($.cleanCss({ compatibility: 'ie8' }))//压缩css文件
//     .pipe(gulp.dest('dist/css'))//输出文件到dist目录下css文件夹
//     .pipe($.connect.reload())
// })
//注册压缩html文件
gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    // .pipe($.livereload())//实时刷新
    .pipe($.connect.reload())
});
gulp.task('pages', function () {
  return gulp.src('src/pages/**')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/pages'))
    // .pipe($.livereload())//实时刷新
    .pipe($.connect.reload())
})



//gulp 3.9.1版本
gulp.task('build', ['js', 'sass', 'css', 'html', 'pages'], function () {
  console.log('打包完成')
});
//gulp 4+ 需要调用gulp.series()将任务序列化
// gulp.task('default', gulp.series('js', 'less', 'css','html','watch', async function(){
//   await console.log('done')
// }));
// gulp.task('default', gulp.series(gulp.parallel('js', 'less', 'css','html','server')))
//gulp4+版本监听
// gulp.task('watch', function() {
//   gulp.watch('src/js/*.js', gulp.series('js'));
//   gulp.watch('src/less/*.less', gulp.series('less'));
//   gulp.watch('src/css/*.css', gulp.series('css'));
// });
gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('index.html', ['html']);
  gulp.watch('src/pages/*.html', ['pages']);
});
gulp.task('server', () => {
  $.connect.server(config)
});
gulp.task('default', ['watch', 'server'])
