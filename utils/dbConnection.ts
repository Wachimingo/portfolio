import { connect } from "mongoose"
const dev_db_url: string = 'mongodb://localhost:27017/portfolio'
try {
    connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true } as any)
} catch (error) {
    // throw new Error('database failed to connect');

    console.log('')
}
