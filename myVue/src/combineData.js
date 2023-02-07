import { keyToValue } from "./keyToValue"
export function combineData(ast,proxyData){
    let getKeyRS=/\{\{(.+?)\}\}/g
    if(ast.tag===1){
        // 对AST的子元素进行递归    
        for(let i=0;i<ast.children.length;i++){
            combineData(ast.children[i],proxyData)
        }
    }
    if(ast.tag===3){
        // 进行数据替换
        ast.text=ast.text.replace(getKeyRS,function(match,argOne){
            return keyToValue(argOne,proxyData)
        })
    }
}