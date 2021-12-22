
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create()

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css' +
            ''))
        .pipe(browserSync.stream())

});


gulp.task('clean', () => {
    return del([
        'css/*.css',
    ]);
});


gulp.task('watch', () => {

    browserSync.init({
        server: {
            baseDir:'./'
        }
    })

    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['clean', 'sass'])(done);
    });

    gulp.watch("*.html").on('change', browserSync.reload)
});

gulp.task('default', gulp.series(['watch']));
