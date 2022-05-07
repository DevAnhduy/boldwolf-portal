import { BaseApi } from "./base.api";

export class TourApi extends BaseApi {
    constructor() {
        super('tour')
    }

    insertMoreImg = async ({ token, data }) => {
        const rs = await this.post(`/img/${data.tourId}`, [...data.images], token)
        return rs.data
    }
}