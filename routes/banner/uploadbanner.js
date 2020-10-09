const { Banner } = require('../../model/banner');

module.exports = async(req, res) => {
    // 创建banner
    const banner = new Banner(req.fields);
    // 保存banner
    await banner.save();
    // 响应
    res.send(banner);
    // res.send(req.fields);


};