import React, { usecontext, useState} from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {Box, Button, Input, VStack, useToast} from "@chakra-ui/react";
import axios from "axios";

const LoginPage = () => {
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {login} = usecontext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://api.example.com/login', {
                email,
                password
            });
            login(response.data.token, response.data.email);
            navigate('/home');
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Please check your credentials and try again.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }   
    };

    return (
        <Box bg="gray.100" h="100vh" display="flex" justifyContent="center" alignItems="center">
            <VStack spacing={4}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleLogin}>
                    Login
                </Button>
                <Link to="/register">
                    <Button colorScheme="teal">Register</Button>
                </Link>
            </VStack>
        </Box>
    );
}; 

export default LoginPage;
   