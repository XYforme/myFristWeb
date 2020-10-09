const { Banner } = require('../../model/banner');


module.exports = async(req, res) => {
    const banner = await Banner.find();
    res.send(banner);

};