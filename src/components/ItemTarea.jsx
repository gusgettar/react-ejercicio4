import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';


const ItemTarea = ({ tarea, borrarTarea, editarTarea}) => {
    const [animate, setAnimate] = useState(false);
   
    

    useEffect(() => {
        // Activar la animación cada vez que se monta el componente
        setAnimate(true);
    }, []);

   

    return (
        <>
            
              
        <ListGroup.Item 
            className={`d-flex justify-content-between ${animate ? 'new-task' : ''}` }
            >
            {tarea.nombreTarea}

            <span className='d-flex gap-1'>

            <Button onClick={() => borrarTarea(tarea._id)} variant="danger">
                Borrar
            </Button>
            <Button onClick={() => editarTarea(tarea._id)} variant="danger">
                Editar
            </Button>
            </span>
        </ListGroup.Item>
               
            
            </>
    );
};

export default ItemTarea;