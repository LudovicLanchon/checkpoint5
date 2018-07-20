import * as mongoose from 'mongoose';

const rabbitSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    age: Number,
    color: String,
});

const rabbitModel = mongoose.model('rabbit', rabbitSchema);

export default rabbitModel;
