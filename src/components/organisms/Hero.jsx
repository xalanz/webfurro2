import React from 'react';

// Estilos en línea para asegurar que las imágenes se vean iguales
const imgStyle = {
    height: '500px',
    objectFit: 'cover',
    objectPosition: 'center'
};

export default function Hero() {
  return (
    // ID y clases originales de la plantilla
    <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
        
        {/* INDICADORES (Las rayitas de abajo) */}
        <ol className="carousel-indicators">
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
        </ol>

        {/* CONTENIDO DEL SLIDER */}
        <div className="carousel-inner">
            
            {/* ITEM 1: TORTAS */}
            <div className="carousel-item active">
                <div className="container">
                    <div className="row p-5">
                        {/* En la plantilla original la imagen está primero en código, pero con 'order-last' se va a la derecha */}
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img 
                                className="img-fluid" 
                                style={imgStyle}
                                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" 
                                alt="Tortas" 
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                {/* Cambiamos 'text-success' (verde) por tu 'text-celeste' */}
                                <h1 className="h1 text-celeste"><b>Lobito</b> Pastelero</h1>
                                <h3 className="h2">Tortas Artesanales</h3>
                                <p>
                                    Elaboradas con ingredientes 100% naturales. 
                                    Ideales para celebrar tus momentos más dulces.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ITEM 2: CUPCAKES */}
            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img 
                                className="img-fluid" 
                                style={imgStyle}
                                src="https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80" 
                                alt="Cupcakes" 
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1 text-celeste">Cupcakes Temáticos</h1>
                                <h3 className="h2">Dulces bocados de felicidad</h3>
                                <p>
                                    Variedad de sabores y decoraciones para cada ocasión. 
                                    ¡Prueba nuestro Red Velvet!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ITEM 3: EVENTOS */}
            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img 
                                className="img-fluid" 
                                style={imgStyle}
                                src="https://images.unsplash.com/photo-1559553156-2e97137af16f?auto=format&fit=crop&w=800&q=80" 
                                alt="Eventos" 
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1 text-celeste">Mesas Dulces</h1>
                                <h3 className="h2">Para tus eventos especiales</h3>
                                <p>
                                    Bodas, cumpleaños y bautizos. Nos encargamos de que 
                                    tu mesa de postres sea inolvidable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* FLECHAS DE CONTROL (Usando <a> como en la plantilla original) */}
        <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
            <i className="fas fa-chevron-left display-3 text-celeste-arrow"></i>
        </a>
        <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
            <i className="fas fa-chevron-right display-3 text-celeste-arrow"></i>
        </a>

    </div>
  );
}