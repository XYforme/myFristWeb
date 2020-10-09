// 数据库操作
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// banner集合规则
const GoodsSchema = new Schema({
    gpath: {
        type: String,
        default: null
    },
    gtype: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    price: {
        type: String,
        default: 0
    },
    sum: {
        type: String,
        default: 0
    },
    sales: {
        type: String,
        default: 0
    },
    link: {
        type: String,
        default: null
    }
});

//banner集合类
const Goods = mongoose.model('Goods', GoodsSchema);

module.exports = {
    Goods
};