const { Goods } = require('../../model/Goods');


module.exports = async(req, res) => {
    const goods = await Goods.find();
    res.send(goods);

};