// 验证模块
const Joi = require('joi');
// 用户模块
const { Goods } = require('../../model/Goods');

module.exports = async(req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'));
    // 验证
    const { error } = Joi.validate(id, schema)
        // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });
    // 通过验证
    // 查询商品信息
    const goods = await Goods.findOne({ _id: id });

    // 响应
    return res.send(goods);

}