import { createRDOM } from "./createRDOM"
export function diff(oldAst,newAst){
        let newAstChild=newAst.children
        let oldAstChild=oldAst.children
        let newPointHead=0
        let newPointTail=newAst.children.length-1
        let oldPointHead=0
        let oldPointTail=oldAst.children.length-1
        while(newPointHead<=newPointTail&&oldPointHead<=oldPointTail){
            // 对文本节点的处理
            if(newAstChild[newPointHead].tag===3&&oldAstChild[oldPointHead].tag===3){
                newAstChild[newPointHead].elm=oldAstChild[oldPointHead].elm
                newAstChild[newPointHead].elm.data=newAstChild[newPointHead].text
                newPointHead++
                oldPointHead++ 
                continue
            }
            if(newAstChild[newPointHead].tag===3&&oldAstChild[oldPointHead].tag===1){
                let RTextNode=createRDOM(newAstChild[newPointHead])
                oldAst.elm.insertBefore(RTextNode,oldAstChild[oldPointHead].elm)
                newPointHead++
                continue
            }
            if(newAstChild[newPointHead].tag===1&&oldAstChild[oldPointHead].tag===3){
                oldAst.elm.removeChild(oldAstChild[oldPointHead].elm)
                oldPointHead++
                continue
            }

            if(newAstChild[newPointTail].tag===3&&oldAstChild[oldPointTail].tag===3){
                newAstChild[newPointTail].elm=oldAstChild[oldPointTail].elm
                newAstChild[newPointTail].elm.data=newAstChild[newPointTail].text
                newPointTail--
                oldPointTail-- 
                continue
            }
            if(newAstChild[newPointTail].tag===3&&oldAstChild[oldPointTail].tag===1){
                let RTextNode=createRDOM(newAstChild[newPointTail])
                oldAst.elm.replaceChild(RTextNode,oldAstChild[oldPointTail].elm)
                oldAst.elm.insertBefore(oldAstChild[oldPointTail].elm,RTextNode)
                newPointTail--
                continue
            }
            if(newAstChild[newPointTail].tag===1&&oldAstChild[oldPointTail].tag===3){
                oldAst.elm.removeChild(oldAstChild[oldPointTail].elm)
                oldPointTail--
                continue
            }

            // 对元素节点的处理
            if(oldAstChild[oldPointHead].data.key===undefined){
                oldPointHead++
                continue
            }
            if(oldAstChild[oldPointTail].data.key===undefined){
                oldPointTail--
                continue
            }

            // 前前相同
            if(newAstChild[newPointHead].data.key===oldAstChild[oldPointHead].data.key){
                newAstChild[newPointHead].elm=oldAstChild[oldPointHead].elm
                diff(oldAstChild[oldPointHead],newAstChild[newPointHead])
                newAstChild[newPointHead].elm.innerText=newAstChild[newPointHead].children[0].text
                newPointHead++
                oldPointHead++
            }
            // 后后相同
            else if(newAstChild[newPointTail].data.key===oldAstChild[oldPointTail].data.key){
                newAstChild[newPointTail].elm=oldAstChild[oldPointTail].elm
                diff(oldAstChild[oldPointTail],newAstChild[newPointTail])
                newPointTail--
                oldPointTail--
            }
            // 新前旧后相同
            else if(newAstChild[newPointHead].data.key===oldAstChild[oldPointTail].data.key){
                oldAst.elm.insertBefore(oldAstChild[oldPointTail].elm,oldAstChild[oldPointHead].elm)
                newAstChild[newPointHead].elm=oldAstChild[oldPointTail].elm
                diff(oldAstChild[oldPointTail],newAstChild[newPointHead])
                newPointHead++
                oldPointTail--
            }
            // 新后旧前相同
            else if(newAstChild[newPointTail].data.key===oldAstChild[oldPointHead].data.key){
                oldAst.elm.replaceChild(oldAstChild[oldPointHead].elm,oldAstChild[oldPointTail].elm)
                oldAst.elm.insertBefore(oldAstChild[oldPointTail].elm,oldAstChild[oldPointHead].elm)
                newAstChild[newPointTail].elm=oldAstChild[oldPointHead].elm
                diff(oldAstChild[oldPointHead],newAstChild[newPointTail])
                newPointTail--
                oldPointHead++
            }
            // 四种比对都不同
            else{
                let flag=0
                // 采用遍历能找到相同
                for(let i=oldPointHead+1;i<=oldPointTail-1;i++){
                    if(newAstChild[newPointHead].data.key===oldAstChild[i].data.key){
                        oldAst.elm.insertBefore(oldAstChild[i].elm,oldAstChild[oldPointHead].elm)
                        newAstChild[newPointHead].elm=oldAstChild[i].elm
                        diff(oldAstChild[i],newAstChild[newPointHead])
                        newPointHead++
                        oldAstChild[i].data.key=undefined
                        flag=1
                        break
                    }
                }
                // 遍历未能找到相同
                if(flag===0){
                    let childRDOM=createRDOM(newAstChild[newPointHead])
                    oldAst.elm.insertBefore(childRDOM,oldAstChild[oldPointHead].elm)
                    newPointHead++
                }
            }

            // 删除old对应的多余的dom元素
        }
        if(oldPointHead<=oldPointTail){
            for(let i=oldPointHead;i<=oldPointTail;i++){
                oldAst.elm.removeChild(oldAstChild[i].elm)
            }
            
        }
        // 添加old对应的缺少的dom元素
        else if(newPointHead<=newPointTail){
            for(let i=newPointHead;i<=oldPointTail;i++){
                let childRDOM=createRDOM(newAstChild[i])
                oldAst.elm.insertBefore(childRDOM,oldAstChild[oldPointHead].elm)
            }
        }
        return newAst
    }