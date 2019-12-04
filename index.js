const express = require('express')

const app = express()

const { Volcano } = require('./app/models');

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Uhuuul Galera!")
})

app.get('/volcanoes', async (req, res) => {
   
    try {
        const volcanoes = await Volcano.findAll(
            {
                include: ['type']
            }
        )
        res.json(volcanoes)
    } catch (error) {
        console.error("DEU RUIM: ", error)
    }
  

   
})

app.listen(3000)