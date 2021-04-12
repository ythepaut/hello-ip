const express = require("express"),
    textToImage = require("text-to-image"),
    requestIp = require("request-ip");
const app = express();
const port = 7778;

app.use(requestIp.mw());

app.set("trust proxy", true);

app.get("/", (req, res) => {
    const ip = req.clientIp;
    console.log(ip);
    textToImage.generate(`Hello, your IP address is ${ip}`).then((dataUri) => {
        const img = new Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ""), "base64");
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
        });
        res.end(img);
    });
});

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}...`);
});
