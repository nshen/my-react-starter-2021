import { atom, selector } from "recoil";

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
