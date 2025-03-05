import {Schema, model} from "mongoose"

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        maxlength: 500
    },
    productPrice: {
        type: Number,
        required: true,
        min: [0, "El precio debe ser mayor o igual a 0"]
    },
    availableStock: {
        type: Number,
        required: true,
        min: [0, "El stock no puede ser negativo"]
    },
    totalSold: {
        type: Number,
        default: 0,
        min: [0, "El total vendido no puede ser negativo"]
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, 

{
    versionKey: false,
    timestamps: true 
});

export default model('Product', productSchema);