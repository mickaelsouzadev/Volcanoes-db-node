const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });


const app = express()

const { Volcano, Eruption, VolcanoType } = require('./app/models');

app.use(cors())

app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./img/'));

app.get('/volcanoes', async (req, res) => {
    try {
        const volcanoes = await Volcano.findAll({include: ['type']})
        res.json(volcanoes)
    } catch(error) {
        console.error("DEU RUIM: ", error)
    }
})

app.get('/eruptions', async(req, res) => {
    try {
        const eruptions = await Eruption.findAll({include: ['type', 'volcano']})
        res.json(eruptions)
    } catch(error) {
        console.error("DEU RUIM: ", error)
    }
})

app.get('/volcanoes-types', async(req, res) => {
    try {
        const types =  await VolcanoType.findAll()
        res.json(types)
    } catch(error) {
        console.error("Não vai dar não: ", error)
    }
})

app.post('/volcanoes', upload.single('img'), async(req, res) => {
    try {
        const data = req.body
        let img = 'default.jpg'

        if(req.file) {
            img = req.file.filename
        }

        const newVolcano = await Volcano.create({
            name: data.name,
            description: data.description,
            img: img,
            type_id: data.type
        })
        
        const response = await Volcano.findAll({
            include: ['type'],
            where: {
                id: newVolcano.id
            }
        })

        res.json(response)

    } catch(error) {
        console.error("Olha ai ó deu ruim: ", error)
        res.status(400).send("Não foi possível adicionar um novo vulcão")
    }
})

app.listen(3000)