import mongoose from "mongoose";

const citySchema = new mongoose.Schema({

    name:{
        type:String,
        unique:true
    },

    state:String,

    popular:{
        type:Boolean,
        default:false
    }

});

export default mongoose.model("City",citySchema);