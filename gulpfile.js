var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
    var less = require('gulp-less');
    var postcss = require('gulp-postcss');
    var px2rem = require('postcss-px2rem');
    var autoprefixer = require('autoprefixer');
    // var mqpacker = require('css-mqpacker');
    // var csswring = require('csswring');

var opacity = function (css, opts) {
  css.walkDecls(function(decl) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(decl, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};

// less
gulp.task('less', function() {
  var processors = [
    px2rem({remUnit: 75}),
    autoprefixer({browsers: ['last 7 version']}),
    opacity
    // mqpacker,
    // csswring
  ];
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('less/css/'));
});

// sass
gulp.task('sass', function() {
  var processors = [
    px2rem({remUnit: 75}),
    autoprefixer({browsers: ['last 7 version']}),
    opacity
    // mqpacker,
    // csswring
  ];
  gulp.src('sass/*.scss')
    .pipe(plugins.compass({
      config_file: './config.rb',
      css: 'sass/css',
      sass: 'sass'
    }))
    .pipe(postcss(processors))
    // .pipe(plugins.minifyCss())
    // .pipe(plugins.rename(function(path) {
    //     path.basename += ".min";
    // }))
    .pipe(gulp.dest('sass/css/'));
});

// 默认任务
gulp.task('default', ['watch', 'less', 'sass']);

gulp.task('watch', function() {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('sass/*.scss', ['sass']);
});
