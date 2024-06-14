import mongoose from "mongoose";

const { Schema } = mongoose;

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    productos:[ {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    total: {
        type: Number,
        required: true,
    },
    userId:{type: String, required: true }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;