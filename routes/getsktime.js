const { SeckillTime } = require('../model/seckillTime');

module.exports = async(req, res) => {
    const seckillTime = await SeckillTime.find();
    res.send(seckillTime);

};