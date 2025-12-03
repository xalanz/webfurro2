import React, { useRef } from 'react';

const imgStyle = {
    height: '500px',
    objectFit: 'cover',
    objectPosition: 'center'
};

export default function Hero() {
  const carouselRef = useRef(null);

  const handleSlide = (index) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const bootstrapCarousel = window.bootstrap.Carousel.getInstance(carousel) || 
                                new window.bootstrap.Carousel(carousel);
      bootstrapCarousel.to(index);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px' }}>
      {/* Botones laterales izquierdo */}
      <div className="d-flex flex-column gap-2">
        <button 
          className="btn btn-outline-primary rounded-circle p-3"
          onClick={() => handleSlide(0)}
          title="Tortas"
        >
          1
        </button>
        <button 
          className="btn btn-outline-primary rounded-circle p-3"
          onClick={() => handleSlide(1)}
          title="Cupcakes"
        >
          2
        </button>
        <button 
          className="btn btn-outline-primary rounded-circle p-3"
          onClick={() => handleSlide(2)}
          title="Eventos"
        >
          3
        </button>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} id="template-mo-zay-hero-carousel" className="carousel slide flex-grow-1" data-bs-ride="carousel">
        <ol className="carousel-indicators">
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
        </ol>

        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" style={imgStyle} src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" alt="Tortas" />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                <h1 className="h1 text-celeste"><b>Lobito</b> Pastelero</h1>
                                <h3 className="h2">Tortas Artesanales</h3>
                                <p>Elaboradas con ingredientes 100% naturales. Ideales para celebrar tus momentos más dulces.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" style={imgStyle} src="https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80" alt="Cupcakes" />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1 text-celeste">Cupcakes Temáticos</h1>
                                <h3 className="h2">Dulces bocados de felicidad</h3>
                                <p>Variedad de sabores y decoraciones para cada ocasión. ¡Prueba nuestro Red Velvet!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel-item">
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid" style={imgStyle} src="https://images.unsplash.com/photo-1559553156-2e97137af16f?auto=format&fit=crop&w=800&q=80" alt="Eventos" />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1 text-celeste">Mesas Dulces</h1>
                                <h3 className="h2">Para tus eventos especiales</h3>
                                <p>Bodas, cumpleaños y bautizos. Nos encargamos de que tu mesa de postres sea inolvidable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
            <i className="fas fa-chevron-left display-3 text-celeste-arrow"></i>
        </a>
        <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
            <i className="fas fa-chevron-right display-3 text-celeste-arrow"></i>
        </a>
      </div>
    </div>
  );
}