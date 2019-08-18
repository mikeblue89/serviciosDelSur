let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let port = 3001;

app.listen(port);
logger({ method: "configuration", message: "App listening on port " + port });