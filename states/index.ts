import { atom, selector, atomFamily } from "recoil";

export const countAtom = atom({
  key: "count-atom",
  default: 1,
});

export const countSelector = selector({
  key: "count-selector",
  get: ({ get }) => {
    const count = get(countAtom); // 取countAtom，修改
    return count + "em";
  },
});

// 类型为 < 数据类型，id 类型>
export const elementPositionStateFamily = atomFamily<number[], number>({
  key: "ElementPosition",
  default: [0, 0],
});
