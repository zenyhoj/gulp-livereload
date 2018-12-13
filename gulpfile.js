"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat"); //css concatenation package
var minifyCss = require("gulp-minify-css"); //minify css
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');


// file paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
// var CSS_PATH = "public/css/**/*.css";

gulp.task("html", function () {
  console.log("html started");
});

// // Styles
// gulp.task("styles", function () {
//   console.log("concatenating css...");
//   return gulp
//     .src([
//       "public/css/reset.css",
//       CSS_PATH
//     ]) /** load reset.css first then the rest*/
//     .pipe(
//       plumber(function (err) {
//         console.log("Styles Task Error");
//         console.log(err);
//         this.emit("end");
//       })
//     )
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(concat("styles.css"))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });



//default task
gulp.task('default', ['styles', 'scripts', ], function () {
  console.log('Starting default tasks');
})

// Styles for SCSS
gulp.task("styles", function () {
  console.log("SCSS task started...");
  // prefix _filename.scss for partial, and @import _filename.scss in the styles.scss
  return gulp.src("public/scss/styles.scss")
    .pipe(
      plumber(function (err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())

    .pipe(autoprefixer())
    .pipe(sass({
      // will compressed the file
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});


//Scripts Tasks
gulp.task("scripts", function () {
  console.log("js scripts starts");

  return gulp
    .src(SCRIPTS_PATH)
    //Error handling
    .pipe(
      plumber(function (err) {
        console.log("Scripts Task Error");
        console.log(err.toString());
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())

    .pipe(babel({
      presets: ['@babel/env']
    }))

    //removes whitespaces in js files
    .pipe(uglify())
    //concatenates js files into one named scripts.js
    //uses the package gulp-concat
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload()); /** automatically refreshes after saving changes */
});

// watch task, perform default tasks first
gulp.task("watch", ['default'], function () {
  console.log("starting watch task");
  require("./server"); /* run the server.js */
  livereload.listen();
  // gulp.watch([SCRIPTS_PATH, CSS_PATH, HTML_PATH], ["scripts", "styles", "html"]);
  gulp.watch(SCRIPTS_PATH, ["scripts"]);
  gulp.watch('public/scss/**/*.scss', ["styles"]);
});