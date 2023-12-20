import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill out all required fields",
        status: "warning",
        duration: "1500",
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(`http://localhost:8000/api/user/login`, { email, password }, config)
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userData", JSON.stringify(data));
      setLoading(false)
      navigate("/MainPage");
    }
    catch (error) {
      console.log(error)
        toast({
          title: `${error.response.data.message}`,
          status: "warning",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      setLoading(false)
    }

  };

  return (
    <>
      <Flex w="100%" h="100%">
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
          p={20}
          pt="100px"
        >
          <Text fontSize="3xl" fontWeight="semibold" mr="auto" mb="20px">
            Login
          </Text>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              borderWidth={1}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                borderWidth={1}
              />
              <InputRightElement>
                {showPassword ? (
                  <IoMdEye
                    onClick={togglePasswordVisibility}
                    style={{ weight: "100px", color: "blue" }}
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={togglePasswordVisibility}
                    style={{ weight: "100px", color: "blue" }}
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            w="100%"
            mt="10px"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Login with Email
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link
              to="/"
              style={{
                color: "blue",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Signup
            </Link>
          </Text>
        </VStack>
        <Stack
          w={"50%"}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
        >
          <Image
            src="../src/images/background1.jpg"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
