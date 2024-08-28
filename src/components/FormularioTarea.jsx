import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListaTareas from './ListaTareas';
import { useState } from 'react';
const FormularioTarea = () => {
    const [listaTareas, setlistaTareas] = useState([])
    const [tarea, setTarea] = useState("")
//const tomarText = (e)=>{
//    setTarea(e.target.value)
//}

const handleSubmit = (e)=>{
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
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex">
        <Form.Control value={tarea} onChange={(e)=>setTarea(e.target.value)} type="text" placeholder="Agrega una tarea" />
      <Button variant="primary" type="submit">
        Enviar
      </Button>
        
      </Form.Group>

      
    </Form>
    <ListaTareas listaTareas={listaTareas} borrarTarea={borrarTarea}></ListaTareas>
        </section>
    );
};

export default FormularioTarea;