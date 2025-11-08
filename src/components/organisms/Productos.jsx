import React from 'react';

const defaultItems = [
    { emoji: '', title: 'Tortas Personalizadas', desc: 'Diseños únicos para tus celebraciones especiales.', price: 'Desde $25.000' },
    { emoji: '', title: 'Cupcakes Gourmet', desc: 'Pequeñas delicias con sabores intensos.', price: '$2.500 c/u' },
    { emoji: '', title: 'Galletas Artesanales', desc: 'Crocantes por fuera, suaves por dentro.', price: '$8.000/docena' },
    { emoji: '', title: 'Pastelería Francesa', desc: 'Croissants, macarons y éclairs.', price: '$3.500 c/u' },
    { emoji: '', title: 'Donas Rellenas', desc: 'Esponjosas y con rellenos cremosos.', price: '$2.000 c/u' },
];

const Productos = ({ items = defaultItems }) => (
    <section className="productos" id="productos">
    <div className="container">
        <h2>Nuestras Delicias</h2>
        <div className="productos-grid">
        {items.map((p, i) => (
            <div key={i} className="producto-card">
            <div className="producto-img">{p.emoji}</div>
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
