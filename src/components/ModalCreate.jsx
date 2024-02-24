import { Modal, Input, Form, Button, Flex, Rate } from "antd";
import { useTodos } from "../store";

const ModalCreate = ({open, setOpen}) => {
    const createTodo = useTodos(state => state.createTodos)
    const [form] = Form.useForm()
    const onFinish = (values) => {
        createTodo(values.title, values.body, values.rate)
        setOpen(!open);
    }

    const closeForm = (form) => {
        form.resetFields()
        setOpen(!open) 
    }

    return (
        <Modal 
        
            title="Создать"
            onCancel={()=>closeForm(form)}
            onOk={()=>closeForm(form)}
            open={open}
            footer={[]}
        >
            <Form
                name="form-create"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item 
                    name="title"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: 'Данное поле обязательно'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="body"
                    label="Описание"
                    rules={[
                        {
                            required: true,
                            message: 'Данное поле обязательно'
                        }
                    ]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item name="rate" label="Важность"
                    rules={[
                        {
                            required: true,
                            message: 'Данное поле обязательно'
                        }
                    ]}
                >
                    <Rate/>
                </Form.Item>
                <Form.Item>
                    <Flex gap="small">
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                        <Button type="default" htmlType="reset">
                            Очистить поля
                        </Button>
                    </Flex>

                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalCreate