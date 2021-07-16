# my-react-starter-2021

`Next.js` + `Chakra-ui` + `Recoil` + `axios-hooks`

## 特性

- 同时支持 `JavaScript` / `TypeScript` 开发
  - `js` 组件示例：[./components/ArticleList](./components/ArticleList/index.js)
  - `ts` 组件示例：[./components/Layout](./components/Layout/index.tsx)
- `Server-Side Rendering` 示例：[./pages/examples/static-demo.tsx](./pages/examples/static-demo.tsx)
- `Recoil` 状态管理，示例：[./pages/examples/recoil-demo.tsx](./pages/examples/recoil-demo.tsx)
- `axios-hooks` 示例：[./pages/examples/dynamic-demo.tsx](./pages/examples/dynamic-demo.tsx)

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

## 多语言

多语言是基于 `next.js` 系统自己实现的，支持实时切换语言

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

## Tips

- useState 支持 null 类型

```typescript
const [data, setData] = useState<null | String>(null);
```

- useState 修改现有的值

```typescript
const [isOpen, setIsOpen] = useState(false)
<Toggle onClick={() => setIsOpen(isOpen => !isOpen)} />
```

- useRef

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

- useMemo

  - You may rely on useMemo() as a performance optimization, not as a semantic guarantee
  - Every value referenced inside the function should also appear in the dependencies array

```typescript
const memoizedResult = useMemo(() => computation(a, b), [a, b]);
```

- useCallback :

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
