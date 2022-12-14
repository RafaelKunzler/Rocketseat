import { PrismaClient } from "@prisma/client" 

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            avatarUrl: 'https://github.com/Rafaelkunzler.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Exemple Pool',
            code: 'BOL123',
            ownerId: user.id,

            participant: {
                create: {
                    userId: user.id
                }
            }

        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.325Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T12:00:00.325Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })


}




main ()