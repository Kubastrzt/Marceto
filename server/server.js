const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const prismaDB = require("./lib/database.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());

app.post('/api/stores', async (req, res) => {
    const data = req.body;
    const {name, userId} = data;

    if (!userId) {
        return res.status(400).json({error: "Unauthorized"});
    }

    if (!name) {
        return res.status(400).json({error: "Store name is missing"});
    }

    const store = await prismaDB.store.create({
        data: {
            name,
            userId
        }
    })

    res.json(store);
});

app.get('/api/user/:id/first-store', async (req, res) => {
    const userId = req.params.id;

    const usersStore = await prismaDB.store.findFirst({
        where: {
            userId
        }
    })

    res.json(usersStore);
});


app.get('/api/user/:id/:sid', async (req, res)=>{
    const userId = req.params.id;
    const storeId = req.params.sid;

    const store = await prismaDB.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })

    res.json(store);
})

app.get('/api/:id/stores', async (req, res)=>{
    const userId = req.params.id;

    const stores = await prismaDB.store.findMany({
        where: {
            userId,
        },
    });

    res.json(stores);
})

app.patch('/api/:sid/:uid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const {name} = req.body;
    try {
        if(!userId) {
            res.status(401).json({
                status: "Not authenticated user"
            })

            return;
        }

        if(!name) {
            res.status(404).json({
                status: "Not found store name"
            })

            return;
        }

        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        const store = await prismaDB.store.updateMany({
            where: {
                id: storeId,
                userId
            },
            data: {
                name
            }
        })

        res.json(store)
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/:sid/:uid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    try {
        if(!userId) {
            res.status(401).json({
                status: "Not authenticated user"
            })

            return;
        }

        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        const store = await prismaDB.store.deleteMany({
            where: {
                id: storeId,
                userId
            }
        })

        res.json(store)
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});