import React from "react";
import Taskslist from "./Taskslist";
import { FilterType, TasksType } from "../types";
import SuperEditableSpan from "./SupetEditableSpan/SuperEditableSpan";
import AddItemForm from "./AddItemForn";

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

    const setFilterAllBtnClasses = `${props.filter === 'all' ? 'active-filter-btn' : ''} btn`;
    const setFilterActiveBtnClasses = `${props.filter === 'active' ? 'active-filter-btn' : ''} btn`;
    const setFilterComplitedBtnClasses = `${props.filter === 'completed' ? 'active-filter-btn' : ''} btn`;

    return (
        <div className="Todolist">
            
            <h3>
                <SuperEditableSpan
                    value={props.title}
                    onChangeText={changeTodoListTitle}
                />
                <button className="btn" onClick={removeTodoList}>X</button>
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
                <button className={setFilterAllBtnClasses} onClick={handlerToFilterCreator('all')}>All</button>
                <button className={setFilterActiveBtnClasses} onClick={handlerToFilterCreator('active')}>Active</button>
                <button className={setFilterComplitedBtnClasses} onClick={handlerToFilterCreator('completed')}>Complited</button>
            </div>
        </div>
    )
}

export default Todolist;
