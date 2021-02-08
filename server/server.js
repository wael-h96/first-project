const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const apiRouter = require("./apiRouter")
const app = express()
const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = 8080 || process.env.PORT
const wsHandler = require("./utils/webSockets");

const server = require('http').createServer(app);
wsHandler.initialize(server);

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: "lkdnklsndflksandfa",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 60 * 1200,
    }
}))
app.use(express.static(require('path').join(__dirname + '/../client/src/', 'images')));
app.use("/api", apiRouter)


server.listen(port, () => console.log(`Server is running on port ${port}`))
