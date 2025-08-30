import { ConnectData, RegisterServiceData, WeightsData } from '../agent/service.interface'
import { CheckData, TTLUpdateData } from '../agent/check.interface'

export function normalizeRegisterServiceOptions(data: RegisterServiceData): Record<string, any> {
    return cleanObject({
        Name: data.name,
        ID: data.id,
        Tags: data.tags,
        Address: data.address,
        TaggedAddresses: data.taggedAddresses,
        Meta: data.meta,
        Namespace: data.namespace,
        Port: data.port,
        Kind: data.kind,
        Proxy: data.proxy,
        Connect: data.connect ? normalizeConnectOptions(data.connect) : undefined,
        Check: data.check ? normalizeCheckOptions(data.check) : undefined,
        Checks: data.checks ? data.checks.map((check) => normalizeCheckOptions(check)) : undefined,
        EnableTagOverride: data.enableTagOverride,
        Weights: data.weights ? normalizeWeightsOptions(data.weights) : undefined,
        Partition: data.partition,
    })
}

export function normalizeConnectOptions(data: ConnectData): Record<string, any> {
    return cleanObject({
        Native: data.native,
        Proxy: data.proxy,
        SidecarService: data.sidecarService,
    })
}

export function normalizeCheckOptions(data: CheckData): Record<string, any> {
    return cleanObject({
        CheckID: data.id,
        Name: data.name,
        Interval: data.interval,
        Notes: data.notes,
        DeregisterCriticalServiceAfter: data.deRegisterCriticalServiceAfter,
        Args: data.args,
        AliasNode: data.aliasNode,
        AliasService: data.aliasService,
        DockerContainerID: data.dockerContainerId,
        GRPC: data.gRPC,
        GRPCUseTLS: data.gRPCUseTLS,
        H2PING: data.h2Ping,
        H2PINGUseTLS: data.h2PingUseTLS,
        HTTP: data.http,
        Method: data.method,
        Body: data.body,
        DisableRedirects: data.disableRedirects,
        Header: data.header,
        Timeout: data.timeout,
        OutputMaxSize: data.outputMaxSize,
        TLSServerName: data.tlsServerName,
        TLSSkipVerify: data.tlsSkipVerify,
        TCP: data.tcp,
        TCPUseTLS: data.tcpUseTLS,
        UDP: data.udp,
        OSService: data.osService,
        TTL: data.ttl,
        ServiceID: data.serviceId,
        Status: data.status,
        SuccessBeforePassing: data.successBeforePassing,
        FailuresBeforeWarning: data.failuresBeforeWarning,
        FailuresBeforeCritical: data.failuresBeforeCritical,
    })
}

export function normalizeWeightsOptions(data: WeightsData): Record<string, any> {
    return cleanObject({
        Passing: data.passing,
        Warning: data.warning,
    })
}

export function normalizeCheckUpdateOptions(data: TTLUpdateData): Record<string, any> {
    return cleanObject({
        Status: data.status,
        Output: data.output,
    })
}

function cleanObject(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null))
}
