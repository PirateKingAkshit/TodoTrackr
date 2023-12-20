import { Box, Image, Text } from "@chakra-ui/react"
import Signup from "./components/Signup"
import { Route, Routes } from "react-router-dom"
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import { UserState } from "./context/UserProvider";
import Menu from "./components/Menu";
import Trash from "./components/Trash";

function App() {
  const{user}=UserState()

  return (
    <Box w="100%" h="100vh" display="flex">
      {/* <Box
        w="100%"
        display="flex"
        alignItems="center"
        bg="blue.400"
        color="white"
      >
        <Image src="../src/checklist.png" w="35px" h="35px" />
        <Text fontSize="34px">TaskBlitz</Text>
      </Box> */}
      {user && <Menu />}
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Box>
  );
}

export default App
