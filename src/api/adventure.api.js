import { BaseApi } from "./base.api";

export class AdventureApi extends BaseApi {
    constructor() {
        super('adventure')
    }

    getInfo = async ({ token }) => {
        const rs = await this.get('/info', undefined, token)
        return rs.data
    }
    updateInfo = async ({ data, token }) => {
        const rs = await this.put('/info', data, token)
        return rs.data
    }

    // adventure type
    getAll = async ({ token }) => {
        const rs = await this.get('/type/', undefined, token)
        return rs.data
    }
    getDetail = async ({ data: id, token }, type = "") => {
        const rs = await this.get(`/type/${type}/${id}`, undefined, token)
        return rs
    }
    add = async ({ data, token }, type = "") => {
        const rs = await this.post(`/type/${type}`, data, token)
        return rs
    }
    update = async ({ data, token }, type = "") => {
        const { id, ...otherData } = data
        const rs = await this.put(`/type/${type}/${id}`, { ...otherData }, token)
        return rs
    }
    remove = async ({ data: id, token }, type = "") => {
        const rs = await this.delete(`/type/${type}/${id}`, undefined, token)
        return rs.data
    }
    getAdventureTour = async ({ token }) => {
        const rs = await this.get(`/tour`, undefined, token)
        return rs
    }
    getAdventureTourDetail = async ({ data: id, token }) => {
        const rs = await this.get(`/tour/${id}`, undefined, token)
        return rs
    }
    addAdventureTour = async ({ data, token }) => {
        const rs = await this.post(`/tour`, data, token)
        return rs
    }
    updateAdventureTour = async ({ data, token }) => {
        const { id, ...otherData } = data
        const rs = await this.put(`/tour/${id}`, { ...otherData }, token)
        return rs
    }
    removeAdventureTour = async ({ data: id, token }) => {
        const rs = await this.delete(`/tour/${id}`, undefined, token)
        return rs
    }
    insertMoreImg = async ({ token, data }) => {
        const rs = await this.post(`/img/${data.tourId}`, [...data.images], token)
        return rs.data
    }
}