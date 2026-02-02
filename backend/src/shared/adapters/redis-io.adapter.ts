import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
import { ServerOptions } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const pubClient = new Redis({ host: 'redis', port: 6379 });
    const subClient = pubClient.duplicate();
    const server = super.createIOServer(port, options);
    server.adapter(createAdapter(pubClient, subClient));
    return server;
  }
}
