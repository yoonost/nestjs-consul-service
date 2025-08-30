import { Inject, Injectable } from '@nestjs/common'
import { KvDeleteData, KvGetData, KvGetResponse, KvSetData } from './kv.interface'
import { ConsulInstance } from './utils/instance.util'

@Injectable()
export class KvService {
    constructor(@Inject('CONSUL_INSTANCE') private readonly consul: ConsulInstance) {}

    public async getKey(key: string, data?: KvGetData): Promise<KvGetResponse[]> {
        const response: KvGetResponse[] = await this.consul.get(`/kv/${key}`, data ? { ...data } : {})
        return response.map((item) => ({
            ...item,
            Value: item.Value ? Buffer.from(item.Value, 'base64').toString('utf-8') : item.Value,
        }))
    }

    public async setKey(key: string, value: string, data?: KvSetData): Promise<void> {
        return this.consul.put(`/kv/${key}`, value, data ? { ...data } : {})
    }

    public async deleteKey(key: string, data?: KvDeleteData): Promise<void> {
        return this.consul.delete(`/kv/${key}`, data ? { ...data } : {})
    }
}
