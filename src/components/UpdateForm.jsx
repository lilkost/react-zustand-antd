import { Input, Form, Button, Flex, Rate } from "antd";
import { useTodos } from "../store";

const UpdateForm = ({openUpdate, setOpenUpdate, todo}) => {
    const updateData = useTodos(state=>state.updateData)
    const onFinish = (values) => {
        updateData(values.title, values.body, values.rate, todo[0].id)
        setOpenUpdate(!openUpdate);
    }
    
    const initialValues = {
        title: todo[0].title,
        body: todo[0].body,
        rate: todo[0].rate
    }
    return (
        <Form
        name="form-update"
        onFinish={onFinish}
        initialValues={initialValues}
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
            <Input value={todo[0].title} />
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
        <Form.Item name="rate" label="Сложность"
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
    )
}

export default UpdateForm