import blogService from '../services/blogService'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS': {
    // https://stackoverflow.com/a/50753272
    action.allBlogs.sort((a, b) => b.likes - a.likes)
    return action.allBlogs
  }
  case 'ADD_BLOG':
    return [ ...state, action.addedBlog ]
  case 'REMOVE_BLOG': {
    let filteredBlogs = state.filter(x => x.id !== action.blog.id)
    return filteredBlogs
  }
  case 'ADD_LIKE': {
    let updatedBlogs = state.filter(x => x.id !== action.likedBlog.id)
    updatedBlogs = [ ...updatedBlogs, action.likedBlog]
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    return updatedBlogs
  }
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.addLikes(blog.id, blog)
    dispatch({
      type: 'ADD_LIKE',
      likedBlog
    })
  }
}

export const postBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.addBlog(blog)
    dispatch({
      type: 'ADD_BLOG',
      addedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      blog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      allBlogs
    })
  }
}

export default blogsReducer