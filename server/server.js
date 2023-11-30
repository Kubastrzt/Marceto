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

app.get('/api/billboard/:bid', async (req, res)=>{
    const billboardId = req.params.bid;

    const billboard = await prismaDB.billboard.findUnique({
        where: {
            id: billboardId
        }
    })

    res.json(billboard);
})

app.post('/api/:sid/:uid/billboards', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {label, imageUrl} = req.body;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        if(!label) {
            res.status(404).json({
                status: "Billboard label is missing"
            })

            return;
        }

        if(!imageUrl) {
            res.status(404).json({
                status: "Billboard url is missing"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const billboard = await prismaDB.billboard.create({
            data: {
                label,
                imageUrl,
                storeId
            }
        })

        res.json(billboard);
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/:sid/:uid/billboards', async (req, res)=>{
    const storeId = req.params.sid;

    const billboards = await prismaDB.billboard.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(billboards);
})
app.get('/api/:sid/:uid/store-billboards', async (req, res)=>{
    const storeId = req.params.sid;

    const billboards = await prismaDB.billboard.findMany({
        where: {
            storeId
        },
    })

    res.json(billboards);
})

app.patch('/api/:sid/:uid/billboards/:bid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const billboardId = req.params.bid;

    const {label, imageUrl} = req.body;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        if(!label) {
            res.status(404).json({
                status: "Billboard label is missing"
            })

            return;
        }

        if(!imageUrl) {
            res.status(404).json({
                status: "Billboard url is missing"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const billboard = await prismaDB.billboard.updateMany({
            where: {
                id: billboardId,
            },
            data: {
                label,
                imageUrl,
            }
        })
        res.json(billboard);
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/:sid/:uid/billboards/:bid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const billboardId = req.params.bid;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const billboard = await prismaDB.billboard.deleteMany({
            where: {
                id: billboardId,
            },
        })

        res.json(billboard);
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/:sid/:uid/categories', async (req, res)=>{
    const storeId = req.params.sid;

    const categories = await prismaDB.category.findMany({
        where: {
            storeId
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(categories);
})

app.get('/api/categories/:cid', async (req, res)=>{
    const categoryId = req.params.cid;

    const category = await prismaDB.category.findUnique({
        where: {
            id: categoryId
        }
    })

    res.json(category);
})



app.post('/api/:sid/:uid/categories', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {name, billboardId} = req.body;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        if(!name) {
            res.status(404).json({
                status: "Category name is missing"
            })

            return;
        }

        if(!billboardId) {
            res.status(404).json({
                status: "Billboard ID is missing"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const category = await prismaDB.category.create({
            data: {
                name,
                billboardId,
                storeId
            }
        })

        res.json(category);
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/:sid/:uid/categories', async (req, res)=>{
    const storeId = req.params.sid;

    const categories = await prismaDB.category.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(categories);
})

app.patch('/api/:sid/:uid/categories/:cid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const categoryId = req.params.cid;

    const {name, billboardId} = req.body;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        if(!name) {
            res.status(404).json({
                status: "Category name is missing"
            })

            return;
        }

        if(!billboardId) {
            res.status(404).json({
                status: "Billboard ID is missing"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const category = await prismaDB.category.updateMany({
            where: {
                id: categoryId,
            },
            data: {
                name,
                billboardId,
            }
        })
        res.json(category);
    } catch (err) {
        console.log(err)
    }
})

app.delete('/api/:sid/:uid/categories/:cid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const categoryId = req.params.cid;

    try {
        if(!storeId) {
            res.status(404).json({
                status: "Not found store id"
            })

            return;
        }

        if(!userId) {
            res.status(404).json({
                status: "Not found user id"
            })

            return;
        }

        const storeByUserId = await prismaDB.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return;
        }

        const category = await prismaDB.category.deleteMany({
            where: {
                id: categoryId,
            },
        })

        res.json(category);
    } catch (err) {
        console.log(err)
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});