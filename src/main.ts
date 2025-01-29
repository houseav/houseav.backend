import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const house = `
    _                               
 __| |  ___  _   _ ___ ___  _ ____   __
/  _\` |/ _ \\| | | |__ / _ \\| |_ \\ \\ / /
| | | | (_) | |_| / __\\__  | |_) \\ V _ 
|_| |_|\\___/|_.__/\\___|___/|_.__/ \\_(_)                                    
`;
const backend_house_ascii = `
    _m_   
  /\____\\    
  |_|""|                                                    Backend
_/______\____________________________________________________________________
`;
console.log(house);
console.log(backend_house_ascii);

  const app = await NestFactory.create(AppModule, { cors: true });

  // Swagger setup
  const config = new DocumentBuilder()
    // .setTitle('Houseav Backend')
    // .setDescription('Houseav Backend project')
    .setTitle('LOCAL')
    .setVersion('1.0')
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(helmet());
  await app.listen(3000);
}

bootstrap();
