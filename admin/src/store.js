import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers';


const initialState = {
  sidebarShow: 'responsive'
}

const middleware = [thunk];

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return {...state, ...rest }
//     default:
//       return state
//   }
// }

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
)

export default store