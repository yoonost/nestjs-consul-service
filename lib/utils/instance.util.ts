import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ConsulOptions } from '../consul.interface'

export type RequestParams = Record<string, string | number | boolean>

export interface ConsulInstance {
    get<T = unknown>(path: string, params?: RequestParams): Promise<T>
    post<T = unknown>(path: string, data?: unknown, params?: RequestParams): Promise<T>
    put<T = unknown>(path: string, data?: unknown, params?: RequestParams): Promise<T>
    delete<T = unknown>(path: string, params?: RequestParams): Promise<T>
}

export const createConsulInstance = (options: ConsulOptions): ConsulInstance => {
    const scheme: 'https' | 'http' = options.secure ? 'https' : 'http'
    const baseURL = `${scheme}://${options.host}:${options.port}/v1`

    const instance: AxiosInstance = axios.create({
        baseURL,
        headers: options.token ? { 'X-Consul-Token': options.token } : undefined,
    })

    return {
        async get<T = unknown>(path: string, params?: RequestParams): Promise<T> {
            const response: AxiosResponse<T> = await instance.get(path, { params })
            return response.data
        },
        async post<T = unknown>(path: string, data?: unknown, params?: RequestParams): Promise<T> {
            const response: AxiosResponse<T> = await instance.post(path, data, { params })
            return response.data
        },
        async put<T = unknown>(path: string, data?: unknown, params?: RequestParams): Promise<T> {
            const response: AxiosResponse<T> = await instance.put(path, data, { params })
            return response.data
        },
        async delete<T = unknown>(path: string, params?: RequestParams): Promise<T> {
            const response: AxiosResponse<T> = await instance.delete(path, { params })
            return response.data
        },
    }
}
