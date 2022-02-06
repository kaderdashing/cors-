// JavaScript source code
const cors = require('cors')
const https=require('https')
const fs = require('fs');
const express = require('express')

const app = express();
app.use(cors({ origin: "http://localhost:5001" }))

app.get('/', (req, res, next) => {
    const file = fs.createReadStream("./index.html")
    let data=""
    file.on('data', chunk => {
        data += chunk.toString()
    })
    file.on('end', () => {
        res.send(data)
    })
})

app.get("/wilaya", (req, response, next) => {
    console.log("##############")
    https.get("https://api.yalidine.app/v1/wilayas/", {
        headers: {
            "X-API-ID": "68208496357238217594",
            "X-API-TOKEN": "X4o2YmjKraKf6jP58ZzloRUTpcCODJXHaW0WkxmYsFQMw2eU3wvhG4fEVbr1QudG"
        }
    },
        (res) => {
            let data=''
            res.on("data", chunk => {
                data+=(chunk.toString())
            })
            res.on('end', () => {
                response.send((data) )
            })
        }

    ).end()
    /*
        xhr.setRequestHeader("X-API-ID", "68208496357238217594");
        xhr.setRequestHeader("X-API-TOKEN", "X4o2YmjKraKf6jP58ZzloRUTpcCODJXHaW0WkxmYsFQMw2eU3wvhG4fEVbr1QudG");
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
     */ 
})

app.listen(5001)