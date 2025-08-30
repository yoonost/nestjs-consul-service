export interface KvGetData {
    dc?: string
    recurse?: boolean
    raw?: boolean
    keys?: boolean
    separator?: string
}

export interface KvGetResponse {
    CreateIndex: number
    ModifyIndex: number
    LockIndex: number
    Key: string
    Flags: number
    Value: string | null
    Session: string | null
}

export interface KvSetData {
    dc?: string
    flags?: number
    cas?: number
    acquire?: string
    release?: string
}

export interface KvDeleteData {
    dc?: string
    recurse?: boolean
    cas?: number
}
