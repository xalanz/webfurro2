import React from 'react';

export default function FeaturedProducts() {
    
  // Estilo para que todas las fotos de las tarjetas sean del mismo tamaño
  const cardImgStyle = {
    height: '300px',
    objectFit: 'cover'
  };

  return (
    <section className="bg-light">
        <div className="container py-5">
            <div className="row text-center py-3">
                <div className="col-lg-6 m-auto">
                    <h1 className="h1 text-celeste">Productos Destacados</h1>
                    <p>
                        Las creaciones más vendidas de la semana. ¡No te quedes sin probarlas!
                    </p>
                </div>
            </div>
            
            <div className="row">
                
                {/* PRODUCTO 1 */}
                <div className="col-12 col-md-4 mb-4">
                    <div className="card h-100">
                        <a href="#">
                            <img 
                                src="https://cdn0.recetasgratis.net/es/posts/1/4/9/cheesecake_de_frutos_rojos_73941_orig.jpg" 
                                className="card-img-top" 
                                style={cardImgStyle}
                                alt="Cheesecake" 
                            />
                        </a>
                        <div className="card-body">
                            <ul className="list-unstyled d-flex justify-content-between">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                </li>
                                <li className="text-muted text-right">$45.00</li>
                            </ul>
                            <a href="#" className="h2 text-decoration-none text-dark">Cheesecake Frutos Rojos</a>
                            <p className="card-text">
                                Base crocante de galleta con una crema suave de queso y topping artesanal de frutos del bosque.
                            </p>
                            <p className="text-muted">Reseñas (24)</p>
                        </div>
                    </div>
                </div>

                {/* PRODUCTO 2 */}
                <div className="col-12 col-md-4 mb-4">
                    <div className="card h-100">
                        <a href="#">
                            <img 
                                src="https://www.pasteleite.com/wp-content/uploads/2021/02/Torta-mousse-de-chocolate-1.jpg" 
                                className="card-img-top" 
                                style={cardImgStyle}
                                alt="Torta Chocolate" 
                            />
                        </a>
                        <div className="card-body">
                            <ul className="list-unstyled d-flex justify-content-between">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                </li>
                                <li className="text-muted text-right">$55.00</li>
                            </ul>
                            <a href="#" className="h2 text-decoration-none text-dark">Torta Mousse de Chocolate</a>
                            <p className="card-text">
                                Tres capas de intenso chocolate belga con relleno de ganache y decoración de trufas.
                            </p>
                            <p className="text-muted">Reseñas (48)</p>
                        </div>
                    </div>
                </div>

                {/* PRODUCTO 3 */}
                <div className="col-12 col-md-4 mb-4">
                    <div className="card h-100">
                        <a href="#">
                            <img 
                                src="https://tofuu.getjusto.com/orioneat-local/resized2/X8654pWTMEP6ZMzuC-2400-x.webp" 
                                className="card-img-top" 
                                style={cardImgStyle}
                                alt="Donas" 
                            />
                        </a>
                        <div className="card-body">
                            <ul className="list-unstyled d-flex justify-content-between">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                </li>
                                <li className="text-muted text-right">$25.00</li>
                            </ul>
                            <a href="#" className="h2 text-decoration-none text-dark">Caja Mix Donas</a>
                            <p className="card-text">
                                Caja de 6 donas glaseadas surtidas. Ideales para compartir en la oficina o en casa.
                            </p>
                            <p className="text-muted">Reseñas (74)</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}