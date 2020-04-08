const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const PromoSchema = new Schema({
    name : {
        type : String,
        required = true
    },
    image : {
        type : String,
        required = true
    },
    label : {
        type : String,
        default :''
    },
    price : {
        type : Currency,
        required : true,
        min : true
    },
    description : {
        type : String,
        required : true,
        default  :''
    },
    featured : {
        type :Boolean,
        required : true
    }

},{
    timestamps : true
})

const 