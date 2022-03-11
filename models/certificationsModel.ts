const mongoose = require('mongoose');

const certificationsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        link: {
            type: String,
        },
        icon: {
            type: String
        },
        locale: {
            type: String,
            enum: ['en', 'es']
        },
    }
);

export default mongoose.models.Certifications || mongoose.model("Certifications", certificationsSchema);
