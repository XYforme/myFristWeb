const { Goods } = require('../../model/Goods');

module.exports = async(req, res) => {
    // 创建banner
    // res.send(req.fields);
    // return;
    const goods = new Goods(req.fields);
    // 保存商品
    await goods.save();
    // 响应
    res.send(goods);
    // res.send(req.fields);

};