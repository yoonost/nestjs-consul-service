import { TTLUpdateData } from "../agent/check.interface";

export function normalizeCheckUpdateOptions(data: TTLUpdateData): Record<string, any> {
    return cleanObject({
        Status: data.status,
        Output: data.output,
    })
}

function cleanObject(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null))
}