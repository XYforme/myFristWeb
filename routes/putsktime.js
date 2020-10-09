const { SeckillTime } = require('../model/seckillTime');

module.exports = async(req, res) => {
    // 创建banner
    // res.send(req.fields);
    // return;
    await SeckillTime.deleteMany();
    const seckillTime = new SeckillTime(req.fields);
    // 保存banner
    await seckillTime.save();
    // 响应
    res.send(seckillTime);
    // res.send(req.fields);

};