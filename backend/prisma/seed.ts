import prisma from "../src/database/db"

async function main() {
    await prisma.room.createMany({
        data: [
            {roomName: "Sala 1"},
            {roomName: "Sala 2"},
            {roomName: "Sala 3"},
        ],
        skipDuplicates: true
    })
    console.log("Salas criadas com sucesso");

    // await prisma.user.createMany({
    //     data: [
    //         {username: "wolf", email: "teste@gmail.com", password: "12345678"},
    //         {username: "lobo", email: "example@gmail.com", password: "12345678"},
    //     ],
    //     skipDuplicates: true
    // });
    // console.log("Usuários criados com sucesso");
}

main().then(() => {
    console.log("Seed finalizado com sucesso");
    process.exit(0);
}).catch((e) => {
    console.error(e);
    process.exit(1);
})