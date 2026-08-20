import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({

user:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},


bus:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Bus"
},


seatNumbers:[
 Number
],


passengerDetails:{
 name:String,
 email:String,
 phone:String
},


totalPrice:Number,


status:{
type:String,
default:"Confirmed"
}


},{
timestamps:true
});


export default mongoose.model(
"Booking",
bookingSchema
);