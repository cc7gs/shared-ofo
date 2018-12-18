// Action类型

//存放Action类型
export const type = {
  SWITCH_MENU: 'SWITCH_MENU'
};
//Action创建函数
export const switchMenu = (menuName: string) => {
  return {
    type: type.SWITCH_MENU,
    menuName
  };
};
