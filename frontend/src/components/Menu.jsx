import { Avatar, Box, Divider, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCalendarTodoLine, RiCalendarTodoFill } from "react-icons/ri";
import { FaPlus, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { UserState } from '../context/UserProvider';  
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { user } = UserState();
  return (
    <VStack
      justifyContent="space-evenly"
      alignItems="center"
      w="20%"
      h="100vh"
      borderRightWidth={2}
    >
      <HStack w="100%" alignItems="center" mb="30px" px={10}>
        <Avatar w="35px" h="35px" mr="10px" name={user && user.name} />
        <Text fontSize="xl" fontWeight="bold">
          {user && user.name}
        </Text>
      </HStack>

      <VStack w="100%">
        <HStack mb="5px" bg="blueviolet" w="100%" py={2} px={10} color="white">
          <RiCalendarTodoLine
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
          />
          <Text>Today</Text>
        </HStack>
        <HStack mb="5px" w="100%" py={2} px={10} _hover={{ bg: "lightgrey" }}>
          <RiCalendarTodoFill
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
          />
          <Text>All</Text>
        </HStack>
      </VStack>
      <div style={{ width: "98%", borderWidth: "1px" }}></div>

      <HStack w="100%" py={2} px={5} justifyContent="space-between">
        <Text fontWeight="bold" fontSize="2xl">
          My List
        </Text>
        {/* <IconButton icon={<FaPlus />} /> */}
      </HStack>
      <VStack w="100%" height="125px">
        <Text
          w="100%"
          py={1}
          px={10}
          fontWeight="semibold"
          fontSize="lg"
          _hover={{ bg: "lightgrey" }}
        >
          Personal
        </Text>
        <Text
          w="100%"
          py={1}
          px={10}
          fontWeight="semibold"
          fontSize="lg"
          color="white"
          bg={"blueviolet"}
        >
          Work
        </Text>
        <Text
          w="100%"
          py={1}
          px={10}
          fontWeight="semibold"
          fontSize="lg"
          _hover={{ bg: "lightgrey" }}
        >
          Education
        </Text>
      </VStack>

      <div style={{ width: "98%", borderWidth: "1px" }}></div>

      <VStack w="100%">
        <HStack mb="5px" w="100%" py={2} px={10}>
          <FaRegCheckCircle
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
          />
          <Text>Completed</Text>
        </HStack>
        <Link to="/trash" style={{ width:"100%"}} >
          <HStack mb="5px" w="100%" py={2} px={10} _hover={{ bg: "lightgrey" }}>
            <FaTrashAlt
              style={{ width: "25px", height: "25px", marginRight: "10px" }}
            />
            <Text>Trash</Text>
          </HStack>
        </Link>
      </VStack>

      <div style={{ width: "98%", borderWidth: "1px" }}></div>
    </VStack>
  );
}

export default Menu