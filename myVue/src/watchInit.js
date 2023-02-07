let watcherFun=null
let watch={
    A:{
        handler(){
            console.log('A发生改变了')
        }
    }
}
function watchInit(watch){
    let keyArr=Object.keys(watch)
    for(let i=0;i<keyArr.length;i++){
        let key=keyArr[i]
        let dataWatch=watch[key]['handler']
        // watcherFun=dataWatch
        //let value=keyToValue(key)

        dataWatch()
    }
}
watchInit(watch)