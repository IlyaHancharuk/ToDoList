import React, { FC, useState } from "react";
import SuperInputText from "./SupetInputText/SuperInputText";

type AddItemFormPropsType = {
    maxLength: number;
    addINewItem: (title: string) => void;
}

const AddItemForm: FC<AddItemFormPropsType> = ({
    maxLength,
    addINewItem
}) => {
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
    }

    const userErrorMessage = title.length > maxLength && <div className="error-message">Task title is to long!</div>;
    const isAddBtnDisable = title === '' || error;
    const inputClasses = `input ${error && 'error-input'}`;

    return (
        <div className="addItemForm">
                <SuperInputText 
                   className={inputClasses}
                   type="text"
                   placeholder="Enter your task title"
                   value={title}
                   onChange={changeTaskTitle}
                   onKeyDown={onEnterHandler} />
                <button className="btn" onClick={addItem} disabled={isAddBtnDisable}> + </button>
                {userErrorMessage}
            </div>
    );
};

export default AddItemForm;
