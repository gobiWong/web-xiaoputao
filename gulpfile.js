var gulp = require('gulp');
var _$ = require('gulp-load-plugins')()
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var less = require('gulp-less');
// var cssClean = require('gulp-clean-css');
// var htmlMin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
const sass = require('gulp-sass')

const config = {
  root: 'dist',
  port: 8080,
  livereload: true,
}
//注册压缩首页文件
gulp.task('index', function () {
  return gulp.src('index.html')
    .pipe(_$.htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'))
    .pipe(_$.connect.reload())
});
gulp.task('pages', function () {
  return gulp.src('pages/**')
    .pipe(_$.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/pages'))
    .pipe(_$.connect.reload())
})
//图片文件夹
gulp.task('images', function () {
  return gulp.src('images/**/*')//找到目标源文件,所有文件，包括文件夹
    .pipe(gulp.dest('dist/images'))
    .pipe(_$.connect.reload())
});
//注册合并压缩css文件
gulp.task('sass', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(_$.cleanCss({ compatibility: 'ie8' }))//压缩css文件
    .pipe(_$.rename({ suffix: '.min' }))//重命名
    .pipe(gulp.dest('dist/css'))
    .pipe(_$.connect.reload())
})

gulp.task('copy-css', function () {
  return gulp.src('styles/common/*.css')
    // .pipe(_$.concat('build.css'))//合并src/css/下的所有css文件并命名为build.css
    .pipe(gulp.dest('dist/css/common'))//输出文件到dist目录下css文件夹
    // .pipe(_$.rename({ suffix: '.min' }))//重命名
    // .pipe(_$.cleanCss({ compatibility: 'ie8' }))//压缩css文件
    // .pipe(gulp.dest('dist/css'))//输出文件到dist目录下css文件夹
    .pipe(_$.connect.reload())
})

//gulp任务异步文件流，不写return就是同步文件流
//注册合并压缩JS的任务
gulp.task('copy-js', function () {
  return gulp.src('javascript/lib/*.js')//找到目标源文件，将数据读取到gulp内存
    .pipe(gulp.dest('dist/js/lib'))//临时输出文件到本地
    // .pipe(_$.uglify())//压缩文件
    // .pipe(_$.rename({ suffix: '.min' }))//重命名
    // .pipe(gulp.dest('dist/js'))
    .pipe(_$.connect.reload())
});

gulp.task('uglify-js', function () {
  return gulp.src('javascript/modules/*.js')//找到目标源文件，将数据读取到gulp内存
    .pipe(gulp.dest('dist/js/modules'))//临时输出文件到本地
    .pipe(_$.uglify())//压缩文件
    .pipe(_$.rename({ suffix: '.min' }))//重命名
    .pipe(gulp.dest('dist/js/modules'))
    .pipe(_$.connect.reload())
});


//gulp 3.9.1版本
gulp.task('build', ['index', 'pages', 'images', 'sass', 'copy-css', 'copy-js', 'uglify-js'], function () {
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
  gulp.watch('index.html', ['index']);
  gulp.watch('pages/**', ['pages']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch('styles/common/*.css', ['copy-css']);
  gulp.watch('javascript/lib/*.js', ['copy-js']);
  gulp.watch('javascript/modules/*.js', ['uglify-js']);
});
gulp.task('server', () => {
  _$.connect.server(config)
});
gulp.task('default', ['watch', 'server'])
