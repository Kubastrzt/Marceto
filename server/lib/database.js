const { PrismaClient } = require('@prisma/client');

let prismaDB;

if (process.env.NODE_ENV === 'production') {
    prismaDB = new PrismaClient();
} else {
    if (!prismaDB) {
        prismaDB = new PrismaClient();
    }
}

module.exports = prismaDB;