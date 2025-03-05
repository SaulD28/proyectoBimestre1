import {Schema, model} from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantityProducts: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
});

export default model("Cart", cartSchema)
