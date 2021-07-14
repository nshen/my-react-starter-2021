import { Button } from "@chakra-ui/react";
import React, { useState, useRef, memo, useMemo } from "react";

const ChildComponent = ({ name }: { name: string }) => {
  console.log(name);
  return <div>{name}</div>;
};

// memo 后 如果props不改，就不会重新渲染
const MemoChildComponent = memo(ChildComponent);

const ParentComponent = () => {
  const [state1, setState1] = useState(0);
  const memoizedValue = useMemo(() => String(state1), [state1]);
  console.log("Parent");
  return (
    <div>
      <Button onClick={() => setState1(Math.random())}>Rerender</Button>
      <Button onClick={() => setState1(1)}>Rerender</Button>
      <ChildComponent name="Child" />
      <ChildComponent name={memoizedValue} />
      <MemoChildComponent name="MemoChild" />
    </div>
  );
};

export default ParentComponent;
