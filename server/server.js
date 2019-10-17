const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist')); 

require('./routes/send-otp')(app);
require('./routes/verify-otp')(app);

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});