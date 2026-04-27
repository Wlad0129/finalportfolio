/* ==================================================
   EL CEREBRO DE LA PÁGINA (script.js)
   Aquí agregamos toda la magia e interacción para 
   que nuestro portafolio sea súper dinámico y divertido.
   ================================================== */


/* ── MÓDULO 1: EL MENSAJITO DE BIENVENIDA (TOAST) ──
   Queremos que cuando alguien entre, lo reciba un 
   pequeño cartel amistoso en la esquina. ¡Pero que 
   luego desaparezca para no estorbar!
   ------------------------------------------------- */
window.addEventListener('load', () => {
  const toast = document.getElementById('welcome-toast');
  
  // Si alguien está en la página de mascotas, no verá este mensajito porque allá no existe el cartel
  if (!toast) return;

  // Le ponemos el texto de saludo cariñoso
  toast.textContent = '👋 Welcome to my portfolio!';
  
  // Esperamos medio segundito y ¡Puf! aparece en pantalla
  setTimeout(() => toast.classList.add('show'), 500);

  // Y a los 4.5 segundos, le damos las gracias y lo escondemos
  setTimeout(() => toast.classList.remove('show'), 4500);
});


/* ── MÓDULO 2: EL BOTÓN DE DATOS CURIOSOS ──
   En lugar de una presentación aburrida, le dejamos al
   visitante un botón que alterna nuestra biografía 
   con un dato divertido sobre nuestras mascotas.
   ------------------------------------------------- */
const btnFunFact = document.getElementById('btn-fun-fact');
const bioParagraph = document.getElementById('about-bio');

// Guardamos en la memoria lo que decía originalmente para no perderlo
const bioOriginal = bioParagraph ? bioParagraph.innerHTML : '';
// Y aquí redactamos nuestro dato curioso estrella
const bioFunFact  = '🐾 Fun fact: I share my home with a Cane Corso, a Labrador, a Pitbull, a Harpy Eagle, a Paso Horse, and a Galápagos Tortoise. My debugging sessions have a very diverse audience.';

// Este es nuestro "interruptor mental". Nos dice si el dato curioso está encendido o apagado
let showingFact = false; 

if (btnFunFact && bioParagraph) {
  btnFunFact.addEventListener('click', () => {
    // Al hacer clic, volteamos el interruptor (de encendido a apagado, y viceversa)
    showingFact = !showingFact;

    // Si está encendido (true), mostramos el dato curioso. Si no, regresamos a lo aburrido.
    bioParagraph.innerHTML  = showingFact ? bioFunFact : bioOriginal;
    
    // Y para que todo tenga sentido, le cambiamos el texto al botón también
    btnFunFact.textContent  = showingFact ? 'Back to Bio 👤' : 'Show Fun Fact ✨';
  });
}


/* ── MÓDULO 3: EL PODER DE OCULTAR COSAS ──
   A veces la pantalla se ve muy llena. Le daremos 
   al usuario el control para esconder y aparecer 
   sus herramientas (skills) como por arte de magia.
   ------------------------------------------------- */
const btnToggleSkills = document.getElementById('btn-toggle-skills');
const skillsGrid      = document.getElementById('skills-grid');

if (btnToggleSkills && skillsGrid) {
  btnToggleSkills.addEventListener('click', () => {
    // toggle() es súper listo: si tiene la etiqueta de escondido, se la quita. Si no la tiene, se la pone.
    skillsGrid.classList.toggle('hidden');

    // Le preguntamos a la grilla si en este momento está escondida
    const isHidden = skillsGrid.classList.contains('hidden');
    
    // Y actualizamos el botón para que diga "Mostrar" o "Ocultar" dependiendo del caso
    btnToggleSkills.textContent = isHidden ? 'Show Skills' : 'Hide Skills';
  });
}


/* ── MÓDULO 4: VIAJE RÁPIDO A LAS MASCOTAS ──
   Este es el encargado de que al darle al botón "My Pets",
   el visitante viaje al instante a esa bonita página.
   ------------------------------------------------- */
const btnPets = document.getElementById('btn-pets');
if (btnPets) {
  btnPets.addEventListener('click', () => {
    // Ordenamos al navegador llevarnos a nuestra galería de mascotas
    window.location.href = 'mascotas.html';
  });
}


/* ── MÓDULO 5: DOMANDO EL FORMULARIO DE CONTACTO ──
   Los formularios siempre quieren recargar toda la página al enviarse.
   Nosotros somos más modernos y frenaremos eso para que 
   la experiencia sea suave como la seda.
   ------------------------------------------------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Detenemos el impulso natural del navegador de recargar la página
    e.preventDefault();

    // Buscamos nuestro lugarcito para avisar que todo salió excelente
    const status = document.getElementById('form-status');
    status.textContent = '✓ Message sent! I will get back to you soon.';

    // Borramos todo lo que la persona escribió para que el formulario quede reluciente
    contactForm.reset();

    // Al cabo de 4 segundos, desaparecemos el mensaje de éxito como si nada hubiera pasado
    setTimeout(() => { status.textContent = ''; }, 4000);
  });
}


/* ── MÓDULO 6: EL DETECTIVE DE NAVEGACIÓN ──
   Esto es muy pro: mientras el usuario baja por la página,
   vamos iluminando de color blanco en el menú superior 
   la sección exacta por la que va pasando.
   ------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

// Asegurémonos de que de verdad existan menús y secciones que vigilar
if (sections.length && navLinks.length) {
  // Creamos a nuestro pequeño detective que avisa cuando una sección asoma a la pantalla
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // ¿Alguien entró en el área visible?
      if (entry.isIntersecting) {
        // Agregamos la clase visible para disparar la animación de entrada
        entry.target.classList.add('visible');

        // Entonces revisamos uno por uno los enlaces de nuestro menú superior
        navLinks.forEach((link) => {
          // Nos fijamos si este enlace corresponde a la sección que estamos viendo ahorita
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          
          // Si es así, lo pintamos de blanquito bonito. A los demás les quitamos el estilo.
          link.style.color = isActive ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.2 }); // Bajamos un poco el umbral para que la animación empiece antes

  // Repartimos un detective para cada sección de la página
  sections.forEach((section) => observer.observe(section));
}


/* ── MÓDULO 7: EL MENÚ HAMBURGUESA ──
   Controlamos la apertura y cierre del menú en móviles, 
   asegurándonos de que se sienta fluido y se cierre al elegir una opción.
   ------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const menuOverlay = document.getElementById('menu-overlay');

if (hamburger && navLinksContainer && menuOverlay) {
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Evitamos que el fondo se mueva cuando el menú está abierto
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);

  // Cerramos el menú automáticamente cuando el usuario hace clic en un enlace
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}
