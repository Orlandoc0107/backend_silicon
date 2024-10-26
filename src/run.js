const app = require('./app')
const dotenv = require ('dotenv')
dotenv.config()


const PORT = process.env.PORT;

app.set('port', PORT)

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
})