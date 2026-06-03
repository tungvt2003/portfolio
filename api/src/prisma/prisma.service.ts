import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    // Placeholder lifecycle hooks.
    // Replace with PrismaClient connect/disconnect once DB wiring is enabled.
  }

  async onModuleDestroy(): Promise<void> {
    // Placeholder lifecycle hooks.
  }
}
