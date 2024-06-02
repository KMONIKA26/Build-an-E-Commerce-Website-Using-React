import React, { usecontext } from "react";
import { Link, useNavigate} from "react-router-dom";
import{AuthContext} from "../Context/AuthContext";
import {Box, Flex, Text, Spacer, Button} from "@chakra-ui/react";

const Navbar = () => {
    const {logout,authstate} = usecontext(AuthContext);
    const navigate = useNavigate();
    const handlelogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box bg="gray.800" p={4} color="white">
            <Flex justify="space-between" align="center">
                {authstate.isAuthenticated ? (
                    <>
                        <text>{authstate.Email}</text>
                        <Flex>
                            <link to="/home">
                                <button variant="link" colourScheme="teal" mr={4}>Home</button>
                            </link>
                            <button onClick={handlelogout} colourScheme="red">Logout</button>   
                        </Flex>
                    </>
                ) : (
                    <Link to="/login">
                        <button colourScheme="teal">Login</button>
                    </Link>
                )}
            </Flex>
        </Box>
    );

};

export default Navbar;
