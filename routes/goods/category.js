// 商品模块
const { Goods } = require('../../model/Goods');

module.exports = async(req, res) => {
    // 获取分类id

    const id = req.params.id;
    // 查询用户信息
    const goods = await Goods.find({ gtype: id });
    // 响应
    res.send(goods);
}