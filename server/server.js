const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ClerkExpressWithAuth  } = require('@clerk/clerk-sdk-node');
const prismaDB = require("./lib/database.js");
const stripe = require('stripe')('sk_test_51OPqcNDn9qS3tAxEbq6Palaeknc1ThsXYcNqyUT52RrxR5PmS9KCbbIsKv7ePFKMH2EXcZnruWqmrM6PSKVyexKA00uHAbOceA');

const app = express();
const port = process.env.PORT || 3001;
const endpointSecret = "whsec_1e871cb17615ea478f7ab3b266e9ac5b9be4f0a30af67a811832cfb6787501f4";

app.use(cors());

const rawBodyMiddleware = (req, res, next) => {
    if (req.url === '/api/webhook') {
        bodyParser.raw({ type: 'application/json' })(req, res, (err) => {
            if (err) return next(err);
            req.rawBody = req.body.toString('utf-8');
            next();
        });
    } else {
        express.json({
            limit: '5mb',
            verify: (req, res, buf) => {
                req.rawBody = buf.toString();
            },
        })(req, res, next);
    }
};

app.use(rawBodyMiddleware);

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




// Get all banners ordered desc
app.get('/api/:sid/banners', async (req, res)=>{
    const storeId = req.params.sid;

    const banners = await prismaDB.banner.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(banners);
})

// Get chosen banner
app.get('/api/:sid/banners/:bid', async (req, res)=>{
    const bannerId = req.params.bid;
    const storeId = req.params.sid;

    const banner = await prismaDB.banner.findUnique({
        where: {
            id: bannerId,
            storeId
        }
    })

    res.json(banner);
})

// Post one banner
app.post('/api/:sid/:uid/banners', async (req, res)=>{
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
                status: "Banner label is missing"
            })

            return;
        }

        if(!imageUrl) {
            res.status(404).json({
                status: "Banner url is missing"
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

        const banner = await prismaDB.banner.create({
            data: {
                label,
                imageUrl,
                storeId
            }
        })

        res.json(banner);
    } catch (err) {
        console.log(err)
    }
})

// Update chosen banner
app.patch('/api/:sid/:uid/banners/:bid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const bannerId = req.params.bid;

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
                status: "Banner label is missing"
            })

            return;
        }

        if(!imageUrl) {
            res.status(404).json({
                status: "Banner url is missing"
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

        const banner = await prismaDB.banner.updateMany({
            where: {
                id: bannerId,
            },
            data: {
                label,
                imageUrl,
            }
        })
        res.json(banner);
    } catch (err) {
        console.log(err)
    }
})

// Delete chosen banner
app.delete('/api/:sid/:uid/banners/:bid', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;
    const bannerId = req.params.bid;

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

        const banner = await prismaDB.banner.deleteMany({
            where: {
                id: bannerId,
            },
        })

        res.json(banner);
    } catch (err) {
        console.log(err)
    }
})

// Get all categories ordered desc that are including banner
app.get('/api/:sid/categories', async (req, res)=>{
    const storeId = req.params.sid;

    const categories = await prismaDB.category.findMany({
        where: {
            storeId
        },
        include: {
            banner: true,
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
    const storeId = req.params.sid;

    const category = await prismaDB.category.findUnique({
        where: {
            id: categoryId,
            storeId
        },
        include: {
            banner: true
        }
    })

    res.json(category);
})

// Post one category
app.post('/api/:sid/:uid/categories', async (req, res)=>{
    const storeId = req.params.sid;
    const userId = req.params.uid;

    const {name, bannerId} = req.body;

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

        if(!bannerId) {
            res.status(404).json({
                status: "banner ID is missing"
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
                bannerId,
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

    const {name, bannerId} = req.body;

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

        if(!bannerId) {
            res.status(404).json({
                status: "banner ID is missing"
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
                bannerId,
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
    const storeId = req.params.sid;

    const size = await prismaDB.size.findUnique({
        where: {
            id: sizeId,
            storeId
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
    const storeId = req.params.sid;

    const color = await prismaDB.color.findUnique({
        where: {
            id: colorId,
            storeId
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
app.get('/api/:sid/products-list', async (req, res)=>{
    try {
        const storeId = req.params.sid;

        const products = await prismaDB.product.findMany({
            where: {
                storeId
            },
            include: {
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
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
    const storeId = req.params.sid;

    const product = await prismaDB.product.findUnique({
        where: {
            id: productId,
            storeId
        },
        include: {
            images: true,
            category: true,
            size: true,
            color: true
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

app.post('/api/:sid/checkout', async (req, res)=>{
    const {productIds} = req.body
    const storeId = req.params.sid;

    if(!productIds || productIds.length===0) {
        res.status(400).json({
            status: "Products missing"
        })
    }

    const products = await prismaDB.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })

    let line_items = []

    products.forEach((product)=>{
        line_items.push(
            {
                quantity: 1,
                price_data: {
                    currency: 'PLN',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price.toNumber() * 100
                },
            }
        )
    })

    const order = await prismaDB.order.create({
        data: {
            storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId)=>({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true
        },
        success_url: "http://localhost:3002/cart?success=1",
        cancel_url: "http://localhost:3002/cart?canceled=1",
        metadata: {
            orderId: order.id
        }
    })

    res.send({url: session.url});
});

app.post('/api/webhook', async (req, res)=>{
    const signature = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, signature, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const session = event?.data?.object;
    const address = session?.customer_details?.address

    const addressInfo = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ]

    const addressString = addressInfo.filter((x) => x !== null).join(', ');

    if(event.type === 'checkout.session.completed') {
        const order = await prismaDB.order.update({
            where: {
                id: session?.metadata.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            },
            include: {
                orderItems: true
            }
        })

        const productIds = order.orderItems.map((orderItem)=>orderItem.productId)

        await prismaDB.product.updateMany({
            where: {
                id: {
                    in: [...productIds]
                }
            },
            data: {
                isArchived: true
            }
        })
    }

    res.send()
})

app.get('/api/:sid/revenues', async (req,res)=>{
    const storeId = req.params.sid

    const paidOrders = await prismaDB.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price.toNumber();
        }, 0);
        return total + orderTotal;
    }, 0);

    res.json({totalRevenue})
})
app.get('/api/:sid/sales', async (req,res)=>{
    const storeId = req.params.sid

    const salesCount = await prismaDB.order.count({
        where: {
            storeId,
            isPaid: true
        }
    });

    res.json({salesCount})
})

app.get('/api/:sid/stock', async (req,res)=>{
    const storeId = req.params.sid

    const stockCount = await prismaDB.product.count({
        where: {
            storeId,
            isArchived: false
        }
    });

    res.json({stockCount})
})

app.get('/api/:sid/graph-revenue', async (req,res)=>{
    const storeId = req.params.sid

    const paidOrders = await prismaDB.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const monthlyRevenue = {}

    for(const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;

        for(const item of order.orderItems) {
            revenueForOrder += item.product.price.toNumber();
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graph = [
        {name: "Sty", total: 0},
        {name: "Lut", total: 0},
        {name: "Mar", total: 0},
        {name: "Kwi", total: 0},
        {name: "Maj", total: 0},
        {name: "Cze", total: 0},
        {name: "Lip", total: 0},
        {name: "Sie", total: 0},
        {name: "Wrz", total: 0},
        {name: "Paź", total: 0},
        {name: "Lis", total: 0},
        {name: "Gru", total: 0},
    ]

    for(const month in monthlyRevenue) {
        graph[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    res.json({graph})
})



    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});