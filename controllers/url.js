const shortid= require('shortid');
const URL = require("../models/url")

async function newshorturl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ Error: "No available URL" });
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirecturl:body.url,
        visithistory: [],
    })
    return res.json({ id:shortID });
}
module.exports = {
    newshorturl
};