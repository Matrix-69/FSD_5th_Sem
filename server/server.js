const express = require('express');
const app = express();
const port = 3005;

app.listen(port, (err) => {
    if (err) {
        console.log("Error in Listening to port");
        return;
    }
    console.log(`Successfully listening to ${port}`); // Template String use back ticks
});

app.get('/', (req, res) => {
    res.send("Welcome to Express Server");
});

app.get('/message', (req, res) => {
    res.send("Thank you for wonderful lecture ");
});