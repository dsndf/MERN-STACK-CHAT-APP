import { Menu, MenuItem, MenuList } from '@mui/material'
import React from 'react'

const AttachFileMenu = ({anchorEle,open,closeHandler}) => {
  console.log({anchorEle});
  return (
   <Menu open={open} onClose={closeHandler} anchorEl={anchorEle} >
 <MenuList>
  <MenuItem>Item1</MenuItem>
  <MenuItem>Item2</MenuItem>
  <MenuItem>Item3</MenuItem>
 </MenuList>
   </Menu>
  )
}

export default AttachFileMenu
