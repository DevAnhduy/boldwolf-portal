import { BaseApi } from "./base.api";

export class OverviewApi extends BaseApi {
    constructor() {
        super('overview')
    }

    getAll = async ({ token }) => {
        const rs = await this.get('/', undefined, token)
        return rs.data
    }
    
    update = async ({ data, token }) => {
        const rs = await this.put(`/${data.type}/${data.id}`, data, token)
        return rs.data
    }
}