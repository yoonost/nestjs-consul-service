import { Module, DynamicModule } from '@nestjs/common'
import { ConsulInstance, createConsulInstance } from './utils/instance.util'
import { ConsulOptions } from './consul.interface'
import { KvService } from './kv.service'

@Module({})
export class ConsulModule {
    static forRoot(options: ConsulOptions): DynamicModule {
        return {
            module: ConsulModule,
            providers: [
                {
                    provide: 'CONSUL_INSTANCE',
                    useFactory: (): ConsulInstance => createConsulInstance(options),
                },
                KvService,
            ],
        }
    }
}
