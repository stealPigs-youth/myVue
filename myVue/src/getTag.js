import {getASTNode} from './ASTNode'
export function getTag(templateStrHTML){
    let tagRE=/\<(.+?)\>/
    let toArrRE=/\s+/
    let matchArr
    let nodeStack=[]
    let selStack=[]
    let flag=0
    while(templateStrHTML.length!==0){
        matchArr=templateStrHTML.match(tagRE)
        // 生成文本节点
        if(matchArr[1][0]==='/'){
            let text=templateStrHTML.substring(0,matchArr['index'])
            text=text.trim()
            if(text.length!==0){
                let ASTText=getASTNode(3,text,undefined,undefined,{key:'text'})
                nodeStack.push(ASTText)
            }
            let elementIndex=selStack.pop()
            while(nodeStack.length>(elementIndex+1)){
                let childASTNode=nodeStack.pop()
                nodeStack[elementIndex].children.unshift(childASTNode)
            }
        }
       
        // 判断是否需要生成元素节点
        if(matchArr[1][0]!=='/'){
            if(flag===1){
                
                let text=templateStrHTML.substring(0,matchArr['index'])
                text=text.trim()
                if(text.length!==0){
                    let ASTText=getASTNode(3,text,undefined,undefined,{key:'text'})
                    nodeStack.push(ASTText)
                }
            }
            flag=1
            let splitArr=matchArr[1].split(toArrRE)
            let attribute={}
            for(let i=splitArr.length-1;i>0;i--){
                let keyAndValue=splitArr[i].split('=')
                attribute[keyAndValue[0]]=keyAndValue[1]
            }
            let ASTNode=getASTNode(1,undefined,splitArr[0],[],attribute)
            let nodeStackLength=nodeStack.push(ASTNode)
            selStack.push(nodeStackLength-1)
        }
        templateStrHTML=templateStrHTML.substring(matchArr['index']+matchArr[0].length)
    }
    return nodeStack[0]
}