var gulp          = require('gulp'),
    plugins       = require('gulp-load-plugins')(),

    sourceRoot    = '',
    nodeRoot      = 'node_modules/',
    publicH       = '../public_html/',
    proRoot       = publicH+'assets/',

    sourceCss     = sourceRoot+'_css/',
    sourceHtml    = sourceRoot+'_html/',
    sourceScripts = sourceRoot+'_scripts/',

    htmlOptions   = { conditionals: true, spare: true, collapseWhitespace: true },

    paths         = {
                        /************
                        * JS
                        ************/
                        dev_scripts:
                        [
                            nodeRoot+'jquery/dist/jquery.min.js',
                            nodeRoot+'bootstrap/dist/js/bootstrap.min.js',
                            sourceScripts+'lib.js',
                            sourceScripts+'app.js'
                        ],
                        pro_scripts: proRoot+'scripts',


                        /************
                        * CSS
                        ************/
                        dev_css:
                        [
                            nodeRoot+'bootstrap/dist/css/bootstrap.min.css',
                            sourceCss+'master.scss'
                        ],
                        pro_css: proRoot+'css',


                        /************
                        * HTML
                        ************/
                        dev_html_includes: sourceHtml+'includes/*',
                        pro_html_includes: proRoot+'includes/',

                        dev_html_app: sourceHtml+'*.php',
                        pro_html_app: publicH,


                        /************
                        * FONTS
                        ************/
                        dev_fonts:
                        [
                            nodeRoot+'bootstrap/fonts/*',
                            nodeRoot+'font-awesome/fonts/*'
                        ],
                        pro_fonts:
                        [
                            proRoot+'fonts'
                        ]

                        /***  MAKE SURE YOUR COMMAS ARE CORRECT  ***/
                    };


/*  gulp js
/////////////////////////////////////////////////////////
// Minimize all the listed javascript files from above
-------------------------------------------------------*/
gulp.task('js', function(){
    return gulp.src(paths.dev_scripts)
        .pipe(plugins.concat('master.js'))
        .pipe(gulp.dest(paths.pro_scripts))
        .pipe(plugins.rename('master.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.pro_scripts));
});


/*  gulp css
/////////////////////////////////////////////////////////
// Minimize all the listed css files from above
-------------------------------------------------------*/
gulp.task('css', function(){
    gulp.src(paths.dev_css)
        .pipe(plugins.concat('master.css'))
        .pipe(plugins.sass({includePaths: [sourceCss]}))
        .pipe(plugins.autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'], cascade: false}))
        .pipe(gulp.dest(paths.pro_css))
        .pipe(plugins.rename('master.min.css'))
        .pipe(plugins.cssnano({discardComments: {removeAll: true}}))
        .pipe(gulp.dest(paths.pro_css));
});


/*  gulp fonts
/////////////////////////////////////////////////////////
// Move font file from node_modules to public_html
-------------------------------------------------------*/
gulp.task('fonts', function() {
    for(var i=0; i < paths.dev_fonts.length; i++)
    {
        moveFont(i);
    }
});

function moveFont(place)
{
    return gulp.src(paths.dev_fonts[place])
      .pipe(gulp.dest(paths.pro_fonts[place]));
}


/*  gulp includes
/////////////////////////////////////////////////////////
// Minimize all includes
-------------------------------------------------------*/
gulp.task('includes', function() {
    return gulp.src(paths.dev_html_includes)
        .pipe(plugins.htmlmin(htmlOptions))
        .pipe(gulp.dest(paths.pro_html_includes));
});


/*  gulp app
/////////////////////////////////////////////////////////
// Minimize all base files
-------------------------------------------------------*/
gulp.task('app', function() {
    return gulp.src(paths.dev_html_app)
        .pipe(plugins.htmlmin(htmlOptions))
        .pipe(gulp.dest(paths.pro_html_app));
});


/*  gulp html
/////////////////////////////////////////////////////////
// Run all the listed html gulp commands at once
-------------------------------------------------------*/
gulp.task('html', function() {
    gulp.start('includes', 'app');
});


/*  gulp
/////////////////////////////////////////////////////////
// Run all listed gulp commands at once
-------------------------------------------------------*/
gulp.task('default', function(){
    gulp.start('js', 'css', 'html', 'fonts');
});


/*  gulp watch
/////////////////////////////////////////////////////////
// Watch the list of files and run the
// associted gulp task for "On Save"
-------------------------------------------------------*/
var addCss = [sourceCss+'_style.scss', sourceCss+'_media.scss'];
var addJs  = [];


gulp.task('watch', function(){
    gulp.watch(addToWatchList(addCss, paths.dev_css),     ['css']);
    gulp.watch(addToWatchList(addJs,  paths.dev_scripts), ['js'] );
    gulp.watch(paths.dev_html_includes, ['includes']);
    gulp.watch(paths.dev_html_app, ['app']);
});


function addToWatchList(array, list)
{
    array.push(list);

    return array;
}
