import { useState } from "react"

export const useDialog = ({ onCloseFunction = () => { }, onOpenFunction = () => { } }) => {
    const [open, setOpen] = useState(false);

    const openHandler = () => {
        setOpen(true);
        onOpenFunction();
    }
    const closeHandler = () => {
        setOpen(false);
        onCloseFunction();
    }
    return { open, openHandler, closeHandler };
}

