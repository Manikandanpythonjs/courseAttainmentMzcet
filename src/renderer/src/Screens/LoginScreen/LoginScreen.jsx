import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    Divider,
    Center,
    Icon,
    useToast,
    Image
} from "@chakra-ui/react";

import { Link, useNavigate, redirect } from "react-router-dom";

import { useState } from "react";

import Navbar from "../../Components/Navbar";
import Cookies from 'js-cookie';
import axios from 'axios';
export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [isGoogleDisable, SetisGoogleDisable] = useState(false);
    const [issmsDisable, SetissmsDisable] = useState(false);
    // const [formError, setFormError] = useState(false);
    const toast = useToast();
    const toasterr = useToast();
    const navigate = useNavigate();

    function handleError(errorMessage) {
        toasterr({
            title: "Error",
            description: errorMessage.toString(),
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            // setFormError(true);
            toast({
                title: "MZCET Course Attainment Portal",
                description: "The Fields Username and Password Are Required",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        } else {

            try {
                setLoggedIn(true);

                const response = await axios.post('http://localhost:5000/login', { username, password });
                console.log("username ", response.data.result[0].Staff_Id);

                if (response.status === 200 && response.data.result[0].Staff_Id === username && response.data.result[0].Password === password) {
                    Cookies.set('loggedIn', 'true');
                    localStorage.setItem('loggedIn', 'true')
                    setLoggedIn(true);
                    navigate('/home');
                } else {
                    console.log("Invalid username or password");
                    handleError('Invalid username or password');
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    console.log("Invalid username or password");
                    handleError('Invalid username or password');
                } else {
                    console.log(err.toString());
                }
            }


        }
    };



    return (
        <Box>
            <Navbar />
            <Box mt={155} />
            <Flex
                mt={-155}
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>

                    <Stack align={"center"}>

                        <Text fontSize={"3xl"} className="text-center" color={"gray.600"}>
                            <Text as={"span"} color={"orange.400"}>
                                MZCET {" "}


                            </Text>{" "}
                            Course Attainment Portal
                        </Text>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Stack spacing={3}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    {/* <Link to="/resetpassword" color={"blue.400"}>
                                    Forgot password?
                                </Link> */}
                                </Stack>
                                <Button
                                    isLoading={isloading}
                                    onClick={handlesubmit}
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Login
                                </Button>

                                <Divider />


                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Box>

    );
}
