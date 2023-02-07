export function keyToValue(path,proxyData){
    let keyArr=path.split('.')
    let value=proxyData
    for(let i=0;i<keyArr.length;i++){
        value=value[keyArr[i]]                
    }
    return value
}