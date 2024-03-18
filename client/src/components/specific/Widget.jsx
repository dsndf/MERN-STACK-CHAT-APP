import React from 'react'
import { AdminStyledPaper } from '../style/StyleComponent'
import { Box, Stack } from '@mui/material'

const Widget = ({count,title,icon}) => {
  return (
     <AdminStyledPaper elevation={3} sx={{flexGrow:1, display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
     <Box borderRadius={"100%"} border={"3px solid hotpink"} p={"3rem"} textAlign={"center"}>{count}</Box>
     <Stack  width={"100%"} direction={'row'}  gap={'15px'} >{icon} {title}</Stack>
     </AdminStyledPaper>
  )
}

export default Widget;
