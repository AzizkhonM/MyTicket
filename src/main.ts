import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 3000
    app.setGlobalPrefix("api")

    app.listen(PORT, () => {
      console.log("Server", PORT, "- portda");
    })
  } catch (error) {
    console.log(error);
  }
}

start()
