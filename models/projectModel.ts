import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    status: {
        type: String,
    },
    link: {
        type: String
    },
    locale: {
        type: String,
        enum: ['en', 'es'],
        required: true
    }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);