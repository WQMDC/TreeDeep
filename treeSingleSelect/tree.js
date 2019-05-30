const data = [
    {
        "id": "1",
        "selected": false,
        "expand": false,
        "children": [
            {
                "id": "1-1",
                "selected": false,
                "expand": false,
                "children": [
                    {
                        "id": "1-1-1",
                        "selected": false,
                        "expand": false
                    },
                    {
                        "id": "1-1-2",
                        "selected": false,
                        "expand": false
                    },
                    {
                        "id": "1-1-3",
                        "selected": false,
                        "expand": false
                    }
                ]
            },
            {
                "id": "1-2",
                "selected": false,
                "expand": false
            },
            {
                "id": "1-3",
                "selected": false,
                "expand": false,
                "children": [
                    {
                        "id": "1-3-1",
                        "selected": false,
                        "expand": false
                    },
                    {
                        "id": "1-3-2",
                        "selected": false,
                        "expand": false
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        selected: false,
        expand: false,
        children: [{
            id: '2-1',
            selected: false,
            expand: false,
            children: [{
                id: '2-1-1',
                selected: false,
                expand: false
            }]
        }, {
            id: '2-2',
            selected: false,
            expand: false
        }]
    }
];

const selectedNode = '2';

/**
 * 
 * Note: 此方法会直接修改传入的数组对象，并未对传入对象做拷贝
 * 
 * @param {Object} treeData 当前树节点数组
 * @param {String} selectedNode 当前选中的节点ID 
 */
const traverseNode = (treeData, selectedNode) => {
    let nodeStatus = false;
    for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].id === selectedNode) {
            // 当前对象为选中对象,更改选中状态，并立即通知父节点，不再查找其他节点，此同级节点循环结束
            setSelectedNodeStatus(treeData[i]);
            return true;
        } else if (treeData[i].children && treeData[i].children.length !== 0) {
            // 判断当前节点下是否有子节点
            nodeStatus = traverseNode(treeData[i].children, selectedNode);

            // 根据查找状态，更改父节点选中状态
            if (nodeStatus) {
                setSelectedNodeStatus(treeData[i]);
                return nodeStatus;
            } else {
                setUnselectedNodeStatus(treeData[i]);
            }
        }else {
            // 当前未匹配到选中节点，并且也不存在子节点时，设置本身状态，并通知父节点，但需要查找其他节点是否满足条件
            setUnselectedNodeStatus(treeData[i]);
            nodeStatus = false;
        }
    }
    return nodeStatus
}

const setSelectedNodeStatus = (node) => {
    return Object.assign(node, {
        selected: true,
        expand: true
    })
}

const setUnselectedNodeStatus = (node) => {
    return Object.assign(node, {
        selected: false,
        expand: false
    })
}

// traverseNode(data, selectedNode);

// console.log(data, 'current node is 2');

traverseNode(data, '1-1');

console.log(data, 'current node is 1-1');

traverseNode(data, '2-1-1');

console.log(data, 'current node is 2-1-1');