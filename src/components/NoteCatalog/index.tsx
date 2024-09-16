import { Tree, Button, Space } from '@arco-design/web-react'
import { IconDown, IconDragArrow, IconFolder, IconDriveFile } from '@arco-design/web-react/icon'
import { useEffect, useState } from 'react'
import './index.less'
const TreeNode = Tree.Node

interface TreeNodeType {
    id: number
    name: string
    parent_id: number
    type: 'catalog' | 'note'
    children: TreeNodeType[]
    content: string
}
function convertToTree(data: TreeNodeType[]): TreeNodeType[] {
    const tree: { [id: number]: TreeNodeType } = {}
    data.forEach((item: TreeNodeType) => {
        if (!tree[item.id]) {
            tree[item.id] = { ...item, children: [] }
        }
        if (item.parent_id !== 0) {
            if (!tree[item.parent_id]) {
                tree[item.parent_id] = { id: item.parent_id, name: item.name, parent_id: item.parent_id, type: item.type, children: [], content: item.content }
            }
            tree[item.parent_id].children.push(tree[item.id])
        }
    })
    return tree[1].children as TreeNodeType[] // 根目录的ID为1
}

function NoteCatalog() {
    const [treeData, setTreeData] = useState<TreeNodeType[]>()
    const [treeDataSource, setTreeDataSource] = useState<TreeNodeType[]>()
    const fetchTreeData = async () => {
        let result = await window.ipcRenderer.invoke('get-catalog')
        console.log('yuansshi获取数据', result)
        setTreeDataSource(result.data)
        let treeTemp = convertToTree(result.data)
        console.log('获取数据', treeTemp)
        setTreeData(treeTemp)
    }

    const handleAddCatalog = async () => {
        let onecatalog: TreeNodeType = {
            id: 0,
            name: '新目录',
            parent_id: 0,
            type: 'catalog',
            children: [],
            content: ''
        }
        let result = await window.ipcRenderer.invoke('add-catalog', JSON.stringify(onecatalog))
        console.log('result', result)
    }
    const handleSelect = (selectedKeys: string[]) => {
        let item = treeDataSource?.find(item => item.id === Number(selectedKeys[0]))
        console.log('value', item)
    }

    useEffect(() => {
        fetchTreeData()
    }, [])
    return (
        <div>
            <Space>
                <Button size="mini" type="primary" onClick={handleAddCatalog}>
                    添加目录
                </Button>
                <Button size="mini" type="primary">
                    添加文章
                </Button>
            </Space>
            <Tree
                className={'note_catalog'}
                treeData={treeData}
                fieldNames={{
                    key: 'id',
                    title: 'name',
                    children: 'children'
                }}
                icons={{ switcherIcon: <IconFolder /> }}
                showLine
                onSelect={handleSelect}
            ></Tree>
        </div>
    )
}

export default NoteCatalog
