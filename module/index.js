console.log("=====in module==")


require('./auth')
require('./rental')

app.get('/',(req,res)=>{
  res.send('ok')
})