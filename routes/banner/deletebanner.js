// banner模块
const { Banner } = require('../../model/banner');

// 文件模块
const fs = require('fs');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async(req, res) => {
    // 获取banner id
    const id = req.params['id'];
    // 删除banner
    let banner = await Banner.findByIdAndDelete(id);
    // 如果缩略图存在
    if (banner.thumbnail) {
        // 删除缩略图
        await unlink(path.join(__dirname, '../', '../', 'public', banner.thumbnail));
    }
    // 响应
    res.send(banner);
}