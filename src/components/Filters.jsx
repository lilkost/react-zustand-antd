import { Button, Flex, Input, Space } from "antd"
import { SearchOutlined } from '@ant-design/icons';
import { useFilter, useSearch } from "../store";

const Filters = () => {
    const {filter, setFilter} = useFilter()
    const {search, setSearch} = useSearch();
    return (
        <Flex 
            align="center" 
            wrap="wrap" 
            justify="space-between"
            gap="small"
            style={{marginBottom: '1rem'}}
        >
            <Space>
                <Input 
                    placeholder="Поиск"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button 
                    shape="circle" 
                    type="primary"
                >
                    <SearchOutlined />
                </Button>
            </Space>

            <Space>
                <Button type={filter === 'all' ? 'primary' : 'default'} onClick={()=>setFilter('all')}>Все</Button>
                <Button type={filter === 'completed' ? 'primary' : 'default'} onClick={()=>setFilter('completed')}>Завершеные</Button>
                <Button type={filter === 'nocompleted' ? 'primary' : 'default'} onClick={()=>setFilter('nocompleted')}>Не завершеные</Button>
            </Space>
        </Flex>
    )
}

export default Filters