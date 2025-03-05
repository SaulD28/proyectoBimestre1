import {Schema, model} from "mongoose"

const categorySchema = Schema({
    nameCategory:{
        type: String,
        required: true
    },
},
{
    versionKey: false,
    timeStamps: true

})

export default model("Category", categorySchema)