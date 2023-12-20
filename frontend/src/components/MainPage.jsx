import { Box } from '@chakra-ui/react'
import React from 'react'
import Menu from './Menu'
import TodoList from './TodoList'

const MainPage = () => {
  return (
      <Box
          display="flex"
          w="100%"
      >
          {/* <Menu /> */}
          <TodoList/>
          
    </Box>
  )
}

export default MainPage