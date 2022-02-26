const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    level: {
        type: Number,
        default: 0
    },
    icon: {
        type: String
    },
    locale: {
        type: String,
        enum: ['en', 'es']
    },
    category: {
        type: String,
        required: true
    }
});

export default mongoose.models.Skills || mongoose.model("Skills", skillsSchema);