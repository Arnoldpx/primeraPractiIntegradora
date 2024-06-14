import mongoose from 'mongoose';

const productsCollection = "Products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  cart: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Carts'
     }
});

const Productos = mongoose.model(productsCollection, productSchema);

export default Productos;




