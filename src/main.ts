import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 4000
  const config = new DocumentBuilder()
    .setTitle('Terra API')
    .setDescription('API documentation for Terra')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
});

  await app.listen(port, () =>{
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
