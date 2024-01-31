import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import VehicleCertModule from "./modules/vehicle-cert/vehicle-cert.module";

@Module({
  imports: [ConfigModule.forRoot(), VehicleCertModule],
  controllers: [AppController],
})
export class AppModule {}
