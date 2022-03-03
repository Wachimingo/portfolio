const mongoose = require('mongoose');
import categoriesModel from "./categoriesModel";
const skillsSchema = mongoose.Schema(
    {
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
            type: mongoose.Schema.Types.ObjectId,
            ref: categoriesModel,
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.models.Skills || mongoose.model("Skills", skillsSchema);
