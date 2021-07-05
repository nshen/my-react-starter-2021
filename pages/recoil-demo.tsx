import React from "react";
import { Flex, Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { Gi3DGlasses } from "react-icons/gi";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { countAtom, countSelector } from "../states";

const RecoilDemo = () => {
  const [count, setCount] = useRecoilState(countAtom);
  const resetCount = useResetRecoilState(countAtom);
  const iconSize = useRecoilValue(countSelector);
  return (
    <Flex direction="column" alignItems="center" w="100vw" p="5">
      <Heading>Recoil</Heading>
      <Text>The count value is: {count}</Text>
      CheckCircleIcon
      <Button
        mb={2}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        增加
      </Button>
      <Button
        mb={2}
        onClick={() => {
          resetCount();
        }}
      >
        重置
      </Button>
      <Icon as={Gi3DGlasses} boxSize={iconSize} />
      <Text>{iconSize}</Text>
    </Flex>
  );
};

export default RecoilDemo;
