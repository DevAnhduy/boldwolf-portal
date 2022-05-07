import { BaseApi } from "./base.api";

export class ReviewApi extends BaseApi {
    constructor() {
        super('review')
    }

    getHomeReview = async ({ token }) => {
        const rs = await this.get('/home', undefined, token)
        return rs.data
    }

    createTourReview = async ({ token, data }) => {
        const {tourId} = data
        delete data.tourId
        const rs = await this.post(`/tour/${tourId}`, {...data}, token)
        return rs.data
    }

    deleteTourReview = async ({ token, data: id }) => {
        const rs = await this.delete(`/tour/${id}`, undefined, token)
        return rs
    }

    createAdventureTourReview = async ({ token, data }) => {
        const {tourId} = data
        delete data.tourId
        const rs = await this.post(`/adventure/${tourId}`, {...data}, token)
        return rs.data
    }

    deleteAdventureTourReview = async ({ token, data: id }) => {
        const rs = await this.delete(`/adventure/${id}`, undefined, token)
        return rs
    }


    createTeamBuildingReview = async ({ token, data }) => {
        const { teamBuildingId } = data
        delete data.teamBuildingId
        const rs = await this.post(`/team-building/${teamBuildingId}`, { ...data }, token)
        return rs.data
    }

    deleteTeamBuildingReview = async ({ token, data: id }) => {
        const rs = await this.delete(`/team-building/${id}`, undefined, token)
        return rs
    }
}