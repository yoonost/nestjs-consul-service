export type StatusType = 'passing' | 'warning' | 'critical'

export interface CheckResponse {
    Node: string
    CheckID: string
    Name: string
    Status: StatusType
    Notes: string
    Output: string
    ServiceID: string
    ServiceName: string
    ServiceTags: string[]
    Interval: string
    Timeout: string
    Type: string
    ExposedPort: number
    Definition: Record<string, any>
    Namespace: string
    CreateIndex: number
    ModifyIndex: number
}

export interface CheckData {
    id?: string
    name: string
    interval?: string
    notes?: string
    deRegisterCriticalServiceAfter?: string
    args?: string[]
    aliasNode?: string
    aliasService?: string
    dockerContainerId?: string
    gRPC?: string
    gRPCUseTLS?: boolean
    h2Ping?: string
    h2PingUseTLS?: boolean
    http?: string
    method?: string
    body?: string
    disableRedirects?: boolean
    header?: Record<string, string[]>
    timeout?: string
    outputMaxSize?: number
    tlsServerName?: string
    tlsSkipVerify?: boolean
    tcp?: string
    tcpUseTLS?: boolean
    udp?: string
    osService?: string
    ttl?: string
    serviceId?: string
    status?: StatusType
    successBeforePassing?: number
    failuresBeforeWarning?: number
    failuresBeforeCritical?: number
}

export interface TTLUpdateData {
    status: StatusType
    output?: string
}
