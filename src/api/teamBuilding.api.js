
import { BaseApi } from "./base.api";

export class TeamBuildingApi extends BaseApi {
    constructor() {
        super('team/program')
    }

    insertMoreImg = async ({ token, data }) => {
        const rs = await this.post(`/img/${data.teamBuildingId}`,  [...data.images], token)
        return rs.data
    }
}