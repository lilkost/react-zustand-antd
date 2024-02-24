import {useState} from 'react'
import {Divider, Typography, Flex, Button, Card, Badge } from 'antd';
import { useFilter, useSearch, useTodos } from '../store';
import PrewievTodo from './PrewievTodo';
import { DeleteOutlined } from '@ant-design/icons';
import Filters from './Filters';



const ListTodo = () => {
    const filter = useFilter(state=>state.filter);
    const search = useSearch(state=>state.search);

    const todos = useTodos((state) => {
        switch (filter) {
            case 'completed' : 
                return state.todos.filter(todo => todo.completed).filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
            case 'nocompleted' : 
                return state.todos.filter(todo => !todo.completed).filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
            default: 
                return state.todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
        }
    });

    const [todoElem, setTodoElem] = useState('');
    const deleteTodo = useTodos(state => state.deleteTodo);
    const [open, setOpen] = useState(false);

    const openModal = (id) => {
        setTodoElem(id);
        setOpen(!open);
    }

    return (
        <main className='main container'>
            <Divider orientation='left'>
                <Badge count={todos.length} overflowCount={5} offset={[5, 10]} size='small'>
                    <Typography.Title level={3} style={{margin: 0}}>
                        Список дел
                    </Typography.Title>
                </Badge>
            </Divider>
            <Filters/>
            <Flex 
                wrap
                gap="small"
                align='start'
                justify='start'
                vertical
            >
                {todos.map(todo=> (
                    <Card key={todo.id}
                        style={{width: '100%'}}
                    >
                        <Flex align='center' justify='space-between'>
                            <Typography.Text
                                style={{margin: 0}}
                                type={todo.completed ? 'success' : ''}
                            >
                                {todo.title}
                            </Typography.Text>
                            <Flex align='center' gap="small">
                                <Button type='primary' onClick={()=> openModal(todo.id)}>
                                    Посмотреть
                                </Button>
                                <Button shape='circle' onClick={()=>deleteTodo(todo.id)}>
                                    <DeleteOutlined />
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </Flex>
            {open && <PrewievTodo 
                open={open} 
                todoElem={todoElem} 
                setOpen={setOpen}
            />}

        </main>
    )
}

export default ListTodo