import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NuevoProducto from './NuevoProducto';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
// import { CRMContext } from '../../context/CRMContext';

function Productos(props) {
    const [productos, guardarProductos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    // const [auth, guardarAuth ] = useContext( CRMContext );

    // useEffect para consultar api cuando cargue.
    useEffect( () => {

        // if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos'/*, {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    }*/);
                    guardarProductos(productosConsulta.data);
                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status = 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            // Llamado a la api.
            consultarAPI();

        // }else {
        //      navigate('/iniciar-sesion');
        // }
    }, [productos]);

    const abrirModal = () => {
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
    };    

    // Si el state esta como false.
    // if(!auth.auth) {
    //     navigate('/iniciar-sesion');
    // }


    // spinner de carga
    if(!productos.length) return <Spinner /> 


    return (
        <>
            <h2>Productos</h2>

            {/* <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link> */}
            <Link to="#" className="btn btn-verde nvo-cliente" onClick={abrirModal}>
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>            

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>

            <Modal 
                isOpen={modalOpen} 
                onRequestClose={cerrarModal}
                style={{ content: { width: '55%', height: '80%', margin: 'auto', transition: 'opacity 300ms ease-in-out', position: 'relative' } }}
            >
                <button 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',  // Ajusta este valor según tu preferencia
                        right: '17px',  // Ajusta este valor según tu preferencia
                        width: '40px',
                        height: '45px'
                    }}>
                    <i className="fas fa-times"></i>
                </button>
                <NuevoProducto cerrarModal={cerrarModal} />
            </Modal>            
        </>
    )
}
export default Productos;