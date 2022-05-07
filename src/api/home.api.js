import { BaseApi } from "./base.api";

export class HomePageApi extends BaseApi {
    constructor() {
        super('homepage')
    }
    
    getInfo = async ({token}) => {
        const rs = await this.get('/', undefined, token)
        return rs.data
    }
    updateInfo = async ({data, token}) => {
        const rs = await this.put('/', data, token)
        return rs
    }
    removeBanner = async ({ token }) => {
        const rs = await this.delete('/banner', undefined, token)
        return rs
    }
}