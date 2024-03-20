import { useState } from "react"

export const useDialog = ({ value = false, onCloseFunction, onOpenFunction }) => {
    const [open, setOpen] = useState(value);

    const openHandler = () => {
        setOpen(true);
        if (onOpenFunction) {
            onOpenFunction();
        }
    }
    const closeHandler = () => {
        if (onCloseFunction) {
            onCloseFunction();
        }
        setOpen(false);
    }
    return { open, openHandler, closeHandler };
}

