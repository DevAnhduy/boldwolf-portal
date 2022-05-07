import { BaseApi } from "./base.api";

export class AboutApi extends BaseApi {
    constructor() {
        super('about')
    }

    /**
     * 
     * @param {} param0 
     * @param {*} type in ABOUT_TYPE
     */
    getAllAbout = async ({ token }) => {
        const rs = await this.get('/', undefined, token)
        return rs.data
    }
    getDetail = async ({ data: id, token }, type = "") => {
        const rs = await this.get(`/${type}/${id}`, undefined, token)
        return rs
    }
    add = async ({ data, token }, type = "") => {
        const rs = await this.post(`/${type}`, data, token)
        return rs
    }
    update = async ({ data, token }, type = "") => {
        const { id, ...otherData } = data
        const rs = await this.put(`/${type}/${id}`, { ...otherData }, token)
        return rs
    }
    remove = async ({ data: id, token }, type = "") => {
        const rs = await this.delete(`/${type}/${id}`, undefined, token)
        return rs
    }
}