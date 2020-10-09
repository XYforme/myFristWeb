// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// banner集合规则
const BannerSchema = new Schema({
    btype: String,
    bpath: String,
    blink: String
});

//banner集合类
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = {
    Banner,
};