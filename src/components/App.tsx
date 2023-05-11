import React, { useReducer } from 'react';
import { FilterType, TasksType } from '../types';
import './App.css';
import Todolist from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForn';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Paper } from '@mui/material';
import { tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../store/reducers/tasksReducer';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer } from '../store/reducers/todoListsReducer';

const App = () => {

    //BLL:
    const todoListId_1 = v1();
    const todoListId_2 = v1();

        //localState
    const [todoLists, todoListDispatch] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to lern', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todoListId_1]: [
            { id: v1(), title: 'HTML', isDone: true, },
            { id: v1(), title: 'CSS', isDone: true, },
            { id: v1(), title: 'JS', isDone: true, },
            { id: v1(), title: 'React', isDone: false, },
            { id: v1(), title: 'Rest API', isDone: false, },
            { id: v1(), title: 'GraphQL', isDone: false, },
        ],
        [todoListId_2]: [
            { id: v1(), title: 'Milk', isDone: false, },
            { id: v1(), title: 'Meat', isDone: false, },
            { id: v1(), title: 'Pepsi', isDone: false, },
            { id: v1(), title: 'Cheese', isDone: false, },
        ],
    });


    //methods for filter
    const getFiltredTasks = (tasks: TasksType[], filter: FilterType): TasksType[] => {
        if (filter === 'active') return tasks.filter(t => t.isDone === false);
        if (filter === 'completed') return tasks.filter(t => t.isDone === true);
        return tasks;
    }


    //methods for tasks
    const addTask = (todoListId: string, title: string) => {
        tasksDispatch(addTaskAC(todoListId, title));
    }
    const removeTask = (todoListId: string, id: string) => {
        tasksDispatch(removeTaskAC(todoListId, id));
    }
    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        tasksDispatch(changeTaskTitleAC(todoListId, id, newTitle));
    }
    const changeTaskStatus = (todoListId: string, id: string, status: boolean) => {
        tasksDispatch(changeTaskStatusAC(todoListId, id, status))
    }


    //methods for todolists
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);
        todoListDispatch(action);
        tasksDispatch(action);
    }
    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId);
        todoListDispatch(action);
        tasksDispatch(action);
    }
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        todoListDispatch(changeTodoListTitleAC(todoListId, newTitle));
    }
    const changeTodoListFilter = (todoListId: string, filter: FilterType) => {
        todoListDispatch(changeTodoListFilterAC(todoListId, filter));
    };


    //UI:
    const todoListComponents: JSX.Element[] | JSX.Element = todoLists.map(todo => {
        const filtredTasks = getFiltredTasks(tasks[todo.id], todo.filter);

        return (
            <Paper key={todo.id + '-paper'} style={{height: 'fit-content'}} elevation={5}>
                <Todolist
                    todoId={todo.id}
                    key={todo.id}
                    title={todo.title}
                    tasks={filtredTasks}
                    filter={todo.filter}

                    addTask={addTask}
                    // removeTask={removeTask}
                    // changeTaskStatus={changeTaskStatus}
                    // changeTaskTitle={changeTaskTitle}

                    addTodoList={addTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    removeTodoList={removeTodoList}
                />
            </Paper>
        )
    });

    return (
        <div className="App">
            <ResponsiveAppBar />
            <main className='main'>
                <div className='addTodoForm-container'>
                    <AddItemForm maxLength={15} addINewItem={addTodoList} />
                </div>
                <div className='todoLists-container'>
                    {todoListComponents}
                </div>
            </main>
        </div>
    );
}

export default App;
