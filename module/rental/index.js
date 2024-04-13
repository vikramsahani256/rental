
const  userRentals = require('../../database/models/userRentals');
const  users = require('../../database/models/users');
const md5 = require('md5');
const connectMongoDB = require("../../database/mongoDb");


app.post('/rent_now',async (req,res)=>{
  try {
  
    await connectMongoDB()
    let data = await users.findOne({ accessToken :req?.body?.accessToken  });
    
    if(!data){
      throw new Error("Unauthorized User!")
    }

    data = await userRentals.create({
          user_email    : data?.email,
          rental_item   : req.body.rental_item,
          amount        : req.body.rental_amount,
          location      : req.body.location,
          pick_up_date  : req.body.pick_up_date,
          return_date   : req.body.return_date
    })
    
   
    // const result = await users.aggregate([
    //   {
    //     $match: {
    //       email: "demo@gmail.com"
    //     }
    //   },
    //   // Join with userRentals collection
    //   {
    //     $lookup: {
    //       from: "userrentals", // Name of the collection to join
    //       localField: "email", // Field from the users collection
    //       foreignField: "user_email", // Field from the userRentals collection
    //       as: "rentals" // Name of the field to store joined data
    //     }
    //   },
    //   // Project fields to show
    //   {
    //     $project: {
    //       _id: 0, // Exclude _id field
    //       fullName: 1, // Include fullName field
    //       email: 1, // Include email field
    //       rentals: { // Include rentals field with specified subfields
    //         rental_item: 1,
    //         amount: 1,
    //         location: 1,
    //         pick_up_date: 1,
    //         return_date: 1
    //       }
    //     }
    //   }
    // ]);

    res.send(data)
  } catch (error) {
    res.send(error.message)
  }

})


app.post('/get_rentals',async (req,res)=>{
  try {
  
    await connectMongoDB()
    const data = await users.findOne({ accessToken :req?.body?.accessToken  });
    
    if(!data){
      throw new Error("Unauthorized User!")
    }

   
    const result = await users.aggregate([
      {
        $match: {
          email: "demo@gmail.com"
        }
      },
      // Join with userRentals collection
      {
        $lookup: {
          from: "userrentals", // Name of the collection to join
          localField: "email", // Field from the users collection
          foreignField: "user_email", // Field from the userRentals collection
          as: "rentals" // Name of the field to store joined data
        }
      },
      // Project fields to show
      {
        $project: {
          _id: 0, // Exclude _id field
          fullName: 1, // Include fullName field
          email: 1, // Include email field
          rentals: { // Include rentals field with specified subfields
            rental_item: 1,
            amount: 1,
            location: 1,
            pick_up_date: 1,
            return_date: 1
          }
        }
      }
    ]);

    res.send(result)
  } catch (error) {
    res.send(error.message)
  }

})

