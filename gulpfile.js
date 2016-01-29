var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var uglifycss = require('gulp-uglifycss');
var sass = require("gulp-sass");
var es = require("event-stream");
var ap = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');

var _src = "src/";
var _dist = "public/";

gulp.task('script', function () {
    return gulp.src(_src + "js//**/*.js")
        //.pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(_dist + "js"))
        .pipe(livereload());
});
gulp.task("style", function () {
    var cssfromsass = gulp.src(_src + "sass/screen.sass")
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass());
    var css = gulp.src(_src + "css/*.css");


    return es.merge(cssfromsass, css).pipe(plumber())
        .pipe(concat("screen.css"))
        .pipe(ap())
        //.pipe(uglifycss())
        .pipe(plumber.stop())
        .pipe(gulp.dest(_dist + "css"))
        .pipe(livereload());
});
gulp.task('markup', function () {
    return gulp.src(_src + "*.jade")
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(_dist))
        .pipe(livereload());
});
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/{css,sass}/*.{css,sass}', ["style"]);
    gulp.watch('src/*.html', ['markup']);
});

gulp.task('lr', function () {
    var server = livereload();


    livereload.listen();
    livereload();
    gulp.watch('src/js/**/*.js', ['script']);
    gulp.watch('src/css/*.css', ["style"]);
    gulp.watch('src/**/*.sass', ["style"]);
    gulp.watch('src/**/*.jade', ['markup']);
    gulp.watch('src/**/*.html', ['markup']);

});

gulp.task('startjs', function () {
    return gulp.src(_src + "components/js/*.js")
        .pipe(concat('components.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(_dist + "js"));

});
gulp.task('startcss', function () {
    return gulp.src(_src + "components/css/*.css")
        .pipe(concat('components.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(_dist + "css"));

});
gulp.task('default', ['startcss', 'startjs', 'markup', 'script', 'style', 'lr']);