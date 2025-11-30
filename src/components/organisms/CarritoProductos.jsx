import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

// Imagen placeholder
const imagenPlaceholder = 'https://via.placeholder.com/200x200?text=Producto';

const categorias = ['Todas', 'Pasteles', 'muffins', 'Galletas', 'Postres', 'Donuts'];

function TiendaHuertoHogar() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productos, setProductos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [apiStatus, setApiStatus] = useState({ lastCount: null, lastError: null });
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    categories: '',
    price: 0,
    image: imagenPlaceholder,
    Stock: true,
    Discount: false,
    stars: 5
  });

  // Helper: clave única para producto (prefiere id, si no usa nombre normalizado)
  const keyOf = (p) => {
    const id = p && (p.id || p._id || p.productId);
    if (id !== undefined && id !== null && String(id) !== '') return `id:${String(id)}`;
    const name = (p && (p.name || p.nombre) || '').toString().toLowerCase().trim();
    return `name:${name}`;
  };

  // Merge sin duplicados: existing + incoming, incoming sobrescribe por la misma clave
  const mergeProducts = (existing = [], incoming = []) => {
    const map = new Map();
    existing.forEach(p => {
      const k = keyOf(p);
      if (k) map.set(k, p);
    });
    incoming.forEach(p => {
      const k = keyOf(p);
      if (k) map.set(k, p); // incoming reemplaza si hay misma clave
    });
    return Array.from(map.values());
  };

  // Enviar los productos de ejemplo al backend
  const seedProducts = async () => {
    if (seeding) return;
    setSeeding(true);
    try {
      // Primero obtener productos existentes para evitar duplicados
      let existing = [];
      try {
        const res = await ProductService.getProducts();
        if (res && res.data) existing = res.data;
      } catch (err) {
        console.log('No se pudo obtener productos existentes antes de sembrar:', err);
      }

      // Normalizar nombres existentes para comparación
      const existingNamesLower = new Set(
        existing.map(e => ((e.name || e.nombre || '').toString().toLowerCase()).trim())
      );

      // Crear solo los productos que no existan (compara por nombre en minúsculas)
      const toCreate = productosFallback.filter(p => {
        const nameLower = (p.nombre || p.name || '').toString().toLowerCase().trim();
        return !existingNamesLower.has(nameLower);
      });

      const promises = toCreate.map(p => {
        const payload = {
          name: p.nombre,
          categories: p.categoria,
          price: p.precio,
          image: p.imagen || imagenPlaceholder,
          Stock: !!p.stock,
          Discount: !!p.enOferta,
          stars: p.calificacion || 0
        };
        return ProductService.createProduct(payload);
      });

      const results = await Promise.allSettled(promises);
      const errors = results.filter(r => r.status === 'rejected');
      if (errors.length > 0) {
        console.log('Algunos POST fallaron al sembrar productos:', errors);
      }

      // Intentar refrescar la lista desde el backend
      try {
        const res = await ProductService.getProducts();
        if (res && res.data) setProductos(prev => mergeProducts(prev, res.data));
      } catch (refreshErr) {
        console.log('No fue posible refrescar productos desde la API tras el seed:', refreshErr);
      }

      alert(`Sembrado completado. ${results.filter(r => r.status === 'fulfilled').length} creados, ${errors.length} fallos.`);
    } catch (err) {
      console.log('Error durante el seed de productos:', err);
      alert('Error al intentar cargar productos de ejemplo; mira la consola.');
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const usuarioGuardado = localStorage.getItem('usuario');
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAuthenticated(authStatus === 'true');
    setIsAdmin(adminStatus === 'true');
    if (usuarioGuardado) setUsuario(usuarioGuardado);

    const handleAuthChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const usuarioGuardado = localStorage.getItem('usuario');
      const adminStatus = localStorage.getItem('isAdmin');
      setIsAuthenticated(authStatus === 'true');
      setIsAdmin(adminStatus === 'true');
      if (usuarioGuardado) setUsuario(usuarioGuardado);
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Cargar productos desde backend
  useEffect(() => {
    ProductService.getProducts()
      .then(res => {
        if (res && res.data) {
          // Merge para evitar duplicados
          setProductos(prev => mergeProducts(prev, res.data));
        } else {
          setProductos(prev => mergeProducts(prev, productosFallback));
        }
      })
      .catch(err => {
        console.log('No fue posible cargar productos desde la API:', err.message || err);
        setProductos(prev => mergeProducts(prev, productosFallback));
      });

    // intentar recuperar carrito desde API
    ProductService.getCart()
      .then(response => {
        if (response && response.data) setCarrito(response.data);
      })
      .catch(() => {});
  }, []);

  const tieneDescuentoDuoc = (correo) => correo && correo.toLowerCase().includes('@duocuc.cl');

  const calcularPrecioFinal = (precio, descuento) => {
    const aplicarDescuento = tieneDescuentoDuoc(usuario);
    if (!aplicarDescuento || !descuento) return precio;
    return precio - (precio * descuento / 100);
  };

  const productosFiltrados = categoriaActiva === 'Todas' ? productos : productos.filter(p => p.categoria === categoriaActiva || p.categories === categoriaActiva);

  const agregarAlCarrito = (producto) => {
    // Normalizar payload que enviaremos al backend para que puedas verificar en Postman
    const payload = {
      productId: producto.id,
      name: producto.name || producto.nombre,
      categories: producto.categories || producto.categoria,
      price: producto.price || producto.precio || 0,
      image: producto.image || producto.imagen || imagenPlaceholder,
      cantidad: 1
    };

    const existe = carrito.find(item => item.productId === producto.id || item.id === producto.id);
    if (existe) {
      // actualizar cantidad local y en la API
      const nuevo = carrito.map(item => (item.productId === producto.id || item.id === producto.id) ? { ...item, cantidad: (item.cantidad || 0) + 1 } : item);
      setCarrito(nuevo);
      const actualizado = { ...(existe), cantidad: (existe.cantidad || 0) + 1 };
      // Intentamos actualizar por productId si el backend usa ese campo
      const updateId = existe.id || existe.productId || producto.id;
      ProductService.updateCartItem(updateId, actualizado)
        .catch(err => {
          // si update falla, intentamos añadir o loguear
          ProductService.addToCart({ ...payload, cantidad: actualizado.cantidad }).catch(e => console.log('Error sync add/update:', e));
        });
    } else {
      // añadir localmente y enviar al backend
      const nuevoItemLocal = { id: producto.id, productId: producto.id, nombre: producto.name || producto.nombre, price: producto.price || producto.precio || 0, imagen: producto.image || producto.imagen || imagenPlaceholder, cantidad: 1 };
      setCarrito([...carrito, nuevoItemLocal]);
      ProductService.addToCart(payload)
        .then(res => {
          // si la API devuelve el item (con id generado), reemplazamos/actualizamos localmente
          if (res && res.data) {
            const returned = res.data;
            setCarrito(prev => prev.map(it => (it.productId === returned.productId || it.id === returned.productId) ? { ...it, apiId: returned.id, cantidad: returned.cantidad || it.cantidad } : it));
          }
        })
        .catch(err => console.log('Error al agregar item en la API:', err.message || err));
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      const actualizadoLocal = carrito.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item);
      setCarrito(actualizadoLocal);
      const item = actualizadoLocal.find(i => i.id === id);
      if (item) ProductService.updateCartItem(id, item).catch(err => console.log('Error actualizar API:', err.message || err));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
    ProductService.removeFromCart(id).catch(err => console.log('Error eliminar API:', err.message || err));
  };

  const calcularTotal = () => carrito.reduce((total, item) => total + (calcularPrecioFinal(item.precio || item.price || 0, item.descuento || item.descuento || 0) * item.cantidad), 0);
  const calcularTotalSinDescuento = () => carrito.reduce((total, item) => total + ((item.precio || item.price || 0) * item.cantidad), 0);
  const calcularAhorroTotal = () => calcularTotalSinDescuento() - calcularTotal();
  const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 0), 0);

  // Crear nuevo producto (POST)
  const handleCrearProducto = (e) => {
    e.preventDefault();
    // Preparar payload acorde al backend (ajusta nombres si es necesario)
    // Validar la URL de la imagen: si no es una URL http/https válida, usar placeholder
    const imageValue = (nuevoProducto.image && typeof nuevoProducto.image === 'string' && /^(https?:)?\/\//i.test(nuevoProducto.image))
      ? nuevoProducto.image
      : imagenPlaceholder;

    const payload = {
      name: nuevoProducto.name,
      categories: nuevoProducto.categories,
      price: Number(nuevoProducto.price),
      image: imageValue,
      Stock: !!nuevoProducto.Stock,
      Discount: !!nuevoProducto.Discount,
      stars: Number(nuevoProducto.stars)
    };
    console.log('Enviando payload a API:', payload);
    ProductService.createProduct(payload)
      .then(res => {
        console.log('Respuesta createProduct:', res && res.data ? res.data : res);
        // Si el backend devuelve el objeto creado, lo añadimos al estado (sin duplicar)
        const creado = (res && res.data) ? res.data : { ...payload, id: `local-${Date.now()}`, nombre: payload.name };
        setProductos(prev => mergeProducts(prev, [creado]));
        setMostrarForm(false);
        setApiStatus({ lastCount: null, lastError: null });
        alert('Producto creado correctamente en la API. Revisa con GET /api/products en Postman.');
      })
      .catch(err => {
        // Mostrar detalles del error HTTP (body / status) si están disponibles
        console.error('Error al crear producto en API:', err);
        if (err.response) {
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
        }
        setApiStatus(prev => ({ ...prev, lastError: err.response ? `${err.response.status} - ${JSON.stringify(err.response.data)}` : (err.message || String(err)) }));
        // Mantener comportamiento local pero informar claramente
        const creadoLocal = { ...payload, id: `local-${Date.now()}`, nombre: payload.name };
        setProductos(prev => mergeProducts(prev, [creadoLocal]));
        setMostrarForm(false);
        alert('No se pudo guardar en la API. El producto fue añadido localmente. Revisa la consola para más detalles.');
      });
  };

  const refreshFromApi = () => {
    ProductService.getProducts()
      .then(res => {
        if (res && res.data) {
          setProductos(prev => mergeProducts(prev, res.data));
          setApiStatus({ lastCount: res.data.length, lastError: null });
          alert(`Refrescado desde API: ${res.data.length} productos obtenidos.`);
        } else {
          setApiStatus({ lastCount: 0, lastError: null });
          alert('Refrescado: respuesta vacía de la API.');
        }
      })
      .catch(err => {
        console.error('Error al refrescar desde API:', err);
        setApiStatus({ lastCount: null, lastError: err.message || String(err) });
        alert('Error al refrescar desde la API. Revisa la consola.');
      });
  };

  const handleEditarProducto = (producto) => {
    setEditandoProducto({ ...producto });
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    if (!editandoProducto) return;

    const payload = {
      name: editandoProducto.name || editandoProducto.nombre,
      categories: editandoProducto.categories || editandoProducto.categoria,
      price: Number(editandoProducto.price || editandoProducto.precio),
      image: editandoProducto.image || editandoProducto.imagen || imagenPlaceholder,
      Stock: !!editandoProducto.Stock,
      Discount: !!editandoProducto.Discount,
      stars: Number(editandoProducto.stars || editandoProducto.calificacion)
    };

    ProductService.updateProduct(editandoProducto.id, payload)
      .then(res => {
        const actualizado = (res && res.data) ? res.data : { ...editandoProducto, ...payload };
        setProductos(prev => prev.map(p => p.id === editandoProducto.id ? actualizado : p));
        setEditandoProducto(null);
        alert('Producto actualizado correctamente.');
      })
      .catch(err => {
        console.error('Error al actualizar producto:', err);
        alert('Error al actualizar. Revisa la consola.');
      });
  };

  const handleEliminarProducto = (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    ProductService.deleteProduct(id)
      .then(() => {
        setProductos(prev => prev.filter(p => p.id !== id));
        alert('Producto eliminado correctamente.');
      })
      .catch(err => {
        console.error('Error al eliminar producto:', err);
        alert('Error al eliminar. Revisa la consola.');
      });
  };

  return (
    <div className="tienda-contenedor">
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Tienda</h2>
        {isAdmin && (
          <div>
            <button onClick={() => setMostrarForm(s => !s)} style={{ marginRight: 8 }}>{mostrarForm ? 'Cancelar' : 'Nuevo producto'}</button>
            <button onClick={seedProducts} disabled={seeding} style={{ marginLeft: 8 }}>{seeding ? 'Cargando...' : 'Cargar productos al backend'}</button>
          </div>
        )}
        {!isAdmin && isAuthenticated && (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Solo admin puede crear/editar productos</p>
        )}
      </div>

      {mostrarForm && isAdmin && (
        <form onSubmit={handleCrearProducto} style={{ padding: '0 1rem 1rem 1rem', display: 'grid', gap: 8 }}>
          <input placeholder="Nombre" value={nuevoProducto.name} onChange={e => setNuevoProducto({ ...nuevoProducto, name: e.target.value })} required />
          <input placeholder="Categorías" value={nuevoProducto.categories} onChange={e => setNuevoProducto({ ...nuevoProducto, categories: e.target.value })} />
          <input placeholder="Precio" type="number" value={nuevoProducto.price} onChange={e => setNuevoProducto({ ...nuevoProducto, price: e.target.value })} required />
          <input placeholder="Imagen URL" value={nuevoProducto.image} onChange={e => setNuevoProducto({ ...nuevoProducto, image: e.target.value })} />
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={nuevoProducto.Stock} onChange={e => setNuevoProducto({ ...nuevoProducto, Stock: e.target.checked })} /> En stock
            <input type="checkbox" checked={nuevoProducto.Discount} onChange={e => setNuevoProducto({ ...nuevoProducto, Discount: e.target.checked })} style={{ marginLeft: 16 }} /> En oferta
          </label>
          <input placeholder="Estrellas (1-5)" type="number" value={nuevoProducto.stars} min={1} max={5} onChange={e => setNuevoProducto({ ...nuevoProducto, stars: e.target.value })} />
          <div>
            <button type="submit">Crear producto </button>
          </div>
        </form>
      )}

      <div style={{ padding: '0 1rem' }}>
        {isAdmin && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <button onClick={refreshFromApi} style={{ padding: '0.5rem 0.8rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Refrescar desde API</button>
            <div style={{ fontSize: 14 }}>
              {apiStatus.lastCount !== null && <span>Productos en API: <strong>{apiStatus.lastCount}</strong></span>}
              {apiStatus.lastError && <span style={{ color: 'crimson' }}> Error API: {apiStatus.lastError}</span>}
            </div>
          </div>
        )}
        <div className="categorias-lista">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoriaActiva(cat)} className={`categoria-boton ${categoriaActiva === cat ? 'categoria-activa' : ''}`}>{cat}</button>
          ))}
        </div>

        <div className="productos-grid">
          {productosFiltrados.map(producto => {
            const precio = producto.price || producto.precio || 0;
            const descuento = producto.descuento || producto.descuento || 0;
            const precioFinal = calcularPrecioFinal(precio, descuento);
            return (
              <div key={producto.id || producto.name} className="producto-card">
                <div className="producto-imagen-contenedor">
                  <img src={producto.image || producto.imagen || imagenPlaceholder} alt={producto.name || producto.nombre} className="producto-imagen" onError={e => { e.target.onerror = null; e.target.src = imagenPlaceholder; }} />
                </div>
                <h3 className="producto-nombre">{producto.name || producto.nombre}</h3>
                <p className="producto-codigo">Código: {producto.id}</p>
                <div className="producto-calificacion">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < (producto.stars || producto.calificacion || 0) ? 'var(--color-badge-oferta)' : '#ccc', fontSize: '1.2rem' }}>★</span>
                  ))}
                </div>
                <div className="producto-precio-info">
                  <p className="precio-final">${precioFinal.toLocaleString()} <span className="precio-unidad">c/u</span></p>
                </div>
                <button onClick={() => agregarAlCarrito(producto)} className="producto-boton-agregar"> Añadir al carrito</button>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button onClick={() => handleEditarProducto(producto)} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Editar</button>
                    <button onClick={() => handleEliminarProducto(producto.id)} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Eliminar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={() => setMostrarCarrito(true)} className="carrito-flotante-boton" aria-label='abrir-carrito'>
        🛒
        {totalItems > 0 && (<span className="carrito-flotante-contador">{totalItems}</span>)}
      </button>

      {/* Modal de Edición de Productos */}
      {editandoProducto && isAdmin && (
        <div className="modal-overlay">
          <div className="carrito-modal">
            <div className="modal-header">
              <h2 className="modal-titulo">Editar Producto</h2>
              <button onClick={() => setEditandoProducto(null)} className="modal-cerrar-boton">✕</button>
            </div>
            <form onSubmit={handleGuardarEdicion} style={{ padding: '1rem', display: 'grid', gap: 8 }}>
              <input placeholder="Nombre" value={editandoProducto.name || editandoProducto.nombre} onChange={e => setEditandoProducto({ ...editandoProducto, name: e.target.value, nombre: e.target.value })} required />
              <input placeholder="Categorías" value={editandoProducto.categories || editandoProducto.categoria} onChange={e => setEditandoProducto({ ...editandoProducto, categories: e.target.value, categoria: e.target.value })} />
              <input placeholder="Precio" type="number" value={editandoProducto.price || editandoProducto.precio} onChange={e => setEditandoProducto({ ...editandoProducto, price: e.target.value, precio: e.target.value })} required />
              <input placeholder="Imagen URL" value={editandoProducto.image || editandoProducto.imagen} onChange={e => setEditandoProducto({ ...editandoProducto, image: e.target.value, imagen: e.target.value })} />
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="checkbox" checked={editandoProducto.Stock} onChange={e => setEditandoProducto({ ...editandoProducto, Stock: e.target.checked })} /> En stock
                <input type="checkbox" checked={editandoProducto.Discount} onChange={e => setEditandoProducto({ ...editandoProducto, Discount: e.target.checked })} style={{ marginLeft: 16 }} /> En oferta
              </label>
              <input placeholder="Estrellas (1-5)" type="number" value={editandoProducto.stars || editandoProducto.calificacion} min={1} max={5} onChange={e => setEditandoProducto({ ...editandoProducto, stars: e.target.value, calificacion: e.target.value })} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.7rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar cambios</button>
                <button type="button" onClick={() => setEditandoProducto(null)} style={{ flex: 1, padding: '0.7rem', backgroundColor: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarCarrito && (
        <div className="modal-overlay">
          <div className="carrito-modal">
            <div className="modal-header">
              <h2 className="modal-titulo">🛒 Mi Carrito</h2>
              <button onClick={() => setMostrarCarrito(false)} className="modal-cerrar-boton">✕</button>
            </div>

            <div className={`carrito-estado-descuento ${tieneDescuentoDuoc(usuario) ? 'estado-activo' : 'estado-inactivo'}`}>
              <span style={{ fontSize: '1.5rem' }}>✉️</span>
              <div>
                <p className="estado-titulo">{tieneDescuentoDuoc(usuario) ? '✓ Descuentos DuocUC aplicados' : isAuthenticated ? '✗ Sin descuentos DuocUC' : '✗ Inicia sesión con @duocuc.cl'}</p>
                {isAuthenticated && <p className="estado-subtitulo">{usuario}</p>}
              </div>
            </div>

            <div className="modal-cuerpo">
              {carrito.length === 0 ? (
                <p className="carrito-vacio-mensaje">Tu carrito está vacío</p>
              ) : (
                carrito.map(item => {
                  const precioFinal = calcularPrecioFinal(item.precio || item.price || 0, item.descuento || 0);
                  return (
                    <div key={item.id} className="carrito-item">
                      <div className="carrito-item-imagen-contenedor"><img src={item.imagen || item.image || imagenPlaceholder} alt={item.nombre || item.name} className="carrito-item-imagen" /></div>
                      <div className="carrito-item-detalles">
                        <h4 className="carrito-item-nombre">{item.nombre || item.name}</h4>
                        <p className="carrito-item-precio-unitario">${precioFinal.toLocaleString()} c/u</p>
                      </div>
                      <div className="carrito-item-cantidad-control">
                        <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="cantidad-boton cantidad-restar">−</button>
                        <span className="cantidad-display">{item.cantidad} unidad(es)</span>
                        <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="cantidad-boton cantidad-sumar">+</button>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="cantidad-boton cantidad-eliminar" aria-label={`eliminar ${item.nombre || item.name}`}>🗑️</button>
                      </div>
                      <div className="carrito-item-subtotal"><p className="carrito-item-subtotal-texto">${((precioFinal) * (item.cantidad || 0)).toLocaleString()}</p></div>
                    </div>
                  );
                })
              )}
            </div>

            {carrito.length > 0 && (
              <div className="modal-footer">
                {tieneDescuentoDuoc(usuario) && calcularAhorroTotal() > 0 && (
                  <div className="resumen-ahorro">
                    <div className="ahorro-linea"><span>Subtotal:</span><span>${calcularTotalSinDescuento().toLocaleString()}</span></div>
                    <div className="ahorro-linea ahorro-destacado"><span> Descuento aplicado:</span><span>-${calcularAhorroTotal().toLocaleString()}</span></div>
                  </div>
                )}
                <div className="carrito-total"><span>Total:</span><span className="carrito-total-valor">${calcularTotal().toLocaleString()}</span></div>
                <button className="checkout-boton">Proceder al pago</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TiendaHuertoHogar;
