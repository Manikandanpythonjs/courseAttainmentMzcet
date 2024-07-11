import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MzcetLogo from '../assets/Mount-2.png'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour12: true });
  };
  return (
    <>
      <Box
        className="fixed z-50 top-0  "
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        py={4}
        boxShadow={"lg"}
        width={"100%"}
      >
        <Flex h={70} alignItems={"center"} justifyContent={"space-between"}>
          <Image boxSize={100} objectFit={"contain"} src={MzcetLogo} alt="Dan Abramov" />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"start"} spacing={7}>
              {/* <Text className="font-semibold">{formatTime(time)}</Text> */}

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>


              {/* {CurrentUser && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} src={CurrentUser.photoURL} />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar size={"2xl"} src={CurrentUser.photoURL} />
                      </Center>
                      <br />
                      <Center>
                        <p>{CurrentUser.displayName}</p>
                      </Center>
                      <br />
                      <MenuDivider />
  
                      <MenuItem>
                        <Link to="/profile">Account Settings</Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/community">Nio Ai Community</Link>
                      </MenuItem>
                      <MenuItem onClick={() => signOut(auth)}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )} */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
