import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListaTareas from './ListaTareas';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormularioTarea = () => {
    const tareasLocalStorage = JSON.parse(localStorage.getItem('tareasKey') || [])
    const [listaTareas, setlistaTareas] = useState(tareasLocalStorage)
    const [tarea, setTarea] = useState("")
    const {register, handleSubmit, formState:{errors}} = useForm()    
    //CICLO DE VIDA DEL COMPONENTE

    useEffect(()=>{
      console.log('prueba del ciclo de vida')
      localStorage.setItem('tareasKey', JSON.stringify(listaTareas))
     
    }, [listaTareas])


//const tomarText = (e)=>{
//    setTarea(e.target.value)
//}

const handleSubmit2 = (e)=>{
e.preventDefault()
//guardar la tarea en listaTareas
//listaTareas.push(tarea) (NO SE PUEDE HACER UN PUSH EN UN STATE)
//...
setlistaTareas([...listaTareas, tarea])

setTarea("")

}

const borrarTarea = (nombreTarea)=>{
//listaTareas.splice
const tareasFiltradas = listaTareas.filter((item)=>item !== nombreTarea)
//actualizar state
setlistaTareas(tareasFiltradas)
}
    return (
        <section>
            <Form onSubmit={handleSubmit2}>
      <Form.Group className="mb-3 d-flex">
        <Form.Control required value={tarea} onChange={(e)=>setTarea(e.target.value)} type="text" placeholder="Agrega una tarea" />
      <Button variant="primary" type="submit">
        Enviar
      </Button>
        
      </Form.Group>

      
    </Form>
    <ListaTareas listaTareas={listaTareas} borrarTarea={borrarTarea}></ListaTareas>
        </section>
    );
  
  }
export default FormularioTarea;
