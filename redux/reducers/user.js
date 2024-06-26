import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, CLEAR_DATA } from '../constants/index';

const initialState = {
  currentUser: null,
  posts: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts
      }
    case CLEAR_DATA:
      return initialState
    default:
      return state;
  }
}