import { Body, Controller, Post } from '@nestjs/common';

@Controller('register-producer')
export class SignUpRegisterProducerController {
  @Post()
  public async exec(@Body() body: any): Promise<void> { // eslint-disable-line 

    console.log(body);
  }
}
