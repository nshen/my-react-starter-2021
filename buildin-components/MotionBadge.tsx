import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Chakra UI + Framer Motion 动画
// https://chakra-ui.com/guides/integrations/with-framer
const FramerMotionBadge = motion<BadgeProps>(Badge);

type Props = {
  children: React.ReactNode;
};

const MotionBadge = ({ children }: Props) => {
  return (
    <FramerMotionBadge
      // from
      initial={{
        opacity: 0,
        y: 0,
      }}
      // to
      animate={{
        opacity: 1,
        y: -10,
        // how
        transition: {
          delay: 0.2,
          type: "spring",
          stiffness: 90,
          //   type: "tween",
          //   duration: 0.2,
        },
      }}
      colorScheme="green"
    >
      {children}
    </FramerMotionBadge>
  );
};

export default MotionBadge;
