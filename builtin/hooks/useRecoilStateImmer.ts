import produce from 'immer';
import { useCallback } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export function useRecoilStateImmer<T>(recoilState: RecoilState<T>) {
  const [val, setVal] = useRecoilState(recoilState);
  return [
    val,
    useCallback(
      (fn: (draft: T) => T) => {
        setVal((oldValue) => {
          return produce(oldValue, fn);
        });
      },
      [setVal]
    ),
  ] as const;
}
