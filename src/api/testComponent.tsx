import React, { useEffect, useState } from 'react'
import { createTask, createTodolist, deleteTask, deleteTodolist, getTasks, getTodolists, updateTaskTitle, updateTodolistTitle } from './todolistAPI'

export const GetTodolists = () => {
    
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        createTodolist('___4 TODO___')
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        deleteTodolist('99d0fe6e-83d3-410a-b3c4-0402caca17ba')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        updateTodolistTitle('5dbe2864-8fb2-45fe-855e-de159cea8a5f', '_/-WHAT TO BUY_/-')
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        getTasks('5dbe2864-8fb2-45fe-855e-de159cea8a5f').then(res => {
            setState(res.data.items)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        createTask('5dbe2864-8fb2-45fe-855e-de159cea8a5f', 'beer').then(res => {
            setState(res.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        deleteTask('5dbe2864-8fb2-45fe-855e-de159cea8a5f', '9a13cd74-b08c-4dca-8fb0-6f517c1d359c')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        updateTaskTitle('5dbe2864-8fb2-45fe-855e-de159cea8a5f', 'ab2eec14-4d46-492a-8536-68b2645681cc', 'cheese').then(res => {
            setState(res.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
