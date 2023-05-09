import { v1 } from 'uuid';
import { FilterType, TodoListType } from '../types';
import { AddTodoListACType, ChangeTodoListFilterACType, ChangeTodoListTitleACType, RemoveTodoListACType, addTodoListAC, removeTodoListAC, todoListsReducer } from './todoListsReducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;
let newTodolistTitle: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = "New Todolist";

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ];
})

test('correct todolist should be removed', () => {
    const action: RemoveTodoListACType = removeTodoListAC(todolistId1);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});



test('correct todolist should be added', () => {
    const action: AddTodoListACType = addTodoListAC(newTodolistTitle);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its title', () => {
    const action: ChangeTodoListTitleACType = {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            newTitle: newTodolistTitle,
            todoListId: todolistId2
        }
    }
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterType = "completed";
    const action: ChangeTodoListFilterACType = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId: todolistId2,
            filter: newFilter
        }
    };
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
