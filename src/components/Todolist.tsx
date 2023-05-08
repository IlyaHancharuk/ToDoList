import React from "react";
import Taskslist from "./Taskslist";
import { FilterType, TasksType } from "../types";
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import AddItemForm from "./AddItemForn";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

type PropsToTodoType = {
    todoId: string;
    title: string;
    tasks: TasksType[];
    filter: FilterType;

    addTask: (todoListId: string, title: string) => void;
    removeTask: (todoListId: string, id: string) => void;
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void;

    addTodoList: (title: string) => void;
    changeTodoListFilter: (todoListId: string, filter: FilterType) => void;
    changeTodoListTitle: (todoListId: string, newTitle: string) => void;
    removeTodoList: (todoListId: string) => void;
}

const Todolist: React.FC<PropsToTodoType> = (props) => {
    const handlerToFilterCreator = (filter: FilterType) => () => props.changeTodoListFilter(props.todoId, filter);
    const addTask = (title: string) => props.addTask(props.todoId, title);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.todoId, title);
    const removeTodoList = () => props.removeTodoList(props.todoId);

    return (
        <div className="Todolist">
            
            <h3>
                <SuperEditableSpan
                    value={props.title}
                    onChangeText={changeTodoListTitle}
                />
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm
                maxLength={15}
                addINewItem={addTask}
            />
            <Taskslist
                todoId={props.todoId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-buttons">
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={handlerToFilterCreator('all')}>
                            All
                        </Button>
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={handlerToFilterCreator('active')}>
                            Active
                        </Button>
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={handlerToFilterCreator('completed')}>
                            Complited
                        </Button>
            </div>
        </div>
    )
}

export default Todolist;
