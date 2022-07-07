import express from 'express'
import connectDB from './config/db.js'
import pdf from 'pdf-creator-node'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import Certificate from './models/Certificate.js'
import User from './models/User.js'

// ipfs config
import { create } from 'ipfs-http-client'

const projectId = '2B3gRNl3beVTaV8iGhhZQBFPG9F';
const projectSecret = '3edf6c1aba0ac4a71c6ffe6d8f15be57';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


const app = express()
app.use(cors())
app.use(express.json())

connectDB()

var port = process.env.PORT || 3001

app.post('/user/create', async (req, res) => {
    const { username, email, address } = req.body;

    try {
        const user = await User.create({
            username: username,
            email: email,
            address: address
        })

        if(user) {
            res.status(201).json({
                result: "User added Successfully"
            })
        } else {
            res.status(210).json({
                message: 'Invalid data'
            })
        }
    } catch (error) {
        res.status(210).json({
            message: 'Invalid data'
        })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.find({ address: req.params.id })

        if(user.length > 0) {
            res.status(200).json({
                result: "User found Successfully"
            })
        } else {
            res.status(210).json({
                message: 'Invalid data'
            })
        }
    } catch (error) {
        res.status(210).json({
            message: 'Invalid data'
        })
    }
})

app.get('/certificate/:id', async (req, res) => {
    const cert = await Certificate.find({ contestID: req.params.id })

    if(cert){
        res.status(200).send(cert[0].certificate)
    } else {
        res.status(404).send('cert not found')
    }
})

app.post('/certificate/:id', async (req, res) => {
    const options = {
    }

    const { name, addr, contestName } = req.body;
    console.log(name, addr, contestName)

    const html = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';

    var date = new Date()
    
    const obj = {
        name: name,
        addr: addr,
        contestName: contestName,
        date: date.toDateString()
    }

    const document = {
        html: html,
        data: {
            details: obj
        },
        path: './temp/' + filename
    }

    try {
        const result = await pdf.create(document, options)
        console.log(result.filename)
        const data = new Buffer.from(fs.readFileSync(result.filename) );
        console.log(data)

        // client.add(data, (error, result) => {
        //     if(error) {
        //       console.log(error)
        //       return
        //     }
        //     console.log(result)
        //     res.send(result[0].hash)
        // })

        const cert = await Certificate.create({
            contestID: req.params.id,
            certificate: {
                data: data,
                contentType: 'application/pdf'
            }
        })
    
        if(cert) {
            res.status(201).json({
                result: "Added Successfully"
            })
        } else {
            res.status(400).json({
                message: 'Invalid cert data'
            })
        }
    } catch (error) {
        res.status(400).send("Error occured")
    }
})

app.listen(port, () => {
    console.log('App is running on port ' + port)
})