import mongoose from 'mongoose';

const navBarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    navType: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    },
    childObject: {
        type: Object,
        required: false
    },
    role: {
        type: Array,
        required: true,
    }
});

export default mongoose.models.NavBar || mongoose.model('NavBar', navBarSchema);