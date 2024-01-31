import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { type CreateOneDTO } from "@/shared/models/vehicle-cert/create-one.dto";

@Injectable()
class Service {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(isBelongToTheMockUser = true) {
    return await this.prisma.cert.findMany({
      where: {
        isBelongToTheMockUser,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async belongToTheMockUser(id: string) {
    return await this.prisma.cert.update({
      where: {
        id,
      },
      data: {
        isBelongToTheMockUser: true,
      },
    });
  }

  async createOne(dto: CreateOneDTO) {
    return await this.prisma.$transaction(async (tx) => {
      const cert = await tx.cert.create({
        data: {
          image: dto.image,
          name: dto.name,
          tokenId: dto.tokenId,
          nftUrl: dto.nftUrl,
          openseaUrl: dto.openseaUrl,
          deactivatedAt: dto.deactivatedAt,
          isSvcroUnderSyncing: dto.isSvcroUnderSyncing,
          lastRecordedAt: dto.lastRecordedAt,
          isBelongToTheMockUser: dto.isBelongToTheMockUser,
        },
      });

      return tx.vehicle.create({
        data: {
          certId: cert.id,
          regoNo: dto.vehicleRegoNo,
          modelCode: dto.vehicleModelCode,
          extColour: dto.vehicleExtColour,
          intColour: dto.vehicleIntColour,
        },
      });
    });
  }
}

export default Service;
