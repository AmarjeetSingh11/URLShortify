const express = require('express');
const app = express();
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const PORT = 3000;
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(
    () => console.log("MongoDB is connected")
);

app.use(express.json());
app.use('/url',urlRoute);
app.get('/:shortId', async (req, res) => {

    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push : {
        vistHistory: {
            timestamp: Date.now()
        }
    }
    });
    res.redirect(entry.redirectURL);
})




app.listen(PORT,() => console.log(`Server Started at ${PORT} Port`))