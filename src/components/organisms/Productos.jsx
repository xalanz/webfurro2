import React from 'react';
import CamaronImg from '../../assets/img/Camaron.webp';

const defaultItems = [
    { title: 'Tortas Personalizadas', desc: 'Diseños únicos para tus celebraciones especiales.', image: CamaronImg },
    { title: 'Cupcakes Gourmet', desc: 'Pequeñas delicias con sabores intensos.', image: CamaronImg },
    { title: 'Galletas Artesanales', desc: 'Crocantes por fuera, suaves por dentro.', image: CamaronImg },
    { title: 'Pastelería Francesa', desc: 'Croissants, macarons y éclairs.', image: CamaronImg },
    { title: 'Donas Rellenas', desc: 'Esponjosas y con rellenos cremosos.', image: CamaronImg },
];
// Cada objeto en defaultItems representa un producto con su título, descripción e imagen.
const Productos = ({ items = defaultItems }) => (
    <section className="productos" id="productos">
        <div className="container">
            <h2>Nuestras Delicias</h2>
            <div className="productos-grid">
                {items.map((p, i) => (
                    <div key={i} className="producto-card">
                        <div className="producto-img">
                            <img src={p.image} alt={p.title} />
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

export default Productos;
