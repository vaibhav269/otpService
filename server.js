const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes/send-otp')(app);
require('./server/routes/verify-otp')(app);
require('./server/routes/get-summary')(app);
require('./server/routes/get-details')(app);

app.use(express.static("dist"));;

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/'));
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});