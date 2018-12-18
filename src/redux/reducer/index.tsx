/**
 * Reducer 描述如何更新state
 */
import { type } from './../action';
const initalState = {
  menuName: '首页'
};
export default (state = initalState, action: any) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      };
    default:
      return state;
  }
};
