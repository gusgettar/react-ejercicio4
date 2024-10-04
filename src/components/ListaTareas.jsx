import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTareas = ({listaTareas,borrarTarea}) => {
    return (
        <ListGroup>
          {
            listaTareas.map((tarea)=><ItemTarea key={tarea._id} tarea={tarea} borrarTarea={borrarTarea}></ItemTarea>)
            

          }
      
    </ListGroup>
    );
};

export default ListaTareas;