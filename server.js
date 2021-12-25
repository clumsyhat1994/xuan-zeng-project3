const express = require('express');
const mongoose = require('mongoose');
const job = require('./routes/job');
const user = require('./routes/user');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors')
const path = require('path');

const mongoDB = 'mongodb+srv://xuan:gzzxuan588@cluster0.lfeaf.mongodb.net/jobpost?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();


app.use(session({
    secret: "NOT_SO_CLUMSY_HAT",
    store: new MongoStore({ mongoUrl: mongoDB })
}));

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', user);
app.use('/api/job', job);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, function () {
    console.log('Starting server');
});