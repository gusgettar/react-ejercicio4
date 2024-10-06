import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';
import { useState } from 'react';


const ListaTareas = ({listaTareas,borrarTarea}) => {
  const [animate, setAnimate] = useState(false);
    return (
      <ListGroup className='gap-1'>
          {
            listaTareas.map((tarea)=><ItemTarea key={tarea._id} tarea={tarea} borrarTarea={borrarTarea}></ItemTarea>)
            

          }
      
    </ListGroup>
    );
};

export default ListaTareas;