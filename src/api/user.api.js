import { BaseApi } from "./base.api";

export class UserApi extends BaseApi {
    constructor() {
        super('auth')
    }

    login = async (payload) => {
        const rs = await this.post('/login', payload)
        return rs
    }
    verify = async (payload) => {
        const rs = await this.post('/verify', {...payload})
        return rs
    }
}