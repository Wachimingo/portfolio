import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    bussinessType: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    }
})

export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);