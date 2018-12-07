var gulp = require("gulp");
var uglify = require("gulp-uglify");
var pump = require("pump");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat"); //css concatenation package

// file paths
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";
gulp.task("html", function() {
  console.log("html started");
});

gulp.task("styles", function() {
  console.log("concatenating css...");
  return gulp
    .src([
      "public/css/reset.css",
      CSS_PATH
    ]) /** load reset.css first then the rest*/
    .pipe(concat("styles.css"))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task("scripts", function() {
  console.log("js scripts starts");

  return gulp
    .src(SCRIPTS_PATH)
    .pipe(uglify()) //does javascript minification
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload()); /** automatically refreshes after saving changes */
});

// watch task
gulp.task("watch", function() {
  console.log("starting watch task");
  require("./server"); /* run the server.js */
  livereload.listen();
  gulp.watch([SCRIPTS_PATH, CSS_PATH], ["scripts", "styles"]);
  // gulp.watch(CSS_PATH, ["styles"]);
});
