import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { AppValidationPipe } from './common/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    credentials: true,
  })
  app.useGlobalPipes(new AppValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  const httpAdapter = app.getHttpAdapter()
  const instance = httpAdapter.getInstance?.() as
    | { get?: (path: string, handler: (req: unknown, res: { json: (body: unknown) => void }) => void) => void }
    | undefined

  if (instance?.get) {
    instance.get('/', (_req, res) => {
      res.json({
        message: 'Hello World from portfolio-api',
        docs: '/docs',
        apiBase: '/api',
        timestamp: new Date().toISOString(),
      })
    })
  }

  let swaggerEnabled = false
  try {
    // Use runtime require so the app can still boot even if swagger packages are not installed yet.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const swagger = require('@nestjs/swagger') as any

    const swaggerConfig = new swagger.DocumentBuilder()
      .setTitle('Portfolio API')
      .setDescription('Public and admin APIs for portfolio-web')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token'
      )
      .build()

    const swaggerDocument = swagger.SwaggerModule.createDocument(app, swaggerConfig)
    swagger.SwaggerModule.setup('docs', app, swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })

    swaggerEnabled = true
  } catch {
    if (instance?.get) {
      instance.get('/docs', (_req, res) => {
        res.json({
          message: 'Swagger is not installed yet. Run: pnpm add @nestjs/swagger swagger-ui-express',
        })
      })
      instance.get('/docs-json', (_req, res) => {
        res.json({
          message: 'Swagger is not installed yet. Run: pnpm add @nestjs/swagger swagger-ui-express',
        })
      })
    }
  }

  const port = Number(process.env.PORT || 3001)
  await app.listen(port)

  console.log(`portfolio-api is running at http://localhost:${port}`)
  console.log(`API base: http://localhost:${port}/api`)
  if (swaggerEnabled) {
    console.log(`Swagger UI: http://localhost:${port}/docs`)
    console.log(`Swagger JSON: http://localhost:${port}/docs-json`)
  } else {
    console.log('Swagger is disabled (missing dependencies).')
  }
}

void bootstrap()
