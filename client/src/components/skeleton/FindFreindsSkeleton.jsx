import { Dialog, DialogActions, List, ListItem, Skeleton } from '@mui/material'
import React from 'react'

const FindFreindsSkeleton = () => {
  return (
    <Dialog>
        <Skeleton variant='rectangular' width={'100%'} height={'1rem'} />
        <List>
            <ListItem>
                
                
            </ListItem>
            <Skeleton variant='rectangular' width={'100%'}  height={'1rem'} />
        </List>
        <DialogActions>
            <Skeleton variant='rectangular' width={'1rem'} height={'1rem'} />
        </DialogActions>
    </Dialog>
  )
}

export default FindFreindsSkeleton
