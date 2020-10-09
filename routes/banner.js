const banner = require('express').Router();

banner.get('/', require('./banner/getbanner'));
banner.post('/', require('./banner/uploadbanner'));
banner.delete('/:id', require('./banner/deletebanner'));

module.exports = banner;