// 路由集合
module.exports = app => {
    // 首页
    app.use('/login', require('./login'));
    app.use('/upload', require('./upload'));
    app.use('/banner', require('./banner'));
    app.use('/goods', require('./goods'));
    // app.use('/uploadbanner', require('./uploadbanner'));
    app.use('/getsktime', require('./getsktime'));
    app.use('/putsktime', require('./putsktime'));

};