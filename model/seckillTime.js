// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// banner集合规则
const SeckillTimeSchema = new Schema({
    skTime: String,
});

//banner集合类
const SeckillTime = mongoose.model('SeckillTime', SeckillTimeSchema);

SeckillTime.find().then(async result => {
    if (result == null) {
        const seckillTime = await SeckillTime.create({
            skTime: '2020-9-31 10:00:00',
        });
    }
})

module.exports = {
    SeckillTime,
};