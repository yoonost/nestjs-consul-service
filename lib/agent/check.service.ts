import { Injectable } from '@nestjs/common'
import { ConsulInstance } from '../utils/instance.util'
import {CheckData, CheckResponse, TTLUpdateData } from './check.interface'
import { normalizeCheckUpdateOptions } from '../utils/normalizeKeys.util'

@Injectable()
export class AgentCheckService {
    constructor(private readonly consul: ConsulInstance) {}

    public async getChecks(filter?: string): Promise<CheckResponse[]> {
        return this.consul.get(`/agent/checks`, filter ? { filter } : {})
    }

    public async registerCheck(data: CheckData): Promise<void> {
        return this.consul.put(`/agent/check/register`, data)
    }

    public async deregisterCheck(checkId: string): Promise<void> {
        return this.consul.put(`/agent/check/deregister/${checkId}`)
    }

    public async ttlCheckPass(checkId: string, note?: string): Promise<void> {
        return this.consul.put(`/agent/check/pass/${checkId}`, undefined, note ? { note } : {})
    }

    public async ttlCheckWarn(checkId: string, note?: string): Promise<void> {
        return this.consul.put(`/agent/check/warn/${checkId}`, undefined, note ? { note } : {})
    }

    public async ttlCheckFail(checkId: string, note?: string): Promise<void> {
        return this.consul.put(`/agent/check/fail/${checkId}`, undefined, note ? { note } : {})
    }

    public async ttlCheckUpdate(checkId: string, data: TTLUpdateData): Promise<void> {
        return this.consul.put(`/agent/check/update/${checkId}`, normalizeCheckUpdateOptions(data))
    }
}
