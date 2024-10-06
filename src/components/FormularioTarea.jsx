import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListaTareas from './ListaTareas';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { borrarTareaAPI, buscarTareas, crearTareaAPI } from '../helpers/queries';
import Swal from 'sweetalert2';


const FormularioTarea = () => {
    const tareasLocalStorage = JSON.parse(localStorage.getItem('tareasKey')) || []
    const [listaTareas, setlistaTareas] = useState([])
    const [tarea, setTarea] = useState("")
    const {register, handleSubmit, formState:{errors}, reset} = useForm()    
    //CICLO DE VIDA DEL COMPONENTE

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

      }

    }

    const borrarTarea = async(id)=>{
      Swal.fire({
        title: "¿Esta seguro de borrar el producto?",
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
              icon: "success"
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
            <Form onSubmit={handleSubmit(nuevaTareaAPI)} >
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
    <ListaTareas listaTareas={listaTareas} borrarTarea={borrarTarea} ></ListaTareas>
        </section>
    );
  
  }
export default FormularioTarea;
