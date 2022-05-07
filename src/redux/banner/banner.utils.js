export const updateBanner = (state, data) => {
    if (!state){
        return [data]
    }

    const index = state.findIndex(item => item.id === data.id)

    if (index === -1) { // new data
        return  [...state, data]
    }

    // update data
    const newState = [...state]
    newState[index] = {...data}
    return newState
}