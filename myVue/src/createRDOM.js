export function createRDOM(VDOM){
    let RDOM
    if(VDOM.tag===1){
         // 创建一个元素节点，并且每一个子节点进行遍历递归，之后把子元素加入父元素中 
        RDOM=document.createElement(VDOM.sel)
        VDOM.elm=RDOM
        for(let i=0;i<VDOM.children.length;i++){
            RDOM.appendChild(createRDOM(VDOM.children[i]))
        }
    }
         
    if(VDOM.tag===3){
        // 创建一个文本节点，并且返回
        RDOM=document.createTextNode(VDOM.text)
        VDOM.elm=RDOM
    }
    return RDOM
}