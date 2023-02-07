import { getTag } from "./getTag"
import { combineData } from "./combineData"
import { createRDOM } from "./createRDOM"
import { mount } from "./mount"
import {diff} from './diff'
import { Dep } from "./Dep"
import { reactify } from "./reactify"
import { keyToValue } from "./keyToValue"
export class MyVue{
    constructor(options){
        // 获得替换容器
        this._el=options.el
        this._container=document.querySelector(this._el)
        // 获得响应式数据
        this._data=options.data
        reactify(this._data,this)
        // 获得ast语法树
        this._templateStr=options.templateStr
        this._ast=getTag(this._templateStr)
        // 把数据与ast结合生成VDOM，VDOM在生成RDOM，RDOM挂在到页面中
        this.baseInit()
        // 给数据配置监视属性
        this._watch=options.watch
        this.watchInit()
    }
    baseInit(){
        let patchFun=()=>{
            let newVDOM=JSON.parse(JSON.stringify(this._ast))
            combineData(newVDOM,this._data)
            this.VDOM=diff(this.VDOM,newVDOM)
        }
        Dep.watcherFun=patchFun
        this.VDOM=JSON.parse(JSON.stringify(this._ast))
        combineData(this.VDOM,this._data)
        this.RDOM=createRDOM(this.VDOM)
        mount(this._container,this.RDOM)
        Dep.watcherFun=null
    }
    watchInit(){
        let keyArr=Object.keys(this._watch)
        for(let i=0;i<keyArr.length;i++){
            let key=keyArr[i]
            let dataWatch=this._watch[key]['handler']
            Dep.watcherFun=dataWatch
            keyToValue(key,this._data)
            Dep.watcherFun=null
        }
    }
}
