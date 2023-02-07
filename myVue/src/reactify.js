import { Dep } from "./Dep"
export function reactify(obj){
    if(typeof obj ==='object'){
        let keys=Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            let key=keys[i]
            let value=obj[key]
            defineReactive(obj,key,value)
            // 非数组对象类型
            if(typeof value==='object'&& !Array.isArray(value)){
                reactify(value)
            }
            // 数组类型
            else if(Array.isArray(value)){
                for(let i=0;i<value.length;i++){
                    if(typeof value[i]==='object'){
                        reactify(value[i])
                    }
                    
                }
            }
        }
    }    
}
// 对单个数据响应化
function defineReactive(obj,key,value){
    let dep=new Dep()
    Object.defineProperty(obj,key,{
        get(){
            dep.addWatcherFun()
            // console.log(dep)
            return value
        },
        set(newVal){
            value=newVal
            dep.notify()
        }
    })
}