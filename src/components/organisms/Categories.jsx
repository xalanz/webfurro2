import React from 'react';

export default function Categories() {
  // Estilo para asegurar que las imágenes sean círculos perfectos
  const imgStyle = {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1', // Esto fuerza a que sea cuadrada
    objectFit: 'cover'
  };

  return (
    <section className="container py-5">
        <div className="row text-center pt-3">
            <div className="col-lg-6 m-auto">
                <h1 className="h1 text-celeste">Nuestras Especialidades</h1>
                <p>
                    Descubre las categorías favoritas de nuestros clientes. 
                    Desde clásicos hasta creaciones modernas.
                </p>
            </div>
        </div>
        
        <div className="row">
            {/* CATEGORÍA 1 */}
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="#">
                    <img 
                        src="https://www.handmadecharlotte.com/wp-content/uploads/2014/01/1-diy-fox-cake.jpg" 
                        className="rounded-circle img-fluid border" 
                        style={imgStyle}
                        alt="Tortas" 
                    />
                </a>
                <h5 className="text-center mt-3 mb-3">Tortas</h5>
                <p className="text-center">
                    <a className="btn btn-celeste">Ver Tortas</a>
                </p>
            </div>

            {/* CATEGORÍA 2 */}
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="#">
                    <img 
                        src="https://www.savvysavingcouple.net/wp-content/uploads/2019/02/Light-Furry-cupcake-1.jpg.webp" 
                        className="rounded-circle img-fluid border" 
                        style={imgStyle}
                        alt="Cupcakes" 
                    />
                </a>
                <h2 className="h5 text-center mt-3 mb-3">Cupcakes</h2>
                <p className="text-center">
                    <a className="btn btn-celeste">Ver Cupcakes</a>
                </p>
            </div>

            {/* CATEGORÍA 3 */}
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href="#">
                    <img 
                        src="https://customcookies.com/cdn/shop/files/DogFootStepCookie_Main_600x.jpg?v=1693573722" 
                        className="rounded-circle img-fluid border" 
                        style={imgStyle}
                        alt="Galletas" 
                    />
                </a>
                <h2 className="h5 text-center mt-3 mb-3">Galletas</h2>
                <p className="text-center">
                    <a className="btn btn-celeste">Ver Galletas</a>
                </p>
            </div>
        </div>
    </section>
  );
}