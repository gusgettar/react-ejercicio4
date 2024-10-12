import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListaTareas from './ListaTareas';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { borrarTareaAPI, buscarTareabyId, buscarTareas, crearTareaAPI, editarTareaAPI } from '../helpers/queries';
import Swal from 'sweetalert2';



const FormularioTarea = () => {
    const [creandoTarea, setCreandoTarea]=useState(true)
    const [idEditar, setIdEditar]=useState()
    const [listaTareas, setlistaTareas] = useState([])
 
    const {register,setValue ,handleSubmit,getValues ,formState:{errors}, reset} = useForm()    
  

    const cargarTareas = async ()=>{
      const respuesta = await buscarTareas()
        if(respuesta.status===200){

          const tareas = await respuesta.json()
         
          setlistaTareas(tareas)
        }
        
    }

      const nuevaTareaAPI = async(nuevaTarea)=>{
      const respuesta = await crearTareaAPI(nuevaTarea)
      if(respuesta.status===201){
        console.log('Se creo la tarea')
        cargarTareas()
        reset()
      }else{
        Swal.fire({
          title: "No se pudo cargar la tarea",
          text: `${nuevaTarea.nombreTarea}`,
          icon: "error",
                    
        })
      }

    }
    const editarTarea = async(id)=>{
      try {
        setCreandoTarea(false)
        const respuesta = await buscarTareabyId(id)
        const data = await respuesta.json()
        console.log(data.nombreTarea)
        setValue('nombreTarea', data.nombreTarea)
        setIdEditar(id)
        
        
      } catch (error) {
        
      }
    }

    const guardarTareaEditada = async(tarea)=>{

     
      await editarTareaAPI(tarea,idEditar)
      cargarTareas()
      reset()
    }

   const borrarTarea = async(id)=>{
      Swal.fire({
        title: "¿Esta seguro de borrar la tarea?",
        text: "No puedes revertir esta operacion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const respuesta = await borrarTareaAPI(id)
       
          if(respuesta.status === 200){
            const tareaEncontrada = await respuesta.json()
            console.log(tareaEncontrada)
            Swal.fire({
              title: "Tarea Eliminada",
              text: `${tareaEncontrada.mensaje}`,
              icon: "success",
              
            })
            
          }
      
        }
        cargarTareas()
       
    }
  )}

    useEffect(()=>{
      cargarTareas()
     
    },[setlistaTareas])
  


    return (
        <section>
            <Form onSubmit={creandoTarea ? handleSubmit(nuevaTareaAPI):handleSubmit(guardarTareaEditada)} >
      <Form.Group className="mb-3 d-flex">
        <Form.Control {...register("nombreTarea",{
          required: "el nombre de la tarea es obligatorio",
          minLength: {value: 2, message: "Debe ingresar al menos 2 caracteres"},
          maxLength: {value: 50, message: "Debe ingresar como maximo 50 caracteres"},
        })} type="text" placeholder="Agrega una tarea" />
      <Button variant="primary mx-3" type="submit">
        Enviar
      </Button>
        
      </Form.Group>

      
    </Form>
    <ListaTareas listaTareas={listaTareas} editarTarea={editarTarea} borrarTarea={borrarTarea}></ListaTareas>
        </section>
    );
  
  }
export default FormularioTarea;
