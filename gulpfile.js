const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const autoPreFixer = require('gulp-autoprefixer')

// copy html files to dist folder
gulp.task('copy-html', () => {
  gulp.src('./src/*.html').pipe(gulp.dest('./dist'))
})

// copy images to dist folder
gulp.task('copy-img', () => {
  gulp.src('./src/img/*').pipe(gulp.dest('./dist/img'))
})

// copy css files to dist folder with auto prefixing for last 3 versions of browser
gulp.task('styles', () => {
  gulp.src('./src/css/**/*.css').pipe(autoPreFixer({
    browsers: ['last 3 versions']
  }))
    .pipe(gulp.dest('./dist/css'))
})

// copy js files to dist folder
gulp.task('scripts', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js'))
})

// copy service worker to dist folder
gulp.task('copy-sw', () => {
  gulp.src('./src/sw.js')
    .pipe(gulp.dest('./dist'))
})

// copy json data to dist folder
gulp.task('copy-data', () => {
  gulp.src('./src/data/**/*')
    .pipe(gulp.dest('./dist/data'))
})

/**
 * This setup the developement server. This watch the file changes
 * and copy to dist folder and reload browser
 */
gulp.task('default', ['copy-html', 'copy-img', 'copy-data', 'styles', 'scripts', 'copy-sw'], () => {
  gulp.watch('./src/*.html', ['copy-html'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
  gulp.watch('./src/**/*.js', [ 'scripts' ])
  // gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload)
  gulp.watch('./src/css/**/*.css', ['styles'])
  gulp.watch('./src/sw.js', ['copy-sw'])
  gulp.watch('./dist/css/**/*.css').on('change', browserSync.reload)
  gulp.watch('./src/img/*', ['copy-img'])

  browserSync.init({
    server: './dist'
  })
})

/**
 * This build the code dist(distribution) folder from src(source) folder
 * start the server for production code
 */
gulp.task('serve', ['copy-html', 'copy-img', 'copy-data', 'styles', 'scripts', 'copy-sw'], () => {
  browserSync.init({
    server: './dist'
  })
})
