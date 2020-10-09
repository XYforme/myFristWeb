// banner模块
const { Goods } = require('../../model/Goods');

// 文件模块
const fs = require('fs');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async(req, res) => {
    // 获取goods id
    const id = req.params['id'];
    // 删除goods
    let goods = await Goods.findByIdAndDelete(id);
    // 如果缩略图存在
    if (goods.thumbnail) {
        // 删除缩略图
        await unlink(path.join(__dirname, '../', '../', 'public', goods.thumbnail));
    }
    // 响应
    res.send(goods);
}