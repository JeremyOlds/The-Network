import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from "../models/Profile.js"

class ProfilesService {
  async setActiveProfile(creatorId) {

    const res = await api.get(`api/profiles/${creatorId}`)
    logger.log('getting active profile', res.data)
    AppState.activeProfile = new Profile(res.data)
    logger.log('appstate active profile', AppState.activeProfile)
  }
}

export const profilesService = new ProfilesService()