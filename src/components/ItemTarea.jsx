import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const ItemTarea = ({ tarea, borrarTarea }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Activar la animación cada vez que se monta el componente
        setAnimate(true);
    }, []);

    return (
        <ListGroup.Item
            className={`d-flex justify-content-between ${animate ? 'new-task' : ''}`}
        >
            {tarea.nombreTarea}
            <Button onClick={() => borrarTarea(tarea._id)} variant="danger">
                Borrar
            </Button>
        </ListGroup.Item>
    );
};

export default ItemTarea;