const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const autoPreFixer = require('gulp-autoprefixer')

gulp.task('copy-html', () => {
  gulp.src('./src/*.html').pipe(gulp.dest('./dist'))
})

gulp.task('copy-img', () => {
  gulp.src('./src/img/*').pipe(gulp.dest('./dist/img'))
})

gulp.task('styles', () => {
  gulp.src('./src/css/**/*.css').pipe(autoPreFixer({
    browsers: ['last 3 versions']
  }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('scripts', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('copy-data', () => {
  gulp.src('./src/data/**/*')
    .pipe(gulp.dest('./dist/data'))
})
gulp.task('default', ['copy-html', 'copy-img', 'copy-data', 'styles', 'scripts'], () => {
  gulp.watch('./src/*.html', ['copy-html'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
  gulp.watch('./src/**/*.js', [ 'scripts' ])
  gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload)
  gulp.watch('./src/css/**/*.css', ['styles'])
  gulp.watch('./dist/css/**/*.css').on('change', browserSync.reload)
  gulp.watch('./src/img/*', ['copy-img'])

  browserSync.init({
    server: './dist'
  })
})
