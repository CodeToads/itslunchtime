import { TEST } from '../actions/actions';

const INITIAL_STATE = { phrase: "Click the button!" };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case TEST:
    return { phrase: "You clicked the button!" };
  default:
    return state;
  }
}
