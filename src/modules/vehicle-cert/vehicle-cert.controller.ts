import {
  Controller,
  Get,
  NotFoundException,
  Patch,
  Query,
  ParseBoolPipe,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
} from "@nestjs/swagger";
import Service from "./vehicle-cert.service";
import { Prisma } from "@prisma/client";
import { ParseObjectIdPipe } from "@/commons/pipe/parse-objectId.pipe";
import { X_AUTH_TOKEN } from "@/commons/middlewares/auth-token.middleware";

@ApiTags("Cert")
@Controller("cert")
@ApiSecurity(X_AUTH_TOKEN)
class VehicleCertController {
  constructor(private readonly service: Service) {}

  @Get()
  @ApiOperation({ summary: "Get all cert" })
  @ApiResponse({ status: 404, description: "Not Found." })
  @ApiResponse({ status: 200, description: "OK." })
  async getAll(
    @Query("isBelongToTheMockUser", ParseBoolPipe)
    isBelongToTheMockUser: boolean
  ) {
    const certs = await this.service.getAll(isBelongToTheMockUser);
    if (!certs) throw new NotFoundException("Post not found");
    return certs;
  }

  @Patch("/belongsToTheMockUser")
  @ApiOperation({ summary: "Belong to the mock user" })
  @ApiResponse({ status: 404, description: "Not Found." })
  @ApiResponse({ status: 204, description: "No Content." })
  async belongToTheMockUser(@Query("id", ParseObjectIdPipe) id: string) {
    try {
      await this.service.belongToTheMockUser(id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2025":
            throw new NotFoundException("Cert not found");
          default:
            throw e;
        }
      }
      throw e;
    }
  }
}

export default VehicleCertController;
