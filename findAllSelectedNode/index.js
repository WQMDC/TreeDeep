function deep (arr, targetId) {
    let parents = [];
    arr.forEach(item => {
        let parent = null;
        if(item.id === targetId) {
            parent = item.id
        }else {
            if(item.children && item.children.length !== 0) {
                parents.push(item.id);
                parent = deep(item.children, targetId)
            }
        }

        if(parent && parent !== undefined) {
            if(parent instanceof Array) {
                if( parent.length !== 0) {
                    parents = parents.concat(parent)
                }else {
                    parents = [];
                }
            }else {
                parents.push(parent)
            }
        }
    })
    return parents;
}

const a = [{
    id: '1',
    name: '1Name',
    children: [
        {
            id: '1-1',
            name: '1-1Name',
            children: [
                {
                    id: '1-1-1',
                    name: '1-1-1Name',
                },
                {
                    id: '1-1-2',
                    name: '1-1-2Name',
                },
                {
                    id: '1-1-3',
                    name: '1-1-3Name',
                }
            ]
        },
        {
            id:'1-2',
            name: '1-2Name',
            children: [
                {
                    id: '1-2-1',
                    name: '1-2-1Name',
                },
                {
                    id: '1-2-2',
                    name: '1-2-2Name',
                },
                {
                    id: '1-2-3',
                    name: '1-2-3Name',
                }
            ]
        }
    ]
},{
    id: '2',
    name: '2Name',
    children: [{
        id: '2-1',
        name: '2-1Name',
        children: [
            {
                id: '2-1-1',
                name: '2-1-1Name'
            }
        ]
    }]
}]
const currentId = '2-1-1';
const aDeep = deep(a, currentId);
console.log(aDeep);