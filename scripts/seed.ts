import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { faker } from "@faker-js/faker";

async function main() {
  void (await prisma.$transaction(async (tx) => {
    const cert = await tx.cert.create({
      data: {
        image:
          "https://storage.googleapis.com/echox-business-backend-luxgen-beta/collection/f216cb2c-0a3a-4c06-95ec-b450d9c4c5e4/24/echox-nft.jpg",
        name: faker.lorem.words(5),
        tokenId: faker.lorem.words(5),
        nftUrl:
          "https://mumbai.polygonscan.com/nft/0xbdcc98de88438b2297365ff45fed85b318bba25e/24",
        openseaUrl:
          "https://testnets.opensea.io/assets/matic/0xbdcc98de88438b2297365ff45fed85b318bba25e/24",
        deactivatedAt: new Date(),
        isSvcroUnderSyncing: false,
        lastRecordedAt: new Date(),
        isBelongToTheMockUser: false,
      },
    });

    return tx.vehicle.create({
      data: {
        certId: cert.id,
        regoNo: faker.lorem.words(5),
        modelCode: faker.lorem.words(5),
        extColour: faker.lorem.words(5),
        intColour: faker.lorem.words(5),
      },
    });
  }));
}
void main().then(async () => {
  await prisma.$disconnect();
});
