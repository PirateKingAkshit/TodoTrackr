import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { FiEdit3 } from "react-icons/fi";
import { UserState } from "../context/UserProvider";
import { useDispatch,useSelector } from "react-redux";
import { addTodo, fetchTodos, updateTodo } from "../redux/reducers/todoSlider";
import { Tooltip } from '@chakra-ui/tooltip';


const TodoList = () => {
  const { user, myList} = UserState();
  const [content, setContent] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, error,todos } = useSelector((state) => state.todos)
  const toast = useToast();
  const [editItemId, setEditItemId] = useState(null);
  const [updateContent, setUpdateContent] = useState("");
  

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos(user._id));
    }
  }, [dispatch, user]);



  const addTask = () => {
    dispatch(addTodo(content, myList, user))
    setContent("")
    onClose();
  }

  
  const handleEdit = (id) => {
    setEditItemId(id)
    
  }
  
  const handleUpdate = (todoListId) => {
    dispatch(updateTodo(todoListId, updateContent, user));
    setUpdateContent("")
    setEditItemId("");
  };

  const toggleTodo = (id) => {
      
    
  }

  if (error) {
    console.log(error)
    // toast({
    //   title: `${error.response.data.message}`,
    //   status: "warning",
    //   duration: 1500,
    //   isClosable: true,
    //   position: "top",
    // });
    return
  }

  

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
          !todo.isTrash ? (
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
                {editItemId === todo._id ? (
                  <>
                    <Input
                      type="text"
                      w="85%"
                      value={updateContent}
                      onChange={(e) => {
                        setUpdateContent(e.currentTarget.value);
                      }}
                    />

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      w="13%"
                      alignItems="center"
                    >
                      <Tooltip
                        label="Update"
                        placement="top"
                        aria-label="Update tooltip"
                      >
                        <IconButton
                          isLoading={isLoading}
                          size="sm"
                          icon={<GrUpdate />}
                          onClick={() => handleUpdate(todo._id)}
                        />
                      </Tooltip>
                      <Tooltip
                        label="Move to Trash"
                        placement="right"
                        aria-label="Trash tooltip"
                      >
                        <IconButton
                          size="sm"
                          icon={<FaRegTrashCan />}
                          onClick={() => handleTrash(todo._id)}
                        />
                      </Tooltip>
                    </Box>
                  </>
                ) : (
                  <>
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
                        label="Edit"
                        placement="top"
                        aria-label="Edit tooltip"
                      >
                        <IconButton
                          size="sm"
                          icon={<FiEdit3 />}
                          onClick={() => handleEdit(todo._id)}
                        />
                      </Tooltip>
                      <Tooltip
                        label="Move to Trash"
                        placement="right"
                        aria-label="Trash tooltip"
                      >
                        <IconButton
                          size="sm"
                          icon={<FaRegTrashCan />}
                          onClick={() => handleTrash(todo._id)}
                        />
                      </Tooltip>
                    </Box>
                  </>
                )}
              </Box>
            </>
          ) : (
            <></>
          )
        )}
      </VStack>

      <Button
        bg="transparent"
        color="GrayText"
        w="50%"
        bgColor="transparent"
        borderWidth={2}
        pr={4}
        ml={10}
        onClick={onOpen}
      >
        <FaPlus style={{ marginRight: "10px" }} /> Add Task
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.currentTarget.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={addTask} colorScheme="blue" isLoading={isLoading}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default TodoList;
