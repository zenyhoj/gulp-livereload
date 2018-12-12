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

// file paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";

gulp.task("html", function () {
  console.log("html started");
});

gulp.task("styles", function () {
  console.log("concatenating css...");
  return gulp
    .src([
      "public/css/reset.css",
      CSS_PATH
    ]) /** load reset.css first then the rest*/
    .pipe(
      plumber(function (err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat("styles.css"))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task("scripts", function () {
  console.log("js scripts starts");

  return gulp
    .src(SCRIPTS_PATH)
    .pipe(uglify()) //does javascript minification
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload()); /** automatically refreshes after saving changes */
});

// watch task
gulp.task("watch", function () {
  console.log("starting watch task");
  require("./server"); /* run the server.js */
  livereload.listen();
  // gulp.watch([SCRIPTS_PATH, CSS_PATH, HTML_PATH], ["scripts", "styles", "html"]);
  gulp.watch(SCRIPTS_PATH, ["scripts"]);
  gulp.watch(CSS_PATH, ["styles"]);
});