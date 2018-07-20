import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  stock: Number,
});

const productModel = mongoose.model('product', productSchema);

export default productModel;
