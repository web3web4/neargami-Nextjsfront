import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Logo.module.css";
//import Image from "next/image";
//import logo from "@/app/assets/images/brand/Logo/With-BG/Light/Logo-1.png";
interface Props {
  width?: string;
  height?: string;
}

export const Logo: React.FC<Props> = () => {
  return (
    <Flex direction="row" align="center" gap={4}>
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        className={classes.heading}
      >
        <Text fw="bolder" size="xl">
          NearGami Admin
        </Text>

      </Link>
    </Flex>
  );
};
