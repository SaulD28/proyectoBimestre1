import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      maxLength: [50, "Category name cannot exceed 50 characters"]
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Category", categorySchema);
