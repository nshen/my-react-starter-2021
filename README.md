# my-react-starter-2021

> 学习并使用 2021 年最酷的前端技术栈。

`Next.js` + `Chakra-ui` + `Recoil` + `axios-hooks` + `...`

- [版本历史](#版本历史)
- [命令](#命令)
- [示例](#示例)
  - [Next.js](#nextjs)
    - [TS / JS 混合开发](#nextjs)
    - [Static Generation](#nextjs)
    - [多语言](#多语言)
  - [Chakra-UI](#chakra-ui)
  - [Recoil](#recoil)
  - [Immer](#immer)
- [Hooks 技巧](#hooks)
  - React
    - [useState](#usestate)
    - [useReducer](#usereducer)
    - [useEffect](#useeffect)
    - [useLayoutEffect](#uselayouteffect)
    - [useRef](#useref)
    - [useCallback](#usecallback)
    - [useMemo](#usememo)
    - [useContext](#usecontext)
    - [useImperativeHandle](#useimperativehandle)
  - Third party
    - [useAxios](#useaxios)
    - [useRecoilState](#userecoilstate)
  - Custom
    - [useI18n](#多语言)
- [Layout](#layout)
- [参考](#参考)

## 版本历史

- v0.1.0 : 初始 [next.js](https://nextjs.org/) 框架 (`typescript`)
- v0.1.1 : 添加 `prettier` 配置, 添加 layout 组件，添加 `Static Generation` 示例
- v0.1.2 : 添加 [chakra-ui](https://chakra-ui.com/) 框架，[recoil](https://recoiljs.org/) 状态管理库
- v0.1.3 : 添加了 [axios-hooks](https://www.npmjs.com/package/axios-hooks) 用于数据请求
- v0.1.4 : 重构了页面目录，增加了一个 React.momo 示例，一个 [framer-motion](https://github.com/framer/motion) 示例
- v0.1.5 : 扩展 `next.js` 实现了 `i18n` 功能
- v0.1.6 : 添加了 [immer](https://immerjs.github.io/immer/) 状态管理库

TODO:

- https://www.prisma.io/
- https://trpc.io/

> 持续丰富中...

## 示例

### Nextjs

#### 同时支持 `JavaScript` / `TypeScript` 开发

- `js` 组件示例：[./components/ArticleList](./components/ArticleList/index.js)
- `ts` 组件示例：[./components/Layout](./components/Layout/index.tsx)

#### Static Generation

- 示例：[./pages/examples/static-demo.tsx](./pages/examples/static-demo.tsx)

#### 多语言

多语言是基于 `next.js` 系统自己实现了 `useI18n()` hooks，支持实时切换语言

首先修改 `next.config.js`

```js
  i18n: {
    localeDetection: false,
    locales: ["zh-CN", "en-US"],
    defaultLocale: "en-US",
  },
```

然后配置 `/i18n/config.ts` 修改 `map`，对应到语言文件

```ts
import en from './locales/en-US';
import zh from './locales/zh-CN';

export const localeMap = {
  'en-US': en,
  'zh-CN': zh,
};
```

之后就可以在需要翻译的页面上调用

```ts
const { t, locale, setLocale } = useI18n();
// t: { language:'语言' }
// locale: 'zh-CN'
// setLocale: (local:string) => void
```

在需要翻译的地方，可以使用 t 下的属性

```tsx
<h1>{t.name}</h1>
```

### Recoil

- `Recoil` 状态管理，示例：[./pages/examples/recoil-demo.tsx](./pages/examples/recoil-demo.tsx)
- [useRecoilState](#userecoilstate)

### axios-hooks

- `axios-hooks` 示例：[./pages/examples/dynamic-demo.tsx](./pages/examples/dynamic-demo.tsx)
- [useAxios](#useaxios)

### Chakra-UI

- TODO

### 架构技巧

- TODO
- atom 状态(查询参数)更新 -> 自动查询数据-> 页面刷新
- recoil reload

```ts
const reloadAtom = atom<number>({
  key: 'reload',
  default: 0,
});

export const useReload = () => {
  const setReloadAtom = useSetRecoilState(reloadAtom);
  return () => setReloadAtom((id) => id + 1);
};
```

## 命令

- `yarn dev` 开发
- `yarn build:static` 发布静态网站
- `yarn start`
- `yarn export`

## Layout

```
Container
    Nav
    main
    Footer
```

// TODO

## Hooks

### useState

监听事件，调用 setState，如果 state 不同，则 React 会安排一次重新渲染。

- useState 在用 typescript 时接受 null 类型

```typescript
const [data, setData] = useState<null | String>(null);
```

- useState 修改现有的值，传递一个函数作为参数

```typescript
const [isOpen, setIsOpen] = useState(false)
<Toggle onClick={() => setIsOpen(isOpen => !isOpen)} />
```

- useState 复制原有 state，只修改其中一部分

```typescript
function handleClick(index) {
  setState((state) => {
    return {
      ...state,
      bookableIndex: index,
    };
  });
}
```

- 如果 useState 初始值的计算非常 expensive，那么传递一个函数作为初始值，这样 React 只会在第一次调用组件时计算

```ts
const [value, setValue] = useState(() => {
  // expensive calculation here
  return initialState;
});
```

### Immer

如果 `state` 是 一个 `object` , 那么不可以直接修改，而应该先拷贝一个新的 state 再修改，会比较麻烦。
这个时候就可以使用 `Immer` 的 `produce` 函数，更好的控制 state 的更新

```ts
import produce from 'immer';

interface State {
  readonly x: number;
}

// `x` cannot be modified here
const state: State = {
  x: 0,
};

const newState = produce(state, (draft) => {
  // `x` can be modified here
  draft.x++;
});
```

在 `setState` 中用 `Immer`

比如有如下 `state`

```ts
type ArticleType = { title: string };
const [articles, setArticles] = useState<ArticleType[]>([]);
```

则可以

```ts
setArticles((articles) => {
  return produce(articles, (draft) => {
    draft.push({ title: `随机Title ${new Date().toISOString()}` });
  });
});
```

在用来设置 `state` 的时候，可简写

```ts
setArticles(
  produce((draft) => {
    draft.push({ title: `随机Title ${new Date().toISOString()}` });
  })
);
```

示例见 [./pages/examples/dynamic-immer.tsx](./pages/examples/dynamic-immer.tsx)

## useReducer

> When you find you always need to update multiple state values together or your state update
> logic is so spread out that it’s hard to follow, it might be time to define a function to
> manage state updates for you: a reducer function

`useReducer` 是 `useState` 的进化版本， 避免直接修改状态，使用 `dispatcher` 广播事件到 `reducer` 函数里统一处理，个人觉得没有必要。

## useEffect

什么是 Side Effects

> Component side effects
> React components generally transform state into UI. When component code performs
> actions outside this main focus—perhaps fetching data like blog posts or stock
> prices srom the network, setting up a subscription to an online service, or directly
> interacting with the DOM to focus form fields or measure element dimensions—we
> describe those actions as component side effects.

- 每次渲染后调用

```ts
useEffect(() => {
  console.log('Running side effects after every render');
});
```

- 仅在组件 `mount` 时调用

```ts
useEffect(() => {
  // 第二个参数传空数组
}, []);
```

- 在依赖变量改变时调用

```ts
useEffect(() => {
  // perform effect
  // that uses dep1 and dep2
}, [dep1, dep2]);
```

如果用到 `parent` 组件传进来的 `setState` 或者 `dispatch` 函数，记得添加到依赖里

- 清理，return 一个清理函数

```ts
useEffect(() => {
  function handleResize() {
    setSize(getSize()); // 浏览器大小改变，安排一次重新渲染
  }
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

- async callback

```ts
//错误代码
useEffect(async () => {
  const resp = await fetch('http://localhost:3001/users');
  const data = await resp.json();
  setUsers(data);
}, []);
```

由于 `useEffect`需要同步返回一个清理函数，`async` 函数返回的是一个 `promise`，所以会报错

正确方式是把异步访问放在同步函数内部

```ts
useEffect(() => {
  async function getUsers() {
    const resp = await fetch(url);
    const data = await resp.json();
    setUsers(data);
  }
  getUsers();
}, []);
```

## useLayoutEffect

多数情况下，`side effect` 都是在组件渲染之后同步。 某些特殊情况下副作用导致了立即再重绘，相当于多出来一个中间状态渲染，两次连续渲染导致闪烁的情况出现。
这个时候可以尝试把 `useEffect`改成 `useLayoutEffect`，表示在 DOM 更新后，但浏览器还没有重绘的时候处理。
大多数时候都不需要用到 `useLayoutEffect`，应该在出现问题的时候再尝试使用。

## useRef

- 与 `useState` 一样可以保存状态，但`不`引起重渲染
- 类似原来类的 [实例变量](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

```ts
const ref = useRef(42);
ref.current; // 42
```

- 保存 timer ID

```ts
const timerRef = useRef(null);
useEffect(() => {
  timerRef.current = setInterval(() => {
    dispatch({ type: 'NEXT_BOOKABLE' });
  }, 3000);
  return () => {
    clearInterval(timerRef.current);
  };
}, []);

//  。。。
<button
  onClick={() => {
    clearInterval(timerRef.current);
  }}
>
  Stop
</button>;
```

- 保存 DOM 引用

```typescript
function Foo() {
  // 类型越详细越好 HTMLDivElement > HTMLElement > Element
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 要先判断是否存在
    if (!divRef.current) throw Error('divRef is not assigned');
    doSomethingWith(divRef.current);
  });
  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```

## useCallback

`useCallback` , 传入一个 `inline callback` 和一个依赖数组, 保证每次渲染都返回同一个 `function`

```typescript
function MyComponent({ prop }) {
  const callback = () => {
    return 'Result';
  };
  const memoizedCallback = useCallback(callback, [prop]);
  // 这里保证传给 child 的 callback 不会变
  return <ChildComponent callback={memoizedCallback} />;
}
```

建议 [不要随便用](https://dmitripavlutin.com/dont-overuse-react-usecallback/)，出现性能问题再考虑

## useMemo

```typescript
const memoizedResult = useMemo(() => expensiveFn(a, b), [a, b]);
```

传入一个 "create" function, 和一个依赖数组。 `useCallback(fn, deps)` 等于 `useMemo(() => fn, deps)`.

比如 `ReactTable` 示例中用来缓存非常大的 `column` 数据，而不是每次渲染时都重新声明该变量

```ts
const columns = useMemo(
  () => [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    // 很长的数组....
  ],
  [] // 没有依赖
);
```

- You may rely on useMemo() as a performance optimization, not as a semantic guarantee
- Every value referenced inside the function should also appear in the dependencies array

## useContext

- 只用来存储不常变的数据
- 注意要把 `Provider` 抽取出来独立的类管理状态，避免用来管理树顶层 `state`，会重渲染整个树

  示例见 [./i18n/Context](./i18n/Context.tsx)

- 建议使用 `Recoil` 的 `atom` 代替 `Context`

## useImperativeHandle

使用 `useImperativeHandle` 需要先了解 `forwardRef` 的概念

### forwardRef

上层想得封装的组件内部 `Dom节点` 的引用，就需要封装的组件使用 `forwardRef` 把引用传到底层 `Dom` 的 `ref` 上

默认的 React 组件 只接收`props` 参数，为了使 `NestedComponent` 接受 `ref` ，需要用 `forwardRef` 包装起来

```ts
// forwardRef 到 input 类型
const NestedComponentWithForwardRef = forwardRef<HTMLInputElement, Props>(
  function NestedComponent(props, frowardedRef) {
    return <input {...props} ref={frowardedRef} />;
  }
);
```

`forwardRef` 的 语法：

```ts
// 注意类型顺序与参数顺序相反
const Component = React.forwardRef<RefType, PropsType>((props, ref) => {
  return someComponent;
});
```

之后就可以在上层引用到 `input` 了

```ts
const Index = () => {
  // nestedInputRef.current 引用到的是子组件的 input 节点
  const nestedInputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <NestedComponentWithForwardRef ref={nestedInputRef} />
      <Button
        onClick={(e) => {
          nestedInputRef.current?.focus(); // 调用input的方法
        }}
      >
    </div>
  );
};
```

### useImperativeHandle

useImperativeHandle 比 `forwardRef` 更进了一步，不仅让 `Parent` 得到 `Child` 的 `Dom` 引用，

更提供了把组件内部的 `API`暴露给 `Parent` 的方法， 相当于可以实现从 `Parent` 调用 `Child` 的方法，使用方式如下：

```ts
// 子组件传递给父组件的api 类型
type ChildAPI = {
  focusAndBlur: () => void;
};

// 提供 ChildAPI 的子组件
const NestedComponentWithUseImperativeHandle = forwardRef<ChildAPI, Props>(
  function NestedComponent(props, forwardedRef) {
    // local ref
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => {
      // 把整个api对象返给Parent
      return {
        // 使input得到焦点，一秒后自动失去焦点
        focusAndBlur: () => {
          inputRef.current?.focus();
          setTimeout(() => {
            inputRef.current?.blur();
          }, 1000);
        },
      };
      //-------------------------------
    });
    return <Input {...props} ref={inputRef}></Input>;
  }
);
```

`Parent` 调用端:

```ts
const Index = () => {
  const nestedHandleRef = useRef<ChildAPI>(null);
  return (
    <div>
      <NestedComponentWithUseImperativeHandle ref={nestedHandleRef} />
      <Button
        onClick={(e) => {
          nestedHandleRef.current?.focusAndBlur();
        }}
      >
        focusAndBlur
      </Button>
    </div>
  );
};
```

[完整示例](./pages/examples/useImperativeHandle.tsx)

## useAxios

```ts
const [{ data, loading, error }, refetch] = useAxios(
  'https://jsonplaceholder.typicode.com/posts'
);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error!</p>;
if (data) {
  const articles = data.map((article: any) => {
    return {
      title: article.title,
    };
  });
  return (
    <Flex direction="column" justify="flex-start" my="3">
      <ArticleList articles={articles} />
      <Button
        onClick={() => {
          refetch();
        }}
      >
        refetch
      </Button>
    </Flex>
  );
}
```

[完整示例](./pages/examples/dynamic-demo.tsx)

## useRecoilState

`atom` 是 `recoil` 版本的 `state`

```ts
const countAtom = atom<number>({
  // <number> 是 default 的类型, 可省略自行推断
  key: 'count-atom',
  default: 1,
});
```

之后就可以跟 `setState` 一样使用了

```ts
const [count, setCount] = useRecoilState(countAtom);
const readOnlyCount = useRecoilValue(countAtom); // 只读版本
const setOnlyCount = useSetRecoilState(countAtom); // 只写版本
```

`selector` 可以对 `atom` 进行修改并返回

```ts
export const countSelector = selector<string>({
  // <string> 是 get 返回的类型
  key: 'count-selector',
  get: ({ get }) => {
    const count = get(countAtom); // 取countAtom，修改
    return count + 'em';
  },
});
```

`selector` 同 `atom` 一样可订阅

```ts
const iconSize = useRecoilValue(countSelector);
```

`selector` 甚至可以 `set`

```ts
export const countSelector = selector<string | number>({
  key: 'count-selector',
  get: ({ get }) => {
    const count = get(countAtom); // 取countAtom，修改
    return count + 'em';
  },
  set: ({ set }, newValue) => {
    const value = parseInt((newValue as string).slice(0, -2));
    set(countAtom, value);
  },
});
```

[完整示例](./pages/examples/recoil-demo.tsx)

`atomFamily()` 是一个 [utils 函数](https://recoiljs.org/zh-hans/docs/api-reference/utils/atomFamily/)，返回一个 atom 工厂函数，传入该函数唯一的 `id`，则返回唯一的 `atom`

```ts
// 类型为 < default 数据类型，id 类型>
const elementPositionStateFamily = atomFamily<number[], number>({
  key: 'ElementPosition',
  default: [0, 0],
});

// 创建 atom
elementPositionStateFamily(1); // atom1
elementPositionStateFamily(2); // atom2
elementPositionStateFamily(3); // atom3
```

`selectorFamily<返回类型，参数类型>()`

```ts
const editState = selectorFamily<number, string>({
  key: 'editState',
  get: (path: string) => () => {
    return 1;
  },
  set:
    (path: string) =>
    ({ set }, newValue) => {
      //   set( someAtom,newValue);
    },
});

// in components
useRecoilValue(editState('mypath/abc'));
```

例子:

```ts
const myNumberState = atom({
  key: 'MyNumber',
  default: 2,
});

const myMultipliedState = selectorFamily({
  key: 'MyMultipliedNumber',
  get:
    (multiplier) =>
    ({ get }) => {
      return get(myNumberState) * multiplier;
    },

  // optional set
  set:
    (multiplier) =>
    ({ set }, newValue) => {
      set(myNumberState, newValue / multiplier);
    },
});

function MyComponent() {
  // defaults to 2
  const number = useRecoilValue(myNumberState);

  // defaults to 200
  const multipliedNumber = useRecoilValue(myMultipliedState(100));

  return <div>...</div>;
}
```

## 参考

官网

- https://nextjs.org/
- https://chakra-ui.com/
- https://recoiljs.org/
- https://www.npmjs.com/package/axios-hooks
- https://www.npmjs.com/package/react-table

学习

- https://github.com/bradtraversy/next-crash-course
- https://github.com/typescript-cheatsheets/
- https://fettblog.eu/typescript-react/hooks
- https://course.learnrecoil.com/
- Hooks
  - https://usehooks-typescript.com
  - https://github.com/streamich/react-use
  - https://github.com/rehooks/awesome-react-hooks
  - https://usehooks.com/
  - https://ahooks.js.org/
