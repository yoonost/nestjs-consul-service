import { Module, DynamicModule } from '@nestjs/common'
import { ConsulInstance, createConsulInstance } from './utils/instance.util'
import { ConsulOptions } from './consul.interface'

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
            ],
        }
    }
}
