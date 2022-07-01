const state = () => {
  return {
    updatingBehaviour: [] // productBlock of string, STRING format = ${objectId(string)} + ${updatingWhichField}
  }
}

const getters = {
  updatingBehaviour: state => state.updatingBehaviour
}
const mutations = {
  START_UPDATING_BEHAVIOUR (
    state, {
      objectId,
      updating // array of object [{ field, value }, {}...]
    }) {
    const behaviourString = `${objectId}`
    // if (!state.updatingBehaviour.hasOwnProperty(objectIdString)) {
    //   state.updatingBehaviour[objectIdString] = {}
    // }
    updating.forEach((item) => {
      const bs = behaviourString + `${item.field}`
      const index = state.updatingBehaviour.indexOf(bs)
      if (index < 0) {
        state.updatingBehaviour.push(bs)
      }
    })
    // console.log('START updatingBehaviour: ', JSON.stringify(state.updatingBehaviour))
  },
  END_UPDATING_BEHAVIOUR (
    state, {
      objectId,
      updating // array of object [{ field, value }, {}...], only field has been used
    }) {
    const behaviourString = `${objectId}`
    updating.forEach((item) => {
      const bs = behaviourString + `${item.field}`
      const index = state.updatingBehaviour.indexOf(bs)
      if (index >= 0) {
        state.updatingBehaviour.splice(bs, 1)
      }
    })
    // console.log('END updatingBehaviour: ', JSON.stringify(state.updatingBehaviour))
  }
}
const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
