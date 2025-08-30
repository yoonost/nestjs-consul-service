import { Injectable } from '@nestjs/common'
import { ConsulInstance } from '../utils/instance.util'
import { RegisterServiceData, ServiceConfigResponse, ServiceHealthResponse, ServiceResponse } from './service.interface'
import { normalizeRegisterServiceOptions } from '../utils/normalizeKeys.util'

@Injectable()
export class AgentServiceService {
    constructor(private readonly consul: ConsulInstance) {}

    public async getServices(filter?: string): Promise<ServiceResponse[]> {
        return this.consul.get('/agent/services', filter ? { filter } : {})
    }

    public async getService(serviceId: string): Promise<ServiceConfigResponse> {
        return this.consul.get(`/agent/service/${serviceId}`)
    }

    public async getServiceHealthByName(serviceName: string, format?: string): Promise<ServiceHealthResponse> {
        return this.consul.get(`/agent/health/service/name/${serviceName}`, format ? { format } : {})
    }

    public async getServiceHealthById(serviceId: string, format?: string): Promise<ServiceHealthResponse> {
        return this.consul.get(`/agent/health/service/id/${serviceId}`, format ? { format } : {})
    }

    public async registerService(data: RegisterServiceData): Promise<void> {
        return this.consul.put(`/agent/service/register`, normalizeRegisterServiceOptions(data))
    }

    public async deregisterService(serviceId: string): Promise<void> {
        return this.consul.put(`/agent/service/deregister/${serviceId}`)
    }

    public async enableMaintenanceService(serviceId: string, enable: boolean, reason?: string): Promise<void> {
        return this.consul.put(`/agent/service/maintenance/${serviceId}`, undefined, reason ? { enable, reason } : { enable })
    }
}
