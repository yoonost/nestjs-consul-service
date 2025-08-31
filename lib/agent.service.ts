import { Injectable, Inject } from '@nestjs/common'
import { AgentServiceService } from './agent/service.service'
import { AgentCheckService } from './agent/check.service'
import { ConsulInstance } from './utils/instance.util'

@Injectable()
export class AgentService {
    public readonly check: AgentCheckService
    public readonly service: AgentServiceService

    constructor(@Inject('CONSUL_INSTANCE') private readonly consul: ConsulInstance) {
        this.check = new AgentCheckService(consul)
        this.service = new AgentServiceService(consul)
    }

    public async reloadAgent(): Promise<void> {
        return this.consul.put(`/agent/reload`)
    }

    public async enableMaintenance(enable: boolean, reason: string): Promise<void> {
        return this.consul.put(`/agent/maintenance`, undefined, reason ? { enable, reason } : { enable })
    }
}
