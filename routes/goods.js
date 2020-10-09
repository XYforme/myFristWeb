const goods = require('express').Router();
//根据分页查询商品
goods.get('/', require('./goods/findByPage'));
//上传商品
goods.post('/', require('./goods/uploadgoods'));
//删除商品
goods.delete('/:id', require('./goods/deletegoods'));
// 根据ID修改商品
goods.put('/:id', require('./goods/updategoods'));
// 根据ID查找商品
goods.get('/:id', require('./goods/findById'));
// 根据分类获取商品列表
goods.get('/category/:id', require('./goods/category'));

module.exports = goods;