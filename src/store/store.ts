
import { combineReducers, legacy_createStore as createStore } from 'redux';
import { todoListsReducer } from './reducers/todoListsReducer';
import { tasksReducer } from './reducers/tasksReducer';

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListsReducer
})



export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;

// @ts-ignore
window.store = store;

