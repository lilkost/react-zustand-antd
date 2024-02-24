import { Typography, Button, Flex } from "antd"
import ModalCreate from "./ModalCreate";
import { useState } from "react";


const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <header className="header">
            <Flex align="center" justify="space-between">
                <Typography.Title level={3} className="header__title">
                    Todo's
                </Typography.Title>
                <Button type="primary"
                    onClick={() => setOpen(!open)}
                >
                    Создать
                </Button>
            </Flex>
            <ModalCreate open={open} setOpen={setOpen}/>
        </header>
    )
}

export default Header