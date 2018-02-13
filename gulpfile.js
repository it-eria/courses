// Requires
const   gulp         = require('gulp'),
        sass         = require('gulp-sass'),
        globSass     = require('gulp-sass-glob'),
        autoprefixer = require('gulp-autoprefixer'),
        cleanCSS     = require('gulp-clean-css'),
        rename       = require('gulp-rename'),
        sourcemap    = require('gulp-sourcemaps'),
        wait         = require('gulp-wait'),
        del          = require('del'),
        rigger       = require('gulp-rigger'),
        uglify       = require('gulp-uglify'),
        browserSync  = require('browser-sync').create();

// Paths
let path = {
    src: {
        'sass': 'src/scss/main.scss',
        'js': 'src/js/script.js',
        'images': 'src/images/**/*.*',
        'fonts': 'src/fonts/**/*.*',
        'html': 'src/*.html'
    },
    build: {
        'css': 'build/assets/css/',
        'js': 'build/assets/js/',
        'images': 'build/assets/images/',
        'fonts': 'build/assets/fonts/',
        'html': 'build/'
    },
    watch: {
        'sass': 'src/scss/**/*.scss',
        'html': 'src/*.html',
        'js': 'src/js/**/*.js',
        'images': 'src/images/**/*.*',
        'fonts': 'src/fonts/**/*.*'
    }
}

var serverConfig = {
    server: {
        baseDir: './build',
        serveStaticOptions: {
            extensions: ["html"]
        }
        
    },
    notify: false
};

// Tasks

// Clear Build Dest
gulp.task('clear-style', function() {
    return del(['build/assets/css/*.css']);
});

gulp.task('clear-html', function() {
    return del(['build/assets/*.html']);
});

gulp.task('clear-js', function() {
    return del(['build/assets/js/*.js']);
});

// SASS
gulp.task('style:sass', function() {
    return gulp.src(path.src.sass)
        .pipe(wait(500))
        .pipe(globSass())
        .pipe(sourcemap.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS())
            .pipe(rename({
                basename: 'style',
                suffix: '.min'
            }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.css));
});

// HTML
gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemap.init())
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.js));
})

// Images
gulp.task('images', function() {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// Start Server
gulp.task('server:start', function() {
    browserSync.init(serverConfig);
    browserSync.watch([path.watch.sass, path.watch.html, path.watch.js, path.watch.fonts, path.watch.images]).on('change', browserSync.reload);
});

// Reload Server
gulp.task('server:reload', function(done) {
    browserSync.reload();
    done();
});

// Watch
gulp.task('watch', function() {
    // Styles
    gulp.watch([path.watch.sass], gulp.series('clear-style', 'style:sass', 'server:reload'));
    // HTML
    gulp.watch([path.watch.html], gulp.series('clear-html', 'html', 'server:reload'));
    // JS
    gulp.watch([path.watch.js], gulp.series('clear-js', 'js', 'server:reload'));
    // Images
    gulp.watch([path.watch.images], gulp.series('images', 'server:reload'));
    // Fonts
    gulp.watch([path.watch.fonts], gulp.series('fonts', 'server:reload'));
});

// Build Task
gulp.task('build', gulp.series(
    'clear-html',
    'clear-style',
    'clear-js',
    gulp.parallel('style:sass','html','js','images')
));

// Dev Task
gulp.task('dev', gulp.series(
    'style:sass',
    'html',
    'js',
    'images',
    gulp.parallel('watch', 'server:start')
));

