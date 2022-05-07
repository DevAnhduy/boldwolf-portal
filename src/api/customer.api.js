import { BaseApi } from "./base.api";

export class CustomerApi extends BaseApi {
    constructor() {
        super('customer')
    }

    getCustomerList = async (payload) => {
        const rs = await this.get('/', payload)
        return rs
    }

    addCustomer = async ({ data, token }) => {
        const rs = await this.post('/', data, token)
        return rs
    }
    
}