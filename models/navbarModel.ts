import mongoose, { Types } from 'mongoose';

const navBarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true,
    },
    projectId: {
        type: Types.ObjectId
    },
    project: {
        type: String
    },
    locale: {
        type: String,
        enum: ['en', 'es']
    }
});

export default mongoose.models.NavBar || mongoose.model('NavBar', navBarSchema);