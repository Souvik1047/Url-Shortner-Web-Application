const express = require("express")
const app = express();
const path = require("path");
const urlroute = require("./routes/url");
const staticroute = require("./routes/staticrouter");
const signuproute = require("./routes/user");
const loginroute= require("./routes/user");


const { connecttomongodb } = require("./connect");
const URL = require("./models/url");
const PORT = 1212;


connecttomongodb("mongodb://127.0.0.1:27017/url-shortner")
    .then(() => { console.log("MongoDB is connected") });



    
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlroute);
app.use("/", staticroute);
app.use("/user", signuproute);
app.use("/user/login",loginroute);


// app.get("/",async(req,res)=>{
//     const allurls  = await URL.find({});
//     res.render("home",{
//         urls:allurls,
//     }); // for render we use render and home is ejs file 
// })

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visithistory: {
                timestamp: Date.now(),
            },
        },
    },
        { new: true }
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirecturl);
})
app.listen(PORT, () => { console.log(`Server is running at PORT no ${PORT}`) });
