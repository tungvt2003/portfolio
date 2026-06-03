import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  helloWorld() {
    return {
      message: 'Hello World from portfolio-api',
      docs: '/docs',
      apiBase: '/api',
      timestamp: new Date().toISOString(),
    }
  }
}
