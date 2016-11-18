var gulp        = require('gulp'),
    less        = require('gulp-less'),
    plumber     = require('gulp-plumber'),
    changed     = require('gulp-changed'),
    browsersync = require('browser-sync'),

// other plugins

    nunjucksRender = require('gulp-nunjucks-render'),
    imagemin       = require('gulp-imagemin'),
    LessAutoPrefix = require('less-plugin-autoprefix');

// Path options
var PATH = {
    src : {
        images  :   'src/images/**/*.*',
        less    :   'src/css/*.less',
        css     :   'src/css/*.css',
        html    :   'src/*.html',
        pages   :   'src/_pages/**/*.+(tpl|html)',
        tpl     :   'src/_templates/**/*.+(tpl|html)',
        js      :   'src/js/**/*.js',
        fonts   :   'src/fonts/**/*.*',
        lessEdit:   'src/css/less/*.less',

    },
    dest: {
        images  :   'html/images/',
        css     :   'html/css/',
        html    :   'html/',
        tpl     :   'html/',
        js      :   'html/js',
        fonts   :   'html/fonts',
    }  
};

// Server options
var SYNC_CONFIG = {
    server  :   {
        baseDir : "./html",
//        index : 'index.html'
    },
    open    :   true,
    notify  :   true
};

// LESS options
var LESS_PREFIXER = new LessAutoPrefix({
        browsers: ['last 5 versions', 'ie 9', 'Firefox 14']
    });

// NUNJUCKS options
var NUNJUCKS_DEFAULTS = {
    path: 'src/_templates/'
};


// Handle styles
gulp.task('css', function() {
    return gulp.src(PATH.src.css)
        .pipe(gulp.dest(PATH.dest.css));
});

gulp.task('less', function() {
    return gulp.src(PATH.src.less)
        .pipe(changed(PATH.dest.css))
        .pipe(plumber( function (err) {
            console.log('*** LESS TASK ERROR ***');
            console.log(err);
            this.emit('end');
        }))
        .pipe(less({
            paths   : [PATH.src.less],
            plugins : [LESS_PREFIXER]
        }))
        .pipe(gulp.dest(PATH.dest.css))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task('styles', ['css', 'less']);


// Handle images
gulp.task('images', function() {
    
    return gulp.src(PATH.src.images)
        .pipe(changed(PATH.dest.images))
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.dest.images));
});

gulp.task('pictures', ['images']);

// handle nunjucks
gulp.task('nunjucks', function() {
    return gulp.src(PATH.src.pages)
        .pipe(changed(PATH.dest.tpl))
        .pipe(nunjucksRender(NUNJUCKS_DEFAULTS))
        .pipe(gulp.dest(PATH.dest.tpl));
});


// Handle html
gulp.task('html', ['nunjucks'], function() {
    
    return gulp.src(PATH.src.html)
        .pipe(changed(PATH.dest.html))
        .pipe(gulp.dest(PATH.dest.html));
});

// handle js
gulp.task('js', function() {

    return gulp.src(PATH.src.js)
        .pipe(changed(PATH.dest.js))
        .pipe(gulp.dest(PATH.dest.js));
});

// handle fonts
gulp.task('fonts', function(){

    return gulp.src(PATH.src.fonts)
        .pipe(gulp.dest(PATH.dest.fonts));
});


// Build task: $ gulp build
gulp.task('build',

    [   'styles',
        'fonts',
        'pictures',
        'js',
        'html'
    ],

    function() {
        console.log('*** Starting BUILD task ***');
    }
);

// Browser-sync task
gulp.task('browsersync', function() {
    browsersync(SYNC_CONFIG);
});


// Default task: $ gulp
gulp.task('default', ['browsersync'], function() {

    // image changes
    gulp.watch(PATH.src.images, ['pictures']);
    
    // html changes
    gulp.watch(PATH.src.html,   ['html']);
    
    // css changes
    gulp.watch(PATH.src.css,    ['css']);

    // less changes
    gulp.watch(PATH.src.lessEdit,   ['less']);
    
    // js changes
    gulp.watch(PATH.src.js,     ['js', browsersync.reload]);

    // template (html) changes
    gulp.watch(
        [
            PATH.src.tpl,
            PATH.src.pages
        ],                     ['html', browsersync.reload]);


});