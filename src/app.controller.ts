import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Index")
@Controller()
export class AppController {
  @Get()
  getProducts(): string {
    return "Yulon Vehicle Backend Demo";
  }
}
