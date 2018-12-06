var gulp = require("gulp");
var uglify = require("gulp-uglify");
var pump = require("pump");
var livereload = require('gulp-livereload');

// file paths
var SCRIPTS_PATH = "public/scripts/**/*.js";

gulp.task("html", function () {
    console.log("html started");
});

gulp.task("style", function () {
    console.log("style started");
});

gulp.task("scripts", function () {
    console.log("js scripts starts");

    return gulp
        .src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest("public/dist"))
        .pipe(livereload()); /** automatically refreshes after saving changes */
});

// watch task
gulp.task("watch", function () {
    console.log("starting watch task");
    require('./server'); /* run the server.js */
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ["scripts"]);
});