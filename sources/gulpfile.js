var gulp          = require('gulp'),                  // Gulp
    plugins       = require('gulp-load-plugins')(),   // This plugin allows us to use all of our packageswithout creating varibles for each one
    connect       = new plugins.connectPhp(),         // Gulp php server
    browserSync   = require('browser-sync').create(), // BrowserSync

    htmlOptions   = { conditionals: true, spare: true, collapseWhitespace: true },

    /************
    * Paths
    ************/
    baseDir       = '../',
    proRoot       = baseDir + 'assets/',

    nodeRoot      = 'node_modules/',

    sourceCss     = '_css/',
    sourceHtml    = '_html/',
    sourceScripts = '_scripts/',


    /************
    * Asset List
    ************/
    assets        = {   /************
                        * JS
                        ************/
                        dev_scripts:
                        [
                            nodeRoot+'bootstrap/dist/js/bootstrap.min.js',
                            // nodeRoot+'slick-carousel/slick/slick.min.js',
                            // nodeRoot+'js-cookie/src/js.cookie.js',
                            // nodeRoot+'image-map-resizer/js/imageMapResizer.min.js',
                            // nodeRoot+'jquery-match-height/dist/jquery.matchHeight-min.js',
                            // nodeRoot+'@fancyapps/fancybox/dist/jquery.fancybox.min.js',

                            sourceScripts+'lib.js',
                            sourceScripts+'app.js'
                        ],
                        pro_scripts: proRoot+'scripts',

                        /************
                        * CSS
                        ************/
                        dev_styles:
                        [
                            sourceCss+'my-mixins.scss',

                            nodeRoot+'slick-carousel/slick/slick.css',
                            nodeRoot+'@fancyapps/fancybox/dist/jquery.fancybox.min.css',

                            sourceCss+'main.scss'
                        ],
                        pro_styles: proRoot+'css',


                        /************
                        * HTML
                        ************/
                        dev_html_includes: sourceHtml+'includes/*',
                        pro_html_includes: proRoot+'includes/',

                        dev_html: sourceHtml+'*.php',
                        pro_html: baseDir,


                        /************
                        * FILES
                        ************/
                        dev_files:
                        [
                            [nodeRoot+'font-awesome/fonts/*'],
                            //
                            // Add in jquery manually in order to replicate Wordpress
                            [nodeRoot+'jquery/dist/jquery.min.js']
                        ],
                        pro_files:
                        [
                            proRoot+'fonts/font-awesome',
                            proRoot+'scripts'
                        ]

                        /***  MAKE SURE YOUR COMMAS ARE CORRECT  ***/
                    };




/*  gulp js
/////////////////////////////////////////////////////////
// Minimize all the listed javascript files from above
-------------------------------------------------------*/
gulp.task('js', function(done){
    gulp.src(assets.dev_scripts)
        .pipe(browserSync.stream())
        .pipe(plugins.concat('master.js'))
        .pipe(gulp.dest(assets.pro_scripts))
        .pipe(plugins.rename('master.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(assets.pro_scripts));

    done();
});




/*  gulp css
/////////////////////////////////////////////////////////
// Minimize all the listed css files from above
-------------------------------------------------------*/
gulp.task('css', function(done){
    gulp.src(assets.dev_styles)
        .pipe(browserSync.stream())
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
        .pipe(gulp.dest(assets.pro_styles));

    done();
});




/*  gulp includes
/////////////////////////////////////////////////////////
// Minimize all includes
-------------------------------------------------------*/
gulp.task('includes', function(done) {
    gulp.src(assets.dev_html_includes)
        .pipe(plugins.htmlmin(htmlOptions))
        .pipe(gulp.dest(assets.pro_html_includes));

    done();
});
/*  gulp app
/////////////////////////////////////////////////////////
// Minimize all base files
-------------------------------------------------------*/
gulp.task('app', function(done) {
    gulp.src(assets.dev_html)
        .pipe(plugins.htmlmin(htmlOptions))
        .pipe(gulp.dest(assets.pro_html));

    done();
});
/*  gulp html
/////////////////////////////////////////////////////////
// Run all the listed html gulp commands at once
-------------------------------------------------------*/
gulp.task('html', gulp.parallel('includes', 'app'));



/*  gulp move
/////////////////////////////////////////////////////////
// Move files from node_modules to public_html
-------------------------------------------------------*/
gulp.task('move', function(done) {
    for(var i=0; i < assets.dev_files.length; i++)
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
gulp.task('build', gulp.parallel('html', 'js', 'css', 'move'));




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
    var portNum = 8022;

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
                    sourceCss+'**/*.scss'
                ]),
    watch_js  = assets.dev_scripts.concat([

                ]);

gulp.task('watch', function(){
    gulp.watch(watch_css,  gulp.parallel('css'));
    gulp.watch(watch_js,   gulp.parallel('js') );

    gulp.watch(assets.dev_html, gulp.parallel('app') );
    gulp.watch(assets.dev_html_includes, gulp.parallel('includes') );
});




/*  gulp
/////////////////////////////////////////////////////////
// Build all files
// Connect to a vertiual server
// Compress SASS and JS on Save
-------------------------------------------------------*/
gulp.task('default', gulp.parallel('watch',  gulp.series('connect', 'disconnect')));
