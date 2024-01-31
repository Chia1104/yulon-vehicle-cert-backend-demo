import { Module } from "@nestjs/common";
import Service from "./vehicle-cert.service";
import Controller from "./vehicle-cert.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [Service],
  controllers: [Controller],
  imports: [PrismaModule],
})
class VehicleCertModule {}

export default VehicleCertModule;
