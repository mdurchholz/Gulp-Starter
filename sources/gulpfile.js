var gulp          = require('gulp'),                  // Gulp
    plugins       = require('gulp-load-plugins')(),   // This plugin allows us to use all of our packageswithout creating varibles for each one
    connect       = new plugins.connectPhp(),         // Gulp php server
    browserSync   = require('browser-sync').create(), // BrowserSync
    htmlOptions   = {collapseWhitespace: true},       // HTML minification options


    /************
    * Paths
    ************/
    baseDir       = '../',
    proRoot       = baseDir + 'assets/',

    nodeRoot      = 'node_modules/',

    sourceCss     = '_css/',
    sourceHtml    = '_html',
    sourceScripts = '_scripts/',


    /************
    * Asset List
    ************/
    assets        = {   /************
                        * JS
                        ************/
                        dev_scripts:
                        [
                            nodeRoot+'jquery/dist/jquery.min.js',
                            nodeRoot+'bootstrap-sass/assets/javascripts/bootstrap.min.js',
                            // nodeRoot+'slick-carousel/slick/slick.min.js',
                            // nodeRoot+'jquery-match-height/dist/jquery.matchHeight-min.js',
                            // nodeRoot+'@fancyapps/fancybox/dist/jquery.fancybox.min.js',
                            // nodeRoot+'js-cookie/src/js.cookie.js',

                            sourceScripts+'lib.js',
                            sourceScripts+'app.js'
                        ],
                        pro_scripts: proRoot+'scripts',


                        /************
                        * CSS
                        ************/
                        dev_styles:
                        [
                            sourceCss+'styles/_my-mixins.scss',

                            nodeRoot+'font-awesome/scss/font-awesome.scss',
                            nodeRoot+'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
                            // nodeRoot+'slick-carousel/slick/slick.css',
                            // nodeRoot+'@fancyapps/fancybox/dist/jquery.fancybox.min.css',

                            sourceCss+'main.scss'
                        ],
                        pro_styles: proRoot+'css',


                        /************
                        * HTML
                        ************/
                        // dev_html: sourceHtml+'/**/*',
                        // pro_html: proRoot,


                        /************
                        * FILES
                        ************/
                        dev_files:
                        [
                            [nodeRoot+'font-awesome/fonts/*'],
                            [nodeRoot+'bootstrap-sass/assets/fonts/bootstrap/*']
                            //
                            // Add in jquery manually in order to replicate Wordpress
                            // [nodeRoot+'jquery/dist/jquery.min.js']
                        ],
                        pro_files:
                        [
                            proRoot+'fonts',
                            proRoot+'fonts/bootstrap'
                            // proRoot+'scripts'
                        ]

                        /***  MAKE SURE YOUR COMMAS ARE CORRECT  ***/
                    };




/*  gulp js
/////////////////////////////////////////////////////////
// Minimize all the listed javascript files from above
-------------------------------------------------------*/
gulp.task('js', function(done){
    gulp.src(assets.dev_scripts)
        .pipe(plugins.concat('master.js'))
        .pipe(gulp.dest(assets.pro_scripts))
        .pipe(plugins.rename('master.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(assets.pro_scripts))
        .pipe(browserSync.stream());

    done();
});




/*  gulp css
/////////////////////////////////////////////////////////
// Minimize all the listed css files from above
-------------------------------------------------------*/
gulp.task('css', function(done){
    gulp.src(assets.dev_styles)
        .pipe(plugins.concat('master.css'))
        .pipe(plugins.sass({
            includePaths: [
                nodeRoot+'font-awesome/scss/',
                nodeRoot+'bootstrap-sass/assets/stylesheets/',
                sourceCss
            ]
        }))
        .pipe(plugins.autoprefixer('last 2 version','safari 5','ie 8','ie 9','opera 12.1','ios 6','android 4'))
        .pipe(gulp.dest(assets.pro_styles))
        .pipe(plugins.rename('master.min.css'))
        .pipe(plugins.cssnano({discardComments:{removeAll: true}}))
        .pipe(gulp.dest(assets.pro_styles))
        .pipe(browserSync.stream());

    done();
});




/*  gulp partials
/////////////////////////////////////////////////////////
// Minimize all HTML files
-------------------------------------------------------*/
gulp.task('html', function() {
    return gulp.src(paths.dev_html)
        .pipe($.htmlmin(htmlOptions))
        .pipe(gulp.dest(paths.pro_html));
});




/*  gulp move
/////////////////////////////////////////////////////////
// Move files from node_modules to public_html
-------------------------------------------------------*/
gulp.task('move', function(done) {
    for(var i=0; i < assets.dev_assets.length; i++)
    {
        for(var j=0; j < assets.dev_files[i].length; j++)
        {
            moveFiles(i, j);
        }
    }

    done();
});

function moveFiles(i, j)
{
    return gulp.src(assets.dev_files[i][j])
               .pipe(gulp.dest(assets.pro_files[i]));
}




/*  gulp build
/////////////////////////////////////////////////////////
// Compress all files
-------------------------------------------------------*/
gulp.task('build', gulp.parallel('js', 'css', 'move'));




/*  gulp connect
/////////////////////////////////////////////////////////
// Reload the browser after save
-------------------------------------------------------*/
gulp.task('connect', gulp.series('build', setupServer));

gulp.task('disconnect', function(done) {
    connect.closeServer();

    done();
});

function setupServer()
{
    var portNum = 8012;

    connect.server({ base: baseDir+'.', port: portNum}, function(){
        browserSync.init({
            proxy  : '127.0.0.1:'+portNum,
            notify : false,
            port   : 8080,
            files  : [
                baseDir+'*.php',
                proRoot+'css/master.min.css',
                proRoot+'scripts/master.min.js'
            ]
        });
    });
}




/*  gulp watch
/////////////////////////////////////////////////////////
// Watch the list of files and run the
// associted gulp task for "On Save"
-------------------------------------------------------*/
var watch_css = assets.dev_styles.concat([
                    // sourceCss+'libraries/**/*.scss',
                    // sourceCss+'styles/**/*.scss'
                    sourceCss+'**/*.scss'
                ]),
    watch_js  = assets.dev_scripts.concat([

                ]);

gulp.task('watch', function(){
    gulp.watch(watch_css, gulp.parallel('css'));
    gulp.watch(watch_js,  gulp.parallel('js') );
});




/*  gulp
/////////////////////////////////////////////////////////
// Build all files
// Connect to a vertiual server
// Compress SASS and JS on Save
-------------------------------------------------------*/
gulp.task('default', gulp.parallel('watch',  gulp.series('connect', 'disconnect')));
