import React, { useState } from 'react';
import { ShoppingCart, Star, Plus, Minus, X, Trash2 } from 'lucide-react';
import tortachocolate from '../../assets/img/torta-personalizada.jpg';
import galletas from '../../assets/img/galletas-artesanales.jpg';
import cupcakes from '../../assets/img/cupcakes-foto.jpg';
import macarons from '../../assets/img/macarons.webp';
import croissant from '../../assets/img/croissant.webp';
import donas from '../../assets/img/donas.jpg';
import redvelvet from '../../assets/img/red-velvet.jpg';



/* * -------------------------------------------------
 * ¡ESTA ES LA RUTA CORREGIDA PARA TUS ESTILOS!
 * -------------------------------------------------
 */

import './styles/Tienda.css';
import './styles/Base.css';

// --- 1. Datos de productos para la pastelería ---
// (Reemplaza las 'imagen' con las rutas a tus fotos cuando las tengas)
const productos = [
  { 
    id: 'T001', 
    nombre: 'Torta de Chocolate', 
    categoria: 'Tortas', 
    precio: 25000, 
    imagen: tortachocolate, 
    stock: true, 
    enOferta: true, 
    descuento: 10, 
    calificacion: 5,
    unidad: 'torta'
  },
  { 
    id: 'C001', 
    nombre: 'Cupcakes Adornados', 
    categoria: 'Cupcakes', 
    precio: 8000, 
    imagen: cupcakes, 
    stock: true, 
    enOferta: false, 
    descuento: 0, 
    calificacion: 4,
    unidad: 'caja 6'
  },
  { 
    id: 'G001', 
    nombre: 'Galletas Artesanales', 
    categoria: 'Galletas', 
    precio: 6500, 
    imagen: galletas, 
    stock: true, 
    enOferta: true, 
    descuento: 15, 
    calificacion: 5,
    unidad: 'docena'
  },
  { 
    id: 'PF001', 
    nombre: 'Macarons Surtidos', 
    categoria: 'Pastelería Francesa', 
    precio: 12000, 
    imagen: macarons, 
    stock: true, 
    enOferta: false, 
    descuento: 0, 
    calificacion: 5,
    unidad: 'caja 12'
  },
  { 
    id: 'D001', 
    nombre: 'Donas Rellenas', 
    categoria: 'Donas', 
    precio: 5000, 
    imagen: donas, 
    stock: true, 
    enOferta: false, 
    descuento: 0, 
    calificacion: 4,
    unidad: 'caja 4'
  },
  { 
    id: 'T002', 
    nombre: 'Torta Red Velvet', 
    categoria: 'Tortas', 
    precio: 22000, 
    imagen: redvelvet, 
    stock: true, 
    enOferta: false, 
    descuento: 0, 
    calificacion: 5,
    unidad: 'torta'
  },
  { 
    id: 'PF002', 
    nombre: 'Croissant de Mantequilla', 
    categoria: 'Pastelería Francesa', 
    precio: 1500, 
    imagen: croissant, 
    stock: true, 
    enOferta: false, 
    descuento: 0, 
    calificacion: 5,
    unidad: 'c/u'
  }
];

// --- 2. Nuevas categorías ---
const categorias = ['Todas', 'Tortas', 'Cupcakes', 'Galletas', 'Pastelería Francesa', 'Donas'];


// --- 3. Nombre del Componente ---
function Productos() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // --- Lógica de filtrado y carrito ---
  const productosFiltrados = categoriaActiva === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  const calcularPrecioFinal = (precio, descuento) => {
    return precio - (precio * descuento / 100);
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      ));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioFinal = calcularPrecioFinal(item.precio, item.descuento);
      return total + (precioFinal * item.cantidad);
    }, 0);
  };

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);


  const handleCheckout = () => {
    // 1. Muestra el mensaje
    alert('¡Gracias por su compra!');

    // 2. Vacía el carrito
    setCarrito([]);

    // 3. Cierra el modal
    setMostrarCarrito(false);
  };

  return (
    // Usamos un Fragment (<>) para poder incluir el banner y la tienda
    <>
      {/* --- 4. El Banner --- */}
      <div className="banner">
        <h1></h1>
        <div className='LogoFlotante'>
          <div className="banner-contenido">
            <h3 className="logo-text"> </h3>
            <h2 className="banner-titulo">🍰Momentos dulces para tu día🎂</h2>
            <button className="banner-boton">
              Conoce nuestros productos
            </button>
          </div>
        </div>
        <div className="banner-oferta-badge">
          🎉 20%
        </div>
      </div>

      {/* --- 5. La Tienda (Categorías y Productos) --- */}
      <div className="seccion-principal">
        <h2 className="seccion-titulo">
          Categorías destacadas
        </h2>
        <div className="categorias-lista">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`categoria-boton ${categoriaActiva === cat ? 'categoria-activa' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="seccion-titulo">
          Productos
        </h2>
        <div className="productos-grid">
          {productosFiltrados.map(producto => {
            const precioFinal = calcularPrecioFinal(producto.precio, producto.descuento);
            return (
              <div key={producto.id} className="producto-card">
                {producto.enOferta && (
                  <div className="producto-oferta-tag">
                    -{producto.descuento}%
                  </div>
                )}
                <div className="producto-imagen-contenedor">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                </div>
                <h3 className="producto-nombre">
                  {producto.nombre}
                </h3>
                <p className="producto-codigo">
                  Código: {producto.id}
                </p>
                <div className="producto-calificacion">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < producto.calificacion ? 'var(--color-badge-oferta)' : 'none'}
                      stroke={i < producto.calificacion ? 'var(--color-badge-oferta)' : '#ccc'}
                    />
                  ))}
                  <span className="calificacion-texto">
                    ({producto.calificacion})
                  </span>
                </div>
                <div className="producto-precio-info">
                  {producto.enOferta && (
                    <p className="precio-tachado">
                      ${producto.precio.toLocaleString()}
                    </p>
                  )}
                  <p className="precio-final">
                    ${precioFinal.toLocaleString()}
                    <span className="precio-unidad"> /{producto.unidad}</span>
                  </p>
                </div>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="producto-boton-agregar"
                >
                  <Plus size={20} />
                  Añadir al carrito
                </button>
              </div>
            );
          })}
        </div>
      </div>

      
      {/* --- 6. Botón Flotante del Carrito --- */}
      <button
        onClick={() => setMostrarCarrito(true)}
        className="carrito-flotante-boton"
        aria-label='abrir-carrito'
      >
        <ShoppingCart size={30} />
        {totalItems > 0 && (
          <span className="carrito-flotante-contador">
            {totalItems}
          </span>
        )}
      </button>

      {/* --- 7. Modal del Carrito --- */}
      {mostrarCarrito && (
        <div className="modal-overlay">
          <div className="carrito-modal">
            <div className="modal-header">
              <h2 className="modal-titulo">
                <ShoppingCart size={24} className="modal-icono" />
                Mi Carrito
              </h2>
              <button
                onClick={() => setMostrarCarrito(false)}
                className="modal-cerrar-boton"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="modal-cuerpo">
              {carrito.length === 0 ? (
                <p className="carrito-vacio-mensaje">
                  Tu carrito está vacío
                </p>
              ) : (
                carrito.map(item => {
                  const precioFinal = calcularPrecioFinal(item.precio, item.descuento);
                  return (
                    <div key={item.id} className="carrito-item">
                      <div className="carrito-item-imagen-contenedor">
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          className="carrito-item-imagen"
                        />
                      </div>
                      <div className="carrito-item-detalles">
                        <h4 className="carrito-item-nombre">{item.nombre}</h4>
                        <p className="carrito-item-precio-unitario">
                          ${precioFinal.toLocaleString()}
                          <span className="precio-unidad"> /{item.unidad}</span>
                        </p>
                        {item.enOferta && (
                          <span className="carrito-item-descuento-tag">
                            -{item.descuento}% descuento
                          </span>
                        )}
                      </div>
                      <div className="carrito-item-cantidad-control">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="cantidad-boton cantidad-restar"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="cantidad-display">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          className="cantidad-boton cantidad-sumar"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="cantidad-boton cantidad-eliminar"
                          aria-label={`eliminar ${item.nombre}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="carrito-item-subtotal">
                        <p className="carrito-item-subtotal-texto">
                          ${(precioFinal * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {carrito.length > 0 && (
              <div className="modal-footer">
                <div className="carrito-total">
                  <span>Total:</span>
                  <span className="carrito-total-valor">${calcularTotal().toLocaleString()}</span>
                </div>
                {/* * -------------------------------------------------
                  * ¡BOTÓN ACTUALIZADO CON onClick!
                  * -------------------------------------------------
                */}
                <button className="checkout-boton" onClick={handleCheckout}>
                  Proceder al pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// --- 8. Exportar como 'Productos' ---
export default Productos;
