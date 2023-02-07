export function mount(container,RDOM){
    let parentNode=container.parentElement
    parentNode.replaceChild(RDOM,container)
}