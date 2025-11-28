import '../organisms/styles/Informacion.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function Nosotros() {
  return (
    <>
    <div>
      
      <div className="backgroundimage">
        <div className="container nosotros-page">
          <header className="text-center mb-5">
            <h1 className="display-4 text-success fw-bold">Conoce al equipo detrás de DulceLobito</h1>
            <p className="lead text-muted">
              Nuestra misión es llevar productos frescos directamente a tu hogar
            </p>
          </header>

          <hr className="my-5 border-success opacity-25" />

          <section className="team-section mb-5">
            <h2 className="text-center mb-4 text-dark">👥 Equipo Fundador</h2>
            <div className="row justify-content-center g-4">
              
              {/* MIEMBRO 1 */}
              <div className="col-md-6 col-lg-4">
                <div className="card shadow-sm team-card">
                  <div className="card-body text-center">
                    <div className="team-photo-placeholder mx-auto mb-3">
                      <div style={{fontSize: '50px'}}>👤</div>
                    </div>
                    <h4 className="card-title text-success fw-bold justify-content-center">
                      Luis Paredes
                    </h4>
                    <p className="card-subtitle mb-2 text-muted">
                      Experto en Logística y Operaciones Automatizadas
                    </p>
                    <span className="badge bg-success mb-3">Factorio</span>
                    <p className="card-text text-start">
                      Con más de 10 años de experiencia en optimización de cadenas de suministro, 
                      Luis lidera nuestra operación logística asegurando entregas rápidas y eficientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* MIEMBRO 2 */}
              <div className="col-md-6 col-lg-4">
                <div className="card shadow-sm team-card">
                  <div className="card-body text-center">
                    <div className="team-photo-placeholder mx-auto mb-3">
                      <div style={{fontSize: '50px'}}>👤</div>
                    </div>
                    <h4 className="card-title text-success fw-bold justify-content-center">
                      Camilo Araneda
                    </h4>
                    <p className="card-subtitle mb-2 text-muted">
                      Experto en Agricultura y Calidad de Productos Orgánicos
                    </p>
                    <span className="badge bg-success mb-3">Stardew Valley</span>
                    <p className="card-text text-start">
                      Ingeniero agrónomo especializado en cultivos orgánicos. Camilo supervisa 
                      personalmente la calidad de todos nuestros productos desde la cosecha.
                    </p>
                  </div>
                </div>
              </div>

              {/* MIEMBRO 3 - NUEVO */}
              <div className="col-md-6 col-lg-4">
                <div className="card shadow-sm team-card">
                  <div className="card-body text-center">
                    <div className="team-photo-placeholder mx-auto mb-3">
                      <div style={{fontSize: '50px'}}>👤</div>
                    </div>
                    <h4 className="card-title text-success fw-bold justify-content-center">
                      Alan Thomas 
                    </h4>
                    <p className="card-subtitle mb-2 text-muted">
                      Especialista en Sostenibilidad y Desarrollo Comunitario
                    </p>
                    <span className="badge bg-success mb-3">Viva el Lol</span>
                    <p className="card-text text-start">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      aaaaaaaaaaaaaaaaaaaaaaaa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-5 border-success opacity-25" />

          <section className="impact-section mb-5 tittle p-4 bg-light rounded shadow-sm">
            <h2 className="text-center mb-5 text-secondary"> Nuestro Compromiso con el Medio Ambiente</h2>

            <div className="row justify-content-center text-center">
              
              <div className="col-md-4 mb-4">
                <div style={{fontSize: '40px', marginBottom: '12px'}}>🌍</div>
                <h4 className="fw-bold text-success">Reducción de Huella de Carbono</h4>
                <p className="text-muted">
                  Rutas optimizadas y transporte eficiente para minimizar emisiones
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <div style={{fontSize: '40px', marginBottom: '12px'}}>🍃</div>
                <h4 className="fw-bold text-success">Empaques 100% Reciclados</h4>
                <p className="text-muted">
                  Materiales biodegradables y reutilizables en todas nuestras entregas
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <div style={{fontSize: '40px', marginBottom: '12px'}}>⚡</div>
                <h4 className="fw-bold text-success">Fomento de Agricultura</h4>
                <p className="text-muted">
                  Apoyo directo a productores locales y prácticas agrícolas sostenibles
                </p>
              </div>
            </div>
            <h6 className="d-flex justify-content-center" style={{fontSize:'20px'}}>
              ¡Síguenos en nuestro siguiente evento!
            </h6>
          </section>

        </div>

        <div className="mapa-contenedor">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518.8185913067723!2d-16.773454623946133!3d28.121558207099902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a91052b1aa587%3A0xdcceb414857dcc6f!2sBilbao%20House!5e0!3m2!1ses-419!2scl!4v1761183980082!5m2!1ses-419!2scl" 
            width="600" 
            height="450" 
            style={{border: 0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Bilbao House">
          </iframe>
        </div>
      </div>
      </div>
      
    
    </>
  );
}

export default Nosotros;