// 用户模块
const { Goods } = require('../../model/Goods');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async(req, res) => {
    // 当前页
    // res.send(req.query);
    // return;
    let page = +req.query.page;
    // 如果页码没有传递
    if (!page || !_.isNumber(page)) page = 1;
    // 查询条件
    let condition = {};
    // 分类条件
    if (req.query.category != undefined) {
        condition.gtype = req.query.category;
    }
    // 状态条件
    // if (req.query.state != undefined) {
    // 	condition.state = req.query.state;
    // }
    // console.log(condition)
    // 查询用户信息
    // res.send(condition);
    // return;
    const goods = await pagination(Goods).page(page).size(5).display(3).find(condition).select('-content -meta').exec();
    // 响应
    res.send(goods);
}