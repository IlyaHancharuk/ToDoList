import React, { memo } from 'react';
import { FilterType } from '../types';
import Button from "@mui/material/Button";

type FilterButtonPropsType = {
    todoId: string;
    filter: FilterType;
    color: "secondary" | "primary" | "inherit" | "success" | "error" | "info" | "warning";
    innerText: string;

    changeTodoListFilter(): void
}

export const FilterButton: React.FC<FilterButtonPropsType> = memo((props) => {
    console.log("render")
    return (
        <Button variant="contained"
                size="small"
                color={props.color}
                onClick={props.changeTodoListFilter}
        >
            {props.innerText}
        </Button>
    )
});
