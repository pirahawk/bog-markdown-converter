var path = require('path');

module.exports = {
    entry: {
        server: './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "./bin")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }    
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}