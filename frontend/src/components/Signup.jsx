import {
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
import { Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
          toast({
            title: "Please fill out all required fields",
            status: "warning",
            duration: "1500",
            isClosable: true,
            position: "top-left",
          });
          return;
        }

        if (password !== confirmPassword) {
            toast({
              title:"Passwords do not match" ,
              status:"warning",
              duration:"1500",
              isClosable: true,
              position:"top-left",
            });
            return
        }
    }

  return (
    <>
      <Flex w="100%" h="100%">
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
          p={20}
          pt="100px"
        >
          <Text fontSize="3xl" fontWeight="semibold" mr="auto" mb="20px">
            Sign Up
          </Text>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              borderWidth={1}
            />
          </FormControl>
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
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                borderWidth={1}
              />
              <InputRightElement>
                {showConfirmPassword ? (
                  <IoMdEye
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ weight: "100px", color: "blue" }}
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ weight: "100px", color: "blue" }}
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            p={5}
            colorScheme="blue"
            w="100%"
            mt="10px"
            onClick={handleSubmit}
          >
            Sign up with Email
          </Button>
          <Text>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "blue",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Text>
        </VStack>
        <Stack
          w={"50%"}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
        >
          <Image
            src="../src/images/background.jpg"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Stack>
      </Flex>
    </>
  );
};

export default Signup;
