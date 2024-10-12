const URLtareas = import.meta.env.VITE_URL_TAREAS

//SOLICITUD GET

export const buscarTareas = async()=>{
    try {
        const respuesta = await fetch(URLtareas)
        
        return respuesta
    } catch (error) {
        console.error(error)
        return false
    }

}

export const buscarTareabyId = async (id)=>{
    try {
        const respuesta = await fetch(URLtareas+'/'+id)
        return respuesta
    } catch (error) {
        console.error(error)
        return false
    }
}

export const editarTareaAPI = async(tareaEditada, id)=>{
    try {
    const respuesta = await fetch(URLtareas+'/'+id,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        
        body: JSON.stringify(tareaEditada)
    })
    
    return respuesta;
   } catch (error) {
    console.error(error)
    return false;
}
}

export const crearTareaAPI = async (nuevaTarea) =>{
    try {
        const respuesta = await fetch(URLtareas,{
            method: "POST",
            headers: {"Content-Type":"application/json"
            },
            body: JSON.stringify(nuevaTarea)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return false
        
    }
}

export const borrarTareaAPI = async (id)=>{
    try {
        const respuesta = await fetch(URLtareas+'/'+id,{
            method: "DELETE"
        })
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.error(error)
        return false
        
    }
}