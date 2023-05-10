import React, { FC, memo, useState } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

type AddItemFormPropsType = {
    maxLength: number;
    addINewItem: (title: string) => void;
}

const AddItemForm: FC<AddItemFormPropsType> = memo(({ maxLength, addINewItem }) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addItem = () => {
        addINewItem(title);
        setTitle('');
    };
    const changeTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.trimStart();
        text.length > maxLength ? setError(true) : setError(false);
        setTitle(text);
    };
    const onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItem();
    };

    const userErrorMessage = title.length > maxLength && <div className="error-message">Task title is to long!</div>;
    const isAddBtnDisable = title === '' || error;

    return (
        <div className="addItemForm">
                <TextField
                    label='Title'
                    helperText = {userErrorMessage}
                    placeholder="Enter your task title"
                    size="small"
                    margin="dense"
                    value={title}
                    error={error}
                    onChange={changeTaskTitle}
                    onKeyDown={onEnterHandler}
                     />
                <IconButton onClick={addItem} disabled={isAddBtnDisable} color="primary">
                    <AddTaskIcon />
                </IconButton>
            </div>
    );
});

export default AddItemForm;
