const lista = document.querySelector('#lista')
const element = document.querySelector('#element')
const input = document.querySelector('#input')
const buttonEnter = document.querySelector('#button-enter')
const realizado = 'fa-realizado-circle'
const sinrealizar = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente
// funcion de agregar tarea 
function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 
    const REALIZADO = realizado ? realizado : sinrealizar // si realizado es verdadero realizado si no sinrealizar
    const LINE = realizado ? lineThrough : '' 

    const element = `
                        <li id="element">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",element)
}
// funcion de Tarea Realizada 
function tareaRealizada(element) {
    element.classList.toggle(realizado)
    element.classList.toggle(sinrealizar)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
    console.log(LIST)
    console.log(LIST[element.id])
   console.log(LIST[element.id].realizado)
}
function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}
// crear un evento para escuchar el enter y para habilitar el button 
buttonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }
})
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('LIST',JSON.stringify(LIST))
        input.value = ''
        id++
        console.log(LIST)
        }
    }
})
lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("eliminado")
    }
    localStorage.setItem('LIST',JSON.stringify(LIST))
})
let data = localStorage.getItem('LIST')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}
function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}