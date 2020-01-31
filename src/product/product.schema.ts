import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
      type: String
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    key:{
        type: String,
        required: true
    },
    categoryId:{
        type: String,
        required: true
    }
})