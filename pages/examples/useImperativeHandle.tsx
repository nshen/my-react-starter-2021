/**
 * 上层想得封装的组件内部的ref，就需要封装的组件使用forwardRef把引用传到底层dom的ref属性
 */
import { Button, Heading, Input } from '@chakra-ui/react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {};

// ref不能通过props传递
// 想传递ref，必须用 forwardRef 包装组件，会接受第二个参数为ref
const NestedComponent = (props: Props) => {
  return <Input {...props} />;
};

const NestedComponentWithForwardRef = forwardRef<HTMLInputElement, Props>(
  function NestedComponent(props, forwardedRef) {
    return <Input {...props} ref={forwardedRef}></Input>;
  }
);

// 子组件传递给父组件的api
type ChildAPI = {
  focusAndBlur: () => void;
};
const NestedComponentWithUseImperativeHandle = forwardRef<ChildAPI, Props>(
  function NestedComponent(props, forwardedRef) {
    // local ref
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => {
      // 把整个对象返给Parent
      return {
        focusAndBlur: () => {
          inputRef.current?.focus();
          setTimeout(() => {
            inputRef.current?.blur();
          }, 1000);
        },
      };
    });
    return <Input {...props} ref={inputRef}></Input>;
  }
);

const Index = () => {
  const nestedInputRef = useRef<HTMLInputElement>(null);
  const nestedHandleRef = useRef<ChildAPI>(null);
  return (
    <div>
      <Heading my="5"> NestedComponent</Heading>
      <NestedComponent /* ref={nestedInputRef} 报错，因为无法传递ref到 input  */
      />
      <Heading my="5"> NestedComponentWithForwardRef</Heading>
      <NestedComponentWithForwardRef ref={nestedInputRef} />
      <Button
        onClick={(e) => {
          nestedInputRef.current?.focus();
        }}
      >
        focurs
      </Button>
      <Heading my="5">NestedComponentWithUseImperativeHandle</Heading>
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

export default Index;
