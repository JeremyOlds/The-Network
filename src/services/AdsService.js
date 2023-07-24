import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdsService {
  async getAds() {
    const res = await api.get('api/ads?count=2')
    // logger.log('ads from api', res.data)
    const ads = res.data.map(a => new Ad(a))
    AppState.ads = ads
    logger.log('appstate ads', AppState.ads)
  }
}

export const adsService = new AdsService()