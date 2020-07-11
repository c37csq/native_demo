var gulp = require('gulp')
var htmlclean = require('gulp-htmlclean') //html压缩
var imagemin = require('gulp-imagemin') //图片压缩
var uglify = require('gulp-uglify') //js代码压缩
var strip = require('gulp-strip-debug') //删除断点
var concat = require('gulp-concat') //拼接合并js文件
var less = require('gulp-less') //css中less转css
var postcss = require('gulp-postcss') //可以添加css代码前缀
var autoprefixer = require('gulp-autoprefixer') //css代码添加前缀
var cssnano = require('gulp-cssnano') //压缩css代码
var connect = require('gulp-connect') //开服务器
var devMode = process.env.NODE_ENV == 'development'
var folder = {
  src: 'src/', //开发目录文件夹
  dist: 'dist/' //压缩打包后目录文件夹
}
gulp.task('html', function () {
  var page = gulp.src(folder.src + 'html/*').pipe(connect.reload())
  if (!devMode) {
    page.pipe(htmlclean())
  }
  page.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('images', function () {
  gulp
    .src(folder.src + 'images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task('js', function () {
  var page = gulp.src(folder.src + 'js/*').pipe(connect.reload())
  if (!devMode) {
    page
      .pipe(strip())
      .pipe(uglify())
  }

  page.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('css', function () {
  // var options = [autoprefixer(), cssnano()]
  var page = gulp
    .src(folder.src + 'css/*')
    .pipe(less())
    .pipe(connect.reload())
  if (!devMode) {
    // page.pipe(postcss(options))
    page.pipe(cssnano())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false // 是否美化
      }))
  }
  page.pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task('watch', function () {
  gulp.watch(folder.src + 'html/*', ['html'])
  gulp.watch(folder.src + 'css/*', ['css'])
  gulp.watch(folder.src + 'js/*', ['js'])
  gulp.watch(folder.src + 'images/*', ['images'])
})
gulp.task('server', function () {
  connect.server({
    port: '8090',
    livereload: 'true'
  })
})
gulp.task('default', ['html', 'images', 'js', 'css', 'watch', 'server'])