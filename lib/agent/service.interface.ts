import { CheckData } from './check.interface'

export interface ServiceResponse {
    ID: string
    Service: string
    Tags: string[]
    TaggedAddresses: Record<string, any>
    Meta: Record<string, string>
    Namespace: string
    Port: number
    Address: string
    EnableTagOverride: boolean
    Datacenter: string
    Weights: {
        Passing: number
        Warning: number
    }
}

export interface ServiceConfigResponse {
    Kind: string
    ID: string
    Service: string
    Tags: string[] | null
    Meta: Record<string, string> | null
    Namespace: string
    Port: number
    Address: string
    TaggedAddresses: Record<string, any>
    Weights: {
        Passing: number
        Warning: number
    }
    EnableTagOverride: boolean
    Datacenter: string
    ContentHash: string
    Proxy: any
}

export interface ServiceHealthResponse {
    AggregatedStatus: 'passing' | 'warning' | 'critical' | 'unknown'
    Service: ServiceResponse
    Checks: CheckData[]
}

export interface RegisterServiceData {
    name: string
    id?: string
    tags?: string[]
    address?: string
    taggedAddresses?: Record<string, any>
    meta?: Record<string, string>
    namespace?: string
    port?: number
    kind?: 'connect-proxy' | 'mesh-gateway' | 'service' | 'terminating-gateway' | 'ingress-gateway'
    proxy?: any
    connect?: ConnectData
    check?: CheckData
    checks?: CheckData[]
    enableTagOverride?: boolean
    weights?: WeightsData
    partition?: string
}

export interface ConnectData {
    native?: boolean
    proxy?: any
    sidecarService?: Record<string, any>
}

export interface WeightsData {
    passing: number
    warning: number
}
