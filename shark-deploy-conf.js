module.exports = {
    comment: 'shark home',
    version: '0.1.0',
    product: 'shark-home',
    contextPath: '',
    protocol: 'http',
    browserPort: 9000,
    port: 19000,
    hostname: 'localhost',
    openurl: 'http://localhost:9000/index.html',
    rootPath: __dirname,
    tmpDir: '.tmp',
    webapp: 'src/main/webapp',
    mock: 'src/test/mock',
    scssPath: 'style/scss',
    cssPath: 'style/css',
    imgPath: 'style/img',
    videoPath: 'style/video',
    jsPath: 'js',
    fontPath: 'font',
    htmlPath: 'examples',
    templatePath: 'WEB-INF/tmpl',
    staticVersion: '2016',
    ajaxPrefix: '/xhr',
    mimgPathPrefix: '/hxm',
    ifwebpack: false,
    mimgURLPrefix: {
        develop: '', //the rootpath of static resource during develop phase
        online: '', //the rootpath of static resource at online phase
        test: '' //the rootpath of static resource at test phase
    }
};
