import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const getCORSAllowedOrigin = (): string[] | boolean => {
  if (!process.env.CORS_ALLOWED_ORIGIN) return false;
  return process.env.CORS_ALLOWED_ORIGIN.split(",").map((item) => {
    return item.trim();
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: getCORSAllowedOrigin(),
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ["X-Auth-Token", "content-type"],
      exposedHeaders: ["retry-after"],
    },
  });
  const config = new DocumentBuilder()
    .setTitle("NestJS Example")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/documentation", app, document);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
