import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = '123456';

const users: Prisma.UserCreateInput[] = [
    {
        firstName: 'Ed',
        lastName: 'Baldwin',
        email: 'ed@nasa.gov'
    },
    {
        firstName: 'William',
        lastName: 'Riker',
        email: 'xo@ncc1701d.mil'
    }
];

async function seed(): Promise<void> {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
    const ed = await prisma.user.upsert({
        where: { email: users[0].email },
        update: {},
        create: {
            ...users[0],
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });

    const william = await prisma.user.upsert({
        where: { email: users[1].email },
        update: {},
        create: {
            ...users[1],
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });

    console.log({ ed, william });
}

seed()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
