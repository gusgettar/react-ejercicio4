import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

const ItemTarea = ({tarea,borrarTarea}) => {
    return (
        <ListGroup.Item className='d-flex justify-content-between'>{tarea}<Button onClick={()=>borrarTarea(tarea)} variant='danger'>Borrar</Button></ListGroup.Item>
    );
};

export default ItemTarea;