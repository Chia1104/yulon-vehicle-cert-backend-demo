import {
  Module,
  type NestModule,
  type MiddlewareConsumer,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import VehicleCertModule from "./modules/vehicle-cert/vehicle-cert.module";
import { AuthTokenMiddleware } from "./commons/middlewares/auth-token.middleware";
import VehicleCertController from "./modules/vehicle-cert/vehicle-cert.controller";

@Module({
  imports: [ConfigModule.forRoot(), VehicleCertModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthTokenMiddleware).forRoutes(VehicleCertController);
  }
}
