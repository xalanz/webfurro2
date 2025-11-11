import React from 'react';

const defaultItems = [
    {  title: 'Tortas Personalizadas', desc: 'Diseños únicos para tus celebraciones especiales.',  },
    {  title: 'Cupcakes Gourmet', desc: 'Pequeñas delicias con sabores intensos.', },
    {  title: 'Galletas Artesanales', desc: 'Crocantes por fuera, suaves por dentro.',  },
    { title: 'Pastelería Francesa', desc: 'Croissants, macarons y éclairs.',  },
    {  title: 'Donas Rellenas', desc: 'Esponjosas y con rellenos cremosos.',  },
    {  title: 'Donas Rellenas', desc: 'Esponjosas y con rellenos cremosos.', },
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


//Hola tio este e mi primer mensaje
export default Productos;
