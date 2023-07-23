import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('res.data', res.data)
    const posts = res.data.posts.map(p => new Post(p))
    AppState.posts = posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    logger.log('appstate posts', AppState.posts)
  }
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    const newPost = new Post(res.data)
    AppState.posts.unshift(newPost)
  }
  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`)
    const postIndex = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(postIndex, 1)
  }
  async likePost(accountId, post) {

    if (post.likeIds.includes(accountId)) {
      const foundIndex = post.likeIds.findIndex(p => p == accountId)
      post.likeIds.splice(foundIndex, 1)
      const res = api.put(`api/posts/${post.id}`, post)
      logger.log('res data of unliking a post', res.data)
    } else {
      post.likeIds.push(accountId)
      // logger.log('updated likes array', updatedLikes)
      logger.log('updated likes post', post)
      const res = api.put(`api/posts/${post.id}`, post)
      logger.log('res data of liking a post', res.data)
    }
  }
  async changePage(url) {
    const res = await api.get(url)
    logger.log('Changing Page', res.data)
    const posts = res.data.posts.map(p => new Post(p))
    AppState.posts = posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older

  }
}

export const postsService = new PostsService()