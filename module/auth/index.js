
const  users = require('../../database/models/users');
const md5 = require('md5');
const connectMongoDB = require("../../database/mongoDb");


app.post('/login',async (req,res)=>{
  try {
  
    await connectMongoDB()
  
    let data = await users.findOne({ email :req?.body?.email  });

    if(data){
      if(data?.password === md5(req?.body?.password)){
        res.send(data)
      }else{
        throw new Error('User password not matched!')
      }
      
    }else{
      throw new Error('User email not exist!')
    }
    
  } catch (error) {
    res.send(error.message)
  }

})


app.post('/sign_up', async (req,res)=>{

  try {
  
    await connectMongoDB()
  
    let data = await users.create({
      fullName : req.body.fullName ,
      email :req.body.email  ,
      password : md5(req.body.password),
      accessToken : md5( req.body.password + new Date() )

    });

    res.send(data)
    
  } catch (error) {
    res.send(error.message)
  }

  
})