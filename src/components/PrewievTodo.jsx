import { CheckOutlined, DislikeOutlined } from "@ant-design/icons";
import {Modal, Typography, Divider, Flex, Rate, Button} from "antd";
import { useTodos } from "../store";
import UpdateForm from "./UpdateForm";
import {AnimatePresence, motion} from 'framer-motion';
import { useState } from "react";

const PrewievTodo = ({open, todoElem, setOpen}) => {
    const updateCompleted = useTodos(state=>state.updateCompleted)
    const todo = useTodos(state=> state.todos.filter(todo=> todo.id === todoElem))
    const [openUpdate, setOpenUpdate] = useState(false);

    return (
        <Modal open={open}
            title={
                <Typography.Title 
                    level={4} 
                    style={{margin: 0}}
                    copyable
                >
                    {todo[0].title}
                </Typography.Title>
            }
            onCancel={()=>setOpen(!open)}
            footer={[]}
        >
            <Divider></Divider>
            <Typography.Paragraph
                ellipsis={{
                    rows: 1,
                    expandable: true,
                    
                }}
            >
                {todo[0].body}
            </Typography.Paragraph>
            <Flex align="center" gap="small" style={{marginBottom: '1rem'}}>
                Важность: 
                <Rate defaultValue={todo[0].rate} disabled/>
            </Flex>
            <Flex align="center" justify="space-between" style={{width: '100%', marginBottom: '1rem'}} gap="small">
                <Flex align="center" gap="small">
                    <Typography.Text type={todo[0].completed ? 'success' : ''}>
                        Выполнение:
                    </Typography.Text>
                    <Button 
                        shape="circle"
                        onClick={() => (updateCompleted(todo[0].id), todo[0].completed = !todo[0].completed )}
                    >
                        {todo[0].completed ? <CheckOutlined /> : <DislikeOutlined />}
                    </Button>
                </Flex>
                <Button 
                    type="primary"
                    onClick={()=> setOpenUpdate(!openUpdate)}
                >
                    {!openUpdate ? 'Изменить' : 'Скрыть'}
                </Button>
            </Flex>
            <AnimatePresence>
                {openUpdate && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <UpdateForm 
                        openUpdate={openUpdate}
                        setOpenUpdate={setOpenUpdate}
                        todo={todo}
                    />
                </motion.div>}
            </AnimatePresence>
        </Modal>
    )
}

export default PrewievTodo