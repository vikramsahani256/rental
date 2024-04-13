const app                         = require('express')();
const connectMongoDB             = require("./database/mongoDb");

const bodyParser     = require('body-parser');
global.app = app;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

connectMongoDB() 

require('./module');

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/clientSide/index.html');
  })
  
app.listen(3000, () => {
    console.log("Server is running on  port 3000");
});