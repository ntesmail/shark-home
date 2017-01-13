var gulp = require('gulp'),
    argv = require('yargs').argv,
    runSequence = require('run-sequence'),
    express = require('express'),
    openurl = require('openurl'),
    sass = require('gulp-sass'),
    path = require('path');
var sharkAutomation = require('shark-automation');

var config = require('./shark-deploy-conf.js');

/***------------- build start ---------------***/

gulp.task('build', function(cb) {
    sharkAutomation.registerBuildTasks({
        baseConf: config,
        gulp: gulp
    });

    var target = argv.target;
    if (!target) {
        throw new Error('--target should be provided. ex: gulp build --target test');
    }
    if (target !== 'online' && target !== 'test' && target !== 'develop') {
        throw new Error('--target should be online or test or develop');
    }

    gulp.on('error', function() {
        console.log('error error error error');
    });

    runSequence(
        // clean folders
        'clean',
        // // compass and copy to tmp1
        ['sass-preprocess', 'webpack-server'],
        // // use reference in html and ftl
        ['useref'],
        // // imagemin and copy to tmp1
        'imagemin',
        // // revision images
        'revision-image',
        // // revreplace images
        ['revreplace-css', 'revreplace-js'],
        // // revision css,js
        ['revision-css', 'revision-js'],
        // // revreplace html,ftl
        ['revreplace-html'],
        // // copy to build dir, copy java
        ['copy-build'],
        // callback
        cb
    );

});

gulp.task('serve-express', function(cb) {
    var app = express();
    var showdown  = require('showdown'),
    converter = new showdown.Converter();
    app.engine('.html', require('ejs').__express);
    // 后缀
    app.set('view engine', 'html');
    // 模板目录
    app.set('views', path.join(__dirname, 'src/main/webapp/examples'));
    // index.html
    app.get(config.contextPath + '/index.html', function(req, res) {
        //向页面模板传递参数，可以传递字符串和对象，注意格式
        res.render('index', {converter: converter});
    });
    // 生成header等
    app.use('/shark', require('./lib/routes/staticRoutes'));
    
    var router = sharkAutomation.registerServerRouter({
        baseConf: config,
        gulp: gulp
    });
    app.use(router);
    app.listen(config.port, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('express listening on %d', config.port);
        cb();
    });

});


gulp.task('serve', function(cb) {
    sharkAutomation.registerServerTasks({
        baseConf: config,
        gulp: gulp
    });
    runSequence(['browser-sync', 'serve-express'], 'open-url', cb);
});

