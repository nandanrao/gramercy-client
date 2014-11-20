var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

gulp.task('default', function(){

})

gulp.task('sass', function(){
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('inject', function(){
  var bower = gulp.src(bowerFiles(), {read: false});
  var app = gulp.src(['app/**/*.js'], {read: false});

  gulp.src('app/index.html')
    .pipe(inject(bower, {name: 'bower'}))
    .pipe(inject(app, {relative: true}))
    .pipe(gulp.dest('app'))
})

gulp.task('serve', ['inject'], function(){
  browserSync({
    server: {
      baseDir: 'app',
      routes: {
        '/bower_components': '../bower_components'
      }
    }
  })

  gulp.watch(['*.html', 'scripts/*.js'], {cwd: 'app'}, reload);
  gulp.watch('app/styles/*.scss', ['sass']);
});

