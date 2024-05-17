import mongoose from 'mongoose';

const GoodsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    manager : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : false,
        default : "FOR_SALE"
    },
    createdAt : {
        type : Date,
        required : false,
    },
    updatedAt : {
        type : Date,
        required : false,
    }
});

GoodsSchema.set('timestamps', true);

export default mongoose.model('Goods', GoodsSchema);