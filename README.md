# my-react-starter-2021

> 学习并使用 2021 年最酷的前端技术栈。

`Next.js` + `Chakra-ui` + `Recoil` + `axios-hooks` + `...`

- [版本历史](#版本历史)
- [特性](#特性)
  - [多语言](#多语言)
- [Hooks 技巧](#hooks)
  - [useState](#usestate)
  - [useReducer](#usereducer)
  - [useEffect](#useeffect)
  - [useLayoutEffect](#uselayouteffect)
  - [useRef](#useref)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)
  - [useAxios](#useaxios)
  - [useI18n](#多语言)
- [命令](#命令)
- [Layout](#Layout)
- [参考](#参考)

## 版本历史

- v0.1.0 : 初始 [next.js](https://nextjs.org/) 框架 (`typescript`)
- v0.1.1 : 添加 `prettier` 配置, 添加 layout 组件，添加 `Static Generation` 示例
- v0.1.2 : 添加 [chakra-ui](https://chakra-ui.com/) 框架，[recoil](https://recoiljs.org/) 状态管理库
- v0.1.3 : 添加了 [axios-hooks](https://www.npmjs.com/package/axios-hooks) 用于数据请求
- v0.1.4 : 重构了页面目录，增加了一个 React.momo 示例，一个 [framer-motion](https://github.com/framer/motion) 示例
- v0.1.5 : 扩展 `next.js` 实现了 `i18n` 功能

> 持续更新中...

## 特性

- 同时支持 `JavaScript` / `TypeScript` 开发
  - `js` 组件示例：[./components/ArticleList](./components/ArticleList/index.js)
  - `ts` 组件示例：[./components/Layout](./components/Layout/index.tsx)
- `Static Generation` 示例：[./pages/examples/static-demo.tsx](./pages/examples/static-demo.tsx)
- `Recoil` 状态管理，示例：[./pages/examples/recoil-demo.tsx](./pages/examples/recoil-demo.tsx)
- `axios-hooks` 示例：[./pages/examples/dynamic-demo.tsx](./pages/examples/dynamic-demo.tsx)

### 多语言

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
import en from "./locales/en-US";
import zh from "./locales/zh-CN";

export const localeMap = {
  "en-US": en,
  "zh-CN": zh,
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

## useReducer

> When you find you always need to update multiple state values together or your state update
> logic is so spread out that it’s hard to follow, it might be time to define a function to
> manage state updates for you: a reducer function

- todo...

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
  console.log("Running side effects after every render");
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

- 清理，return 一个清理函数

```ts
useEffect(() => {
  function handleResize() {
    setSize(getSize()); // 浏览器大小改变，安排一次重新渲染
  }
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

- async callback

```ts
//错误代码
useEffect(async () => {
  const resp = await fetch("http://localhost:3001/users");
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

多数情况下，`side effect` 都是在组件渲染之后同步。 特殊情况下，这个时候如果更新了`state`导致再重绘，会出现一个中间状态渲染，导致闪烁的情况。
这个时候可以尝试把 `useEffect`改成 `useLayoutEffect`，表示在 DOM 更新后，但浏览器还没有重绘的时候处理。
大多数时候都不需要用到 `useLayoutEffect`，应该在出现问题的时候再尝试使用。

## useRef

```typescript
function Foo() {
  // 类型越详细越好 HTMLDivElement > HTMLElement > Element
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 要先判断是否存在
    if (!divRef.current) throw Error("divRef is not assigned");
    doSomethingWith(divRef.current);
  });
  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```

## useMemo

- You may rely on useMemo() as a performance optimization, not as a semantic guarantee
- Every value referenced inside the function should also appear in the dependencies array

```typescript
const memoizedResult = useMemo(() => computation(a, b), [a, b]);
```

## useCallback

[不要随便用](https://dmitripavlutin.com/dont-overuse-react-usecallback/)，出现性能问题再考虑

```typescript
function MyComponent({ prop }) {
  const callback = () => {
    return "Result";
  };
  const memoizedCallback = useCallback(callback, [prop]);
  // 这里保证传给 child 的 callback 不会变
  return <ChildComponent callback={memoizedCallback} />;
}
```

## useAxios

[演示](./pages/examples/dynamic-demo.tsx)

## 参考

官网

- https://nextjs.org/
- https://chakra-ui.com/
- https://recoiljs.org/
- https://www.npmjs.com/package/axios-hooks

学习

- https://github.com/bradtraversy/next-crash-course
- https://github.com/typescript-cheatsheets/

typescript + hooks

- https://fettblog.eu/typescript-react/hooks
