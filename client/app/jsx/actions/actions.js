import axios from 'axios';

export const INCREMENT = 'INCREMENT';

export function increment() {
  return {
    type: INCREMENT
  };
}