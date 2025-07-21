const mongoose = require("mongoose")
mongoose.set("strictQuery",true);
async function connecttomongodb(URL) {
    return mongoose.connect(URL);
}


module.exports = {
    connecttomongodb,
};
