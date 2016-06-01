import { INCREMENT } from '../actions/actions';

const INITIAL_STATE = { count: 0 };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case INCREMENT:
    return { count: state.count + 1 };
  default:
    return state;
  }
}
