import React from 'react';
import muffins from './img/muffins.jpg';
import personalizadas from './img/personalizadas.jpg';
import galletas from './img/Galletas Artesanales.jpeg';
import donas from './img/Donas Rellenas.jpeg';
import croissants from './img/Croissants, macarons y éclairs..webp';






const defaultItems = [
    { title: 'Tortas Personalizadas', desc: 'Diseños únicos para tus celebraciones especiales.', img: personalizadas,  },
    { title: 'muffins', desc: 'Pequeñas delicias con sabores intensos.', img: muffins,  },
    { title: 'Galletas Artesanales', desc: 'Crocantes por fuera, suaves por dentro.', img: galletas, },
    { title: 'Pastelería Francesa', desc: 'Croissants, macarons y éclairs.', img: croissants,  },
    { title: 'Donas Rellenas', desc: 'Esponjosas y con rellenos cremosos.', img: donas,  },
];

const Productos = ({ items = defaultItems }) => (
    <section className="productos" id="productos">
    <div className="container">
        <h2>Nuestras Delicias</h2> 
        <div className="productos-grid">
        {items.map((p, i) => (
            <div key={i} className="producto-card">
            <div className="producto-img">
                {p.img ? <img src={p.img} alt={p.title} /> : p.emoji}
            </div>
            <div className="producto-info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="precio">{p.price}</div>
            </div>
            </div>
        ))}
        </div>
    </div>
</section>
);


//Hola tio este e mi primer mensaje
export default Productos;
