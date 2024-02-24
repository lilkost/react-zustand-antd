import { create } from "zustand";
import { nanoid } from "nanoid";
import {devtools, persist} from 'zustand/middleware'

export const useTodos = create(devtools(persist((set, get) => ({
    todos: [],

    createTodos: (title, body, rate) => {
        const newTodo = {
            id: nanoid(), 
            title, 
            body, 
            rate, 
            completed: false
        }
        set({todos: [...get().todos, newTodo]})
    },

    updateCompleted: (id) => set({
        todos: get().todos.map(
            todo => id === todo.id ? {...todo, completed: !todo.completed} : todo
        )
    }),

    updateData: (title, body, rate, id) =>set({
        todos: get().todos.map(
            todo => id === todo.id ? {...todo, 
                title: title.length === 0 ? todo.title : title, 
                body: body.length === 0 ? todo.body : body, 
                date: rate.length === 0 ? todo.rate : rate
            } : todo
        )
    }),

    deleteTodo: (id) => {
        set({todos: get().todos.filter(todo=> todo.id !== id)});
    }
}),{name: 'todos'})));

export const useFilter = create(set=>({
    filter: 'all',
    setFilter: (value) => set({filter: value})
}))

export const useSearch = create(set=>({
    search: '',
    setSearch: (value) => set({search: value})
}))