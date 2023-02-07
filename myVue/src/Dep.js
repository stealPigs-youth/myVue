export class Dep{
    constructor(){
        this.watcherFuns=[]
    }
    addWatcherFun(){
        if(Dep.watcherFun){
            this.watcherFuns.push(Dep.watcherFun) 
        }
    }
    notify(){
        let watcherFuns=this.watcherFuns
        for(let i=0;i<watcherFuns.length;i++){
            watcherFuns[i]()
        }
    }
}
Dep.watcherFun=null