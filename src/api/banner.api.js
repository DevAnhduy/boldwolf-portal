import { BaseApi } from "./base.api";

export class BannerApi extends BaseApi {
    constructor() {
        super('banner')
    }

    getAllWithType = async ({ token }) => {
        const rs = await this.get('/type', undefined, token)
        return rs.data
    }

    getAllBanner = async ({ token }) => {
        const rs = await this.get('/', undefined, token)
        return rs.data
    }

    getBannerDetailWithReference = async ({ token, data }) => {
        const { key, id } = data
        const rs = await this.get(`/${key}/${id}`, undefined, token)
        return rs.data
    }

    // updateBanner = async ({ data, token }) => {
    //     const rs = await this.post('/', data, token)
    //     return rs
    // }

    updateBanner = async ({ data, token }) => {
        const rs = await this.put('/', data, token)
        return rs
    }
}