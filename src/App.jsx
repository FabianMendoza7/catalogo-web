import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/** Componentes */
import Productos from './componentes/productos/Productos';
import EditarProducto from './componentes/productos/EditarProducto';
import NuevoProducto from './componentes/productos/NuevoProducto';
// import Login from './componentes/auth/Login';

// import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {

    // utilizar context en el componente
    // const [ auth, guardarAuth ] = useContext(CRMContext);


    return (
      <Router>
          <Fragment>
            {/*<CRMProvider value={[ auth, guardarAuth ]}> */}
              <Header />

              <div className="grid contenedor contenido-principal">
                  <Navegacion />

                  <main className="caja-contenido col-9">
                        <Routes>
                            <Route exact path="/productos" element={<Productos />} />
                            <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
                            <Route exact path="/productos/editar/:id" element={<EditarProducto />} />
                            {/* 

                            <Route exact path="/iniciar-sesion" component={Login} />
                         */}

                        </Routes>
                  </main>
              </div>
            {/*</CRMProvider>*/}
          </Fragment>
      </Router>
    )
}

export default App;