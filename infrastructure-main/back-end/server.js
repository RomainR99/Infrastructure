import app from './app.js'
import ENV from './config/env.js'

//PORT
const PORT = ENV.PORT || 8080;
const port = 3000

//LISTEN
app.listen(
    PORT,() => {
        console.log(`Listening et http://localhost:${PORT}`);
    }
)