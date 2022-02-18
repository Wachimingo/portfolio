const { join } = require('path');

module.exports = {
    "plugins": [
        ["tailwindcss", {
            config: join(__dirname, 'tailwind.config.js'),
        }],
        "postcss-flexbugs-fixes",
        [
            "postcss-preset-env",
            {
                "autoprefixer": {
                    "flexbox": "no-2009"
                },
                "stage": 3,
                "features": {
                    "custom-properties": false
                }
            }
        ],
        [
            '@fullhuman/postcss-purgecss',
            {
                content: [
                    './pages/**/*.{js,jsx,ts,tsx}',
                    './components/**/*.{js,jsx,ts,tsx}',
                    './node_modules/react-toastify/dist/ReactToastify.min.css'
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: ["html", "body"]
            }
        ],
    ]
}