const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ClerkExpressWithAuth  } = require('@clerk/clerk-sdk-node');
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

app.get('/api/stores',ClerkExpressWithAuth(), async (req, res)=>{
    const stores = await prismaDB.store.findMany({
        where: {
            userId: req.auth.userId,
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




// Get all billboards ordered desc
app.get('/api/:sid/billboards', async (req, res)=>{
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

// Get chosen billboard
app.get('/api/:sid/billboards/:bid', async (req, res)=>{
    const billboardId = req.params.bid;

    const billboard = await prismaDB.billboard.findUnique({
        where: {
            id: billboardId
        }
    })

    res.json(billboard);
})

// Post one billboard
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

// Update chosen billboard
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

// Delete chosen billboard
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

// Get all categories ordered desc that are including billboard
app.get('/api/:sid/categories', async (req, res)=>{
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

// Get chosen category
app.get('/api/:sid/categories/:cid', async (req, res)=>{
    const categoryId = req.params.cid;

    const category = await prismaDB.category.findUnique({
        where: {
            id: categoryId
        }
    })

    res.json(category);
})

// Post one category
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

// Update chosen category
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

// Delete chosen category
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

// Get all sizes ordered desc
app.get('/api/:sid/sizes', async (req, res)=>{
    const storeId = req.params.sid;

    const sizes = await prismaDB.size.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(sizes);
})

// Get chosen size
app.get('/api/:sid/sizes/:sizeId', async (req, res)=>{
    const sizeId = req.params.sizeId;

    const size = await prismaDB.size.findUnique({
        where: {
            id: sizeId
        }
    })

    res.json(size);
})

// Post one size
app.post('/api/:sid/:uid/sizes', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {name, value} = req.body;

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
                status: "Size name is missing"
            })

            return;
        }

        if(!value) {
            res.status(404).json({
                status: "Value is missing"
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

        const size = await prismaDB.size.create({
            data: {
                name,
                value,
                storeId
            }
        })

        res.json(size);
    } catch (err) {
        console.log(err)
    }
})

// Update chosen size
app.patch('/api/:sid/:uid/sizes/:sizeId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const sizeId = req.params.sizeId;

    const {name, value} = req.body;

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
                status: "Size name is missing"
            })

            return;
        }

        if(!value) {
            res.status(404).json({
                status: "Value is missing"
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

        const size = await prismaDB.size.updateMany({
            where: {
                id: sizeId,
            },
            data: {
                name,
                value,
            }
        })
        res.json(size);
    } catch (err) {
        console.log(err)
    }
})

// Delete chosen size
app.delete('/api/:sid/:uid/sizes/:sizeId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const sizeId = req.params.sizeId;

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

        const size = await prismaDB.size.deleteMany({
            where: {
                id: sizeId,
            },
        })

        res.json(size);
    } catch (err) {
        console.log(err)
    }
})

// Get all colors ordered desc
app.get('/api/:sid/colors', async (req, res)=>{
    const storeId = req.params.sid;

    const colors = await prismaDB.color.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(colors);
})

// Get chosen color
app.get('/api/:sid/colors/:colorId', async (req, res)=>{
    const colorId = req.params.colorId;

    const color = await prismaDB.color.findUnique({
        where: {
            id: colorId
        }
    })

    res.json(color);
})

// Post one color
app.post('/api/:sid/:uid/colors', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {name, value} = req.body;

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
                status: "Color name is missing"
            })

            return;
        }

        if(!value) {
            res.status(404).json({
                status: "Value is missing"
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

        const color = await prismaDB.color.create({
            data: {
                name,
                value,
                storeId
            }
        })

        res.json(color);
    } catch (err) {
        console.log(err)
    }
})

// Update chosen color
app.patch('/api/:sid/:uid/colors/:colorId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const colorId = req.params.colorId;

    const {name, value} = req.body;

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
                status: "Color name is missing"
            })

            return;
        }

        if(!value) {
            res.status(404).json({
                status: "Value is missing"
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

        const color = await prismaDB.color.updateMany({
            where: {
                id: colorId,
            },
            data: {
                name,
                value,
            }
        })
        res.json(color);
    } catch (err) {
        console.log(err)
    }
})

// Delete chosen color
app.delete('/api/:sid/:uid/colors/:colorId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const colorId = req.params.colorId;

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

        const color = await prismaDB.color.deleteMany({
            where: {
                id: colorId,
            },
        })

        res.json(color);
    } catch (err) {
        console.log(err)
    }
})



// Get all products
app.get('/api/:sid/products', async (req, res)=>{
    try {
        const storeId = req.params.sid;
        const {searchParams} = new URL(`http://localhost:3001${req.url}`);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        const products = await prismaDB.product.findMany({
            where: {
                storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        res.json(products);
    } catch (err) {
        console.log(err)
    }
})

// Get chosen product
app.get('/api/:sid/products/:productId', async (req, res)=>{
    const productId = req.params.productId;

    const product = await prismaDB.product.findUnique({
        where: {
            id: productId
        },
        include: {
            images: true,
        }
    })

    res.json(product);
})

// Post one product
app.post('/api/:sid/:uid/products', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images,
        isFeatured,
        isArchived
    } = req.body;

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
            res.status(400).json({
                status: "Product name is missing"
            })

            return;
        }

        if(!images || !images.length) {
            res.status(400).json({
                status: "Product images are missing"
            })

            return;
        }

        if(!price) {
            res.status(400).json({
                status: "Product price is missing"
            })

            return;
        }

        if(!categoryId) {
            res.status(400).json({
                status: "Product category is missing"
            })

            return;
        }

        if(!sizeId) {
            res.status(400).json({
                status: "Product size is missing"
            })

            return;
        }

        if(!colorId) {
            res.status(400).json({
                status: "Product color is missing"
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

        const product = await prismaDB.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image)=>image)
                        ]
                    }
                }
            }
        })

        res.json(product);
    } catch (err) {
        console.log(err)
    }
})

// Update chosen product
app.patch('/api/:sid/:uid/products/:productId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const productId = req.params.productId;

    const {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images,
        isFeatured,
        isArchived,
    } = req.body;

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
            res.status(400).json({
                status: "Product name is missing"
            })

            return;
        }

        if(!images || !images.length) {
            res.status(400).json({
                status: "Product images are missing"
            })

            return;
        }

        if(!price) {
            res.status(400).json({
                status: "Product price is missing"
            })

            return;
        }

        if(!categoryId) {
            res.status(400).json({
                status: "Product category is missing"
            })

            return;
        }

        if(!sizeId) {
            res.status(400).json({
                status: "Product size is missing"
            })

            return;
        }

        if(!colorId) {
            res.status(400).json({
                status: "Product color is missing"
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

        await prismaDB.product.update({
            where: {
                id: productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived,
            }
        })

        const product = await prismaDB.product.update({
            where: {
                id: productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image)=>image)
                        ]
                    }
                }
            }
        })

        res.json(product);
    } catch (err) {
        console.log(err)
    }
})

// Delete chosen product
app.delete('/api/:sid/:uid/products/:productId', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const productId = req.params.productId;

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

        const product = await prismaDB.product.deleteMany({
            where: {
                id: productId,
            },
        })

        res.json(product);
    } catch (err) {
        console.log(err)
    }
})

// Get all orders ordered desc
app.get('/api/:sid/orders', async (req, res)=>{
    const storeId = req.params.sid;

    const orders = await prismaDB.order.findMany({
        where: {
            storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(orders);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});