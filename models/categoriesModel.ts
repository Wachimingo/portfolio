const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        relatedTo: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            enum: ['en', 'es'],
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);