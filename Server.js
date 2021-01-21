const express = require('express'); //dependency
const routes = require('./routes.js');
const app = express();
const port = 3000;
app.use(express.json()); //talar om att vi använder json
app.use(routes);
app.use(express.static(__dirname));
//Raute 
app.get('/', (req, res) => {
    res.send('tjooolahop');
});


app.listen(port, () => {
    console.log(`Servern lyssnar nu på http://127.0.0.1:${port}`);
});
