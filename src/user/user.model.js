import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxLength: [50, "Product name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Product", productSchema);

