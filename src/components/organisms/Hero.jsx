import React from 'react';

const Hero = ({ title, subtitle, ctaText, ctaHref, background }) => {
    const style = background ? { backgroundImage: `url(${background})` } : {};

    return (
    <section className="hero" id="inicio" style={style}>
        <div className="hero-overlay">
        <div className="hero-content container">
            <h1>{title || 'Dulces Momentos, Sabores Únicos'}</h1>
            <p>{subtitle || 'Repostería artesanal hecha con amor y los mejores ingredientes'}</p>
            <a className="btn" href={ctaHref || '#productos'}>{ctaText || 'Ver Productos'}</a>
        </div>
        </div>
    </section>
);
};

export default Hero;
