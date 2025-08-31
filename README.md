# NestJS Consul Service

A modular library for integrating [Consul](https://www.consul.io/) service discovery and key-value storage into your [NestJS](https://nestjs.com/) applications.

## Features
- Service registration and health checks
- Key-value store management
- Agent and service API wrappers
- Easy integration with NestJS modules

## Installation

```bash
npm install nestjs-consul-service
```

## Usage

### Import the Module

```typescript
import { ConsulModule } from 'nestjs-consul-service';

@Module({
  imports: [ConsulModule.forRoot({
    host: 'localhost',
    port: 8500,
  })],
})
export class AppModule {}
```

### Inject and Use Services

```typescript
import { KvService, AgentService } from 'nestjs-consul-service';

@Injectable()
export class MyService {
  constructor(
    private readonly kvService: KvService,
    private readonly agentService: AgentService,
  ) {}

  async getValue(key: string) {
    return await this.kvService.get(key);
  }

  async registerService() {
    await this.agentService.service.registerService({
      name: 'my-service',
      address: '127.0.0.1',
      port: 3000,
    });
  }
}
```

## API
- `KvService`: Interact with Consul's key-value store
- `AgentService`: Register and manage services and health checks
- See `lib/agent/` and `lib/kv.service.ts` for more details

## Contributing
Pull requests and issues are welcome! Please follow conventional commit messages and code style.

## License
This project is licensed under the MIT License.

