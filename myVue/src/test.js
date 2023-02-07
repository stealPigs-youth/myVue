import { MyVue } from "./MyVue"
let app=new MyVue({
    el:'#container',
    data:{
       A:0,
       B:'bananer',
       C:'control',
       D:'desire'
    },
    watch:{
        A:{
            handler(){
                console.log('A属性被修改了')
            }
        }
    },
    templateStr:`<div>
                    <p key="A">{{A}}</p>
                    <p key="B">{{B}}</p>
                    <p key="C">{{C}}</p>
                    <p key="D">{{D}}</p>
                </div>`
})
let btn=document.querySelector('#btn')
btn.onclick=function(){
    app._data.A+=1
}