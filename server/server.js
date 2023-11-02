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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});