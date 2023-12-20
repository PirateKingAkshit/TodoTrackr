import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

import { MdOutlineDeleteForever, MdRestoreFromTrash } from "react-icons/md";
import { UserState } from "../context/UserProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/reducers/todoSlider";
import { Tooltip } from "@chakra-ui/tooltip";

const Trash = () => {
  const { user, myList } = UserState();
  const dispatch = useDispatch();
  const {  todos } = useSelector((state) => state.todos);
  const toast = useToast();


  useEffect(() => {
    if (user) {
      dispatch(fetchTodos(user._id));
    }
  }, [dispatch, user]);



  const handleRestore = (id) => {
    
  };


  const toggleTodo = (id) => {};

  

  return (
    <VStack w="100%" h="100vh" alignItems="start">
      <Box bg="blueviolet" w="100%" h="10%" p={3} color="white">
        <InputGroup>
          <Input
            type="search"
            placeholder="Search"
            sx={{ "&::placeholder": { color: "white" } }}
            p={1}
            borderWidth={2}
            borderColor="white"
            w="50%"
            borderRadius={10}
            pl={10}
            ml={10}
          />
          <InputLeftElement ml={10}>
            <TbSearch style={{ fontWeight: "bold" }} />
          </InputLeftElement>
        </InputGroup>
      </Box>
      <VStack p={5} w="100%" h="75%" overflowY="auto" alignItems="start">
        {todos.map((todo) =>
          todo.isTrash ? (
            <>
              <Box
                key={todo._id}
                w="55%"
                p={1}
                borderWidth={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderRadius={5}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    mr={2}
                    isChecked={todo.isCompleted}
                    onChange={() => {
                      toggleTodo(todo._id);
                    }}
                  />
                  <Text color="GrayText" alignItems="center">
                    {todo.content}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  w={{ lg: "15%", sm: "25%", md: "25%", base: "100%" }}
                  alignItems="center"
                >
                  <Tooltip
                    label="Restore"
                    placement="top"
                    aria-label="Edit tooltip"
                  >
                    <IconButton
                      size="sm"
                      icon={<MdRestoreFromTrash style={{fontSize:"23px"}} />}
                      onClick={() => handleRestore(todo._id)}
                    />
                  </Tooltip>
                  <Tooltip
                    label="Delete"
                    placement="right"
                    aria-label="Trash tooltip"
                  >
                    <IconButton
                      size="sm"
                      icon={<MdOutlineDeleteForever style={{fontSize:"23px"}} />}
                      onClick={() => handleDelete(todo._id)}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )
        )}
      </VStack>
    </VStack>
  );
};

export default Trash;
