const mongoose = require('mongoose');

const localeSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true
    },
    locale: {
        type: String,
        required: true,
        enun: ['en', 'es']
    },
    content: {
        type: Object,
        require: true
    }
});

export default mongoose.models.Locale || mongoose.model('Locale', localeSchema);