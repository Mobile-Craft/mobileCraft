import type {
  Education,
  Expertise,
  Job,
  MethodItem,
  NavLink,
  Project,
  Solution,
  StackGroup,
  Stat,
} from '@/shared/model';

/**
 * Contenido en español. Es el diccionario de referencia: el tipo `Dictionary`
 * se deriva de aquí, así que cualquier idioma nuevo tiene que cubrir la misma
 * forma exacta o TypeScript lo rechaza.
 *
 * Los `href` de la navegación son anclas a ids del DOM, no texto: se mantienen
 * idénticos en todos los idiomas.
 */
export const es = {
  htmlLang: 'es',
  ogLocale: 'es_DO',

  meta: {
    title: 'Elder Tavárez — Ingeniero de Software Móvil | React Native & Flutter',
    description:
      'Ingeniero de software con más de 6 años desarrollando y liderando aplicaciones móviles en React Native y Flutter para banca, pensiones, seguros y sector público en República Dominicana. Apps en producción en iOS y Android.',
    ogImageAlt:
      'Elder Tavárez — Ingeniero de Software Móvil. React Native y Flutter para Banreservas, AFP Siembra, Humano y APORDOM.',
  },

  a11y: {
    skipLink: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    themeToLight: 'Cambiar a tema claro',
    themeToDark: 'Cambiar a tema oscuro',
    themeToggle: 'Cambiar tema',
    languageGroup: 'Idioma',
    switchLanguage: (name: string) => `Cambiar el idioma a ${name}`,
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    close: 'Cerrar',
  },

  nav: {
    links: [
      { href: '#experiencia', label: 'Experiencia' },
      { href: '#proyectos', label: 'Proyectos' },
      { href: '#aporte', label: 'En equipo' },
      { href: '#stack', label: 'Stack' },
      { href: '#contacto', label: 'Contacto' },
    ] as NavLink[],
    cta: 'Escríbame',
  },

  hero: {
    role: 'Ingeniero de Software · Mobile Lead',
    greeting: (name: string) => `Hola, soy ${name} 👋`,
    headline:
      'Desarrollo aplicaciones web y móviles multiplataforma para empresas y personas que necesitan soluciones robustas y escalables.',
    lead: 'Más de 5 años creando productos digitales para empresas en República Dominicana y Latinoamérica. Soy Ingeniero de Software, especialista en **React Native** y consultor mobile, enfocado en construir apps sólidas, fáciles de mantener y pensadas para generar impacto real en el negocio.',
    ctaSolutions: 'Ver cómo aporto',
    ctaProjects: 'Ver proyectos',
    ctaCv: 'Descargar CV (PDF)',
    location: 'Santo Domingo, República Dominicana',
    availability: 'Disponible para remoto e híbrido · Español nativo · Inglés B1',
    stats: [
      { target: 6, suffix: '+', label: 'años en desarrollo móvil' },
      { target: 4, suffix: '', label: 'apps en producción' },
      { target: 4, suffix: '', label: 'devs liderados como Tech Lead' },
    ] as Stat[],
  },

  compile: {
    filename: 'elder-tavarez.ts',
    typeName: 'Especialista',
    props: {
      name: 'nombre',
      experience: 'experiencia',
      apps: 'appsEnProduccion',
      focus: 'especialidad',
      leadership: 'liderazgo',
    },
    experienceValue: '6+ años',
    focusValue: 'React Native · Flutter · iOS · Android',
    comment: '// Compila el perfil para conocerlo.',
    idle: 'Presiona ▶ para compilar el perfil',
    running: 'Compilando…',
    again: 'Compilar de nuevo',
    start: 'Compilar perfil',
    progressLabel: 'Progreso de compilación',
    steps: [
      'Resolviendo módulos…',
      'Transformando TypeScript…',
      'Generando bundle de producción…',
      'Midiendo peso comprimido…',
      'Build listo ✓',
    ],
    /**
     * Salida real del build, no un guion: los valores los inyecta
     * `vite/plugins/buildInfo.ts` midiendo el propio bundle.
     */
    build: {
      label: 'Salida del build',
      modules: (count: string) => `${count} módulos transformados`,
      size: (kb: string) => `${kb} kB en la primera carga (gzip)`,
      commit: (sha: string, date: string) => `commit ${sha} · ${date}`,
    },
    identityRole: 'Ingeniero de Software · Mobile Lead — Santo Domingo, RD',
    identityChips: ['6+ años', '4 apps en producción', 'liderazgo: true'],
    portraitAlt: (name: string) => `Retrato de ${name}`,
  },

  clients: {
    aria: 'Empresas y clientes',
    label: 'Empresas y clientes para los que he construido',
    footnote: 'Banca · Pensiones · Seguros y salud · Sector público',
  },

  expertise: {
    eyebrow: 'Experiencia comprobada',
    title: 'En qué soy experto',
    lead: 'Seis áreas donde tengo experiencia comprobada en producción, no en tutoriales.',
    items: [
      {
        n: '01',
        title: 'Desarrollo multiplataforma iOS + Android',
        body: 'Un solo código base, dos tiendas. Trabajo en React Native con TypeScript cuando el equipo viene de web y hay que iterar rápido, y en Flutter cuando el producto necesita una capa de UI muy controlada y consistente. He entregado apps en producción en ambos ecosistemas, así que puedo recomendar cuál conviene según tu equipo y tu producto — no según cuál prefiero.',
      },
      {
        n: '02',
        title: 'Seguridad móvil',
        body: 'Segundo factor con TOTP (RFC 6238), cifrado de datos sensibles, almacenamiento en el llavero del sistema (Keychain en iOS, Keystore en Android), autenticación biométrica y tokenización de medios de pago.',
      },
      {
        n: '03',
        title: 'Rendimiento y optimización',
        body: 'Apps que abren lento, listas que saltan, pantallas que se congelan. Re-renders innecesarios, listas sin virtualizar, trabajo bloqueando el hilo de JavaScript, imágenes sin dimensionar, arranque cargando lo que no hace falta todavía.',
      },
      {
        n: '04',
        title: 'Integraciones críticas',
        body: 'Pasarelas de pago dentro de la app con manejo idempotente para que un reintento no cobre dos veces. Geolocalización y mapas. Notificaciones push segmentadas con deep links que abren la pantalla correcta. APIs REST con refresco de token, reintentos y caché offline.',
      },
      {
        n: '05',
        title: 'Liderazgo técnico y arquitectura',
        body: 'Lideré una unidad móvil con 4 desarrolladores a mi cargo. Traduzco requerimientos de negocio a especificaciones técnicas, defino la arquitectura base y los estándares del proyecto, estimo esfuerzo, reparto trabajo y hago revisión de código. Si tu equipo móvil no tiene quien marque la dirección técnica, ese es el rol.',
      },
      {
        n: '06',
        title: 'Publicación y ciclo de vida en tiendas',
        body: 'Firma de builds, ambientes separados por flavor, canales de prueba, etiquetas de privacidad en App Store Connect, declaración de seguridad de datos en Google Play y manejo del proceso de revisión. Una app no está terminada hasta que está instalada en un teléfono.',
      },
    ] as Expertise[],
  },

  solutions: {
    eyebrow: 'En equipo',
    title: 'Lo que aporto a un equipo',
    lead: 'Situaciones por las que ya pasé dentro de equipos de producto, y el rol que tomé en cada una.',
    items: [
      {
        id: 'join-live-codebase',
        title: 'Sumar desde las primeras semanas',
        who: 'Cuando el equipo necesita capacidad sin frenar lo que ya funciona.',
        body: 'Es lo que hice en AFP Siembra, HUMANO y Banreservas: entrar a una app con usuarios activos, entender sus convenciones y entregar módulos nuevos sin romper lo que ya está estable.',
      },
      {
        id: 'greenfield',
        title: 'Arrancar una app nueva',
        who: 'Cuando el producto está definido y hace falta construir la base.',
        body: 'Análisis de requerimientos, especificación técnica, arquitectura, desarrollo iOS y Android y publicación en ambas tiendas. Dejo el código por capas y documentado, para que cualquiera del equipo pueda continuarlo.',
      },
      {
        id: 'legacy-stability',
        title: 'Estabilizar una app heredada',
        who: 'Cuando los bugs crecen más rápido que las features.',
        body: 'Diagnóstico del estado real del código, bugs priorizados por usuarios afectados —según datos de crash reporting, no por orden de llegada al backlog— y mejoras por etapas que no congelan el roadmap.',
      },
      {
        id: 'critical-flows',
        title: 'Hacerme cargo de los flujos críticos',
        who: 'Pagos, autenticación y datos sensibles, donde un error cuesta dinero o confianza.',
        body: 'Cobros in-app con operaciones idempotentes y reconciliación cuando el cobro pasó pero la respuesta no llegó. Segundo factor con TOTP, biometría y manejo centralizado de sesión expirada.',
      },
      {
        id: 'tech-lead',
        title: 'Liderar técnicamente',
        who: 'Cuando hay desarrolladores pero falta dirección técnica.',
        body: 'Lideré a 4 desarrolladores: definí arquitectura y estándares de código, escribí especificaciones técnicas, estimé esfuerzo, repartí trabajo e hice revisión de código y acompañamiento al equipo.',
      },
      {
        id: 'cross-team',
        title: 'Trabajar entre áreas',
        who: 'Cuando una feature toca producto, diseño, QA y backend.',
        body: 'Traduzco requerimientos de negocio a especificaciones técnicas, coordino con diseño y backend, valido cada entrega con QA e instrumento analíticas y crash reporting para saber si lo que salió funciona.',
      },
    ] as Solution[],
  },

  projects: {
    eyebrow: 'Proyectos',
    title: 'Apps en producción, usadas todos los días',
    cardCta: 'Ver caso',
    cardTriggerHint: ' — ver el caso completo',
    modal: {
      what: 'Qué es',
      challenge: 'El reto',
      did: 'Lo que hice',
      tech: 'Tecnologías',
      ios: 'Ver en App Store ↗',
      android: 'Ver en Google Play ↗',
      carousel: 'carrusel',
      galleryLabel: (name: string) => `Capturas de ${name}`,
      previousShot: 'Captura anterior',
      nextShot: 'Captura siguiente',
      shotLabel: (index: number, total: number) => `Ver captura ${index} de ${total}`,
    },
    items: [
      {
        id: 'mi-siembra',
        name: 'Mi Siembra',
        org: 'AFP Siembra',
        status: 'Producción',
        meta: 'Fondo de pensiones · Flutter · Tech Lead · Jun 2023 – Ene 2024',
        chips: ['Flutter', 'TOTP', 'Geolocalización', 'Push'],
        what: 'La app donde los afiliados consultan el balance de su cuenta de pensión, invierten en su fondo y canjean ofertas de aliados según su ubicación.',
        challenge:
          'Sumar funcionalidades a una app en producción con usuarios activos, en un dominio financiero donde cada operación sensible necesita una segunda barrera de autenticación.',
        bullets: [
          'Lideré el desarrollo de las nuevas funcionalidades: carnet virtual, envío de notificaciones y flujo de ofertas para clientes.',
          'Estructuré el código por capas —presentación, dominio, datos— con inyección de dependencias y un manejador de estado por flujo, de modo que las pantallas nuevas no tocaran las existentes.',
          'Implementé segundo factor con TOTP (RFC 6238) para autorizar operaciones sobre el fondo, con la semilla cifrada y tolerancia al desfase de reloj del dispositivo.',
          'Construí el carnet virtual con consulta offline: la credencial se cachea cifrada en el almacenamiento seguro del sistema para que el afiliado pueda mostrarla sin conexión.',
          'Desarrollé el motor de ofertas por geolocalización, con consulta por radio, ordenamiento por distancia y degradación controlada cuando se niega el permiso de ubicación.',
          'Integré notificaciones push segmentadas por evento —balance, aportes, campañas— con deep links a la pantalla correspondiente.',
          'Monté la capa de red con interceptores para refresco de token, reintentos con backoff exponencial y manejo centralizado de errores.',
          'Instrumenté analíticas por paso de embudo y reporte de crashes, para responder con datos dónde abandonaban los usuarios.',
          'Trabajé en conjunto con QA y BackEnd para validar cada feature antes del release.',
        ],
        stack: [
          'Flutter',
          'Dart',
          'Arquitectura por capas',
          'Almacenamiento seguro (Keychain / Keystore)',
          'Cifrado',
          'TOTP',
          'Geolocalización',
          'Push Notifications',
          'Deep Linking',
          'Firebase',
          'Analíticas',
          'Crash reporting',
          'REST',
          'Azure DevOps',
          'Git',
          'App Store Connect',
          'Google Play Console',
        ],
        ios: 'https://apps.apple.com/do/app/mi-siembra/id1495099098',
        android: 'https://play.google.com/store/apps/details?id=com.appmovil.siembra',
        cover: '/assets/siembra-1.jpg',
        coverAlt: 'App Mi Siembra — acceso',
        shots: [
          {
            src: '/assets/siembra-1.jpg',
            alt: 'Mi Siembra — pantalla de acceso',
            caption: 'Acceso con validación segura',
          },
          {
            src: '/assets/siembra-3.jpg',
            alt: 'Mi Siembra — notificaciones',
            caption: 'Notificaciones de balance y aportes',
          },
          {
            src: '/assets/siembra-2.jpg',
            alt: 'Mi Siembra — código QR del club de aliados',
            caption: 'Carnet virtual y club de aliados',
          },
        ],
      },
      {
        id: 'humano',
        name: 'HUMANO',
        org: 'Grupo Humano',
        status: 'Producción',
        meta: 'Seguros y salud · React Native · Lead · Feb 2022 – May 2022',
        chips: ['React Native', 'Pasarela de pagos', 'Google Maps'],
        what: 'Consultas médicas virtuales, pago de pólizas, solicitud de medicamentos y autorización de procedimientos médicos desde el teléfono.',
        challenge:
          'Integrar una pasarela de pagos dentro de una app de seguros ya existente, sin manejar datos de tarjeta en el dispositivo y sin que un doble tap o un reintento de red generara un cobro duplicado.',
        bullets: [
          'Lideré la implementación de la pasarela de pagos in-app, con tokenización del lado del proveedor —la app nunca almacena el número de tarjeta— y operaciones idempotentes contra el doble cobro.',
          'Manejé los estados intermedios del pago: pendiente, rechazado, timeout, y la reconciliación cuando el cobro pasó pero la respuesta no llegó.',
          'Implementé geolocalización para el flujo de farmacia más cercana: permisos, búsqueda por radio, mapa con marcadores y fallback a búsqueda manual por dirección.',
          'Resolví bugs heredados priorizando por usuarios afectados según el reporte de crashes.',
          'Trabajo de rendimiento: migración a listas virtualizadas, eliminación de re-renders innecesarios y reducción del trabajo en el arranque.',
        ],
        stack: [
          'React Native',
          'JavaScript',
          'Pasarela de pagos',
          'Google Maps',
          'Geolocalización',
          'React Navigation',
          'REST',
          'Azure DevOps',
          'Git',
        ],
        ios: 'https://apps.apple.com/do/app/humano/id905470413',
        android: 'https://play.google.com/store/apps/details?id=com.arshumano.app.android',
        cover: '/assets/humano-1.jpg',
        coverAlt: 'App Humano — pantalla de inicio',
        shots: [
          {
            src: '/assets/humano-1.jpg',
            alt: 'Humano — pantalla de inicio',
            caption: 'Inicio con consulta médica virtual',
          },
          {
            src: '/assets/humano-2.jpg',
            alt: 'Humano — sección de servicios',
            caption: 'Servicios y autorizaciones',
          },
          {
            src: '/assets/humano-3.jpg',
            alt: 'Humano — gestión de pólizas',
            caption: 'Pago y gestión de pólizas',
          },
          {
            src: '/assets/humano-4.jpg',
            alt: 'Humano — tienda de productos',
            caption: 'Pedidos a farmacia cercana',
          },
        ],
      },
      {
        id: 'apordom',
        name: 'APORDOM',
        org: 'Autoridad Portuaria Dominicana',
        status: 'Producción',
        meta: 'Sector público · Flutter · Lead',
        chips: ['Flutter', 'Google Maps', 'Caché offline', 'Push'],
        what: 'La herramienta para agilizar trámites portuarios, conocer los puertos del país y mantenerse al día con sus noticias.',
        challenge:
          'Una app de entidad gubernamental, con requisitos de publicación propios, que tenía que ser útil tanto con buena señal en la capital como con conexión intermitente en zona portuaria.',
        bullets: [
          'Lideré el desarrollo de la app: gestión de trámites, directorio de puertos y noticias.',
          'Construí el mapa de puertos con fichas de ubicación, datos de contacto y navegación desde la posición actual.',
          'Implementé el módulo de noticias con paginación, pull-to-refresh y caché local para que el contenido descargado siga disponible sin conexión.',
          'Configuré notificaciones push por tópico, para que cada usuario reciba alertas solo de los puertos que le interesan.',
          'Ejecuté el despliegue completo en iOS y Android: firma de builds, cuentas de demostración para revisión, etiquetas de privacidad y declaración de seguridad de datos.',
        ],
        stack: [
          'Flutter',
          'Dart',
          'Google Maps',
          'Geolocalización',
          'Push Notifications',
          'Caché offline',
          'Firebase',
          'REST',
          'Git',
          'App Store Connect',
          'Google Play Console',
        ],
        ios: 'https://apps.apple.com/do/app/autoridad-portuaria-dominicana/id6479921366',
        android: 'https://play.google.com/store/apps/details?id=com.solvex.apordom',
        cover: '/assets/apordom-1.jpg',
        coverAlt: 'App APORDOM — pantalla de inicio',
        shots: [
          {
            src: '/assets/apordom-1.jpg',
            alt: 'APORDOM — inicio con noticias y puertos',
            caption: 'Inicio: noticias marítimas y mapa de puertos',
          },
          {
            src: '/assets/apordom-2.jpg',
            alt: 'APORDOM — detalle de puerto con mapa',
            caption: 'Detalle de puerto con Google Maps',
          },
          {
            src: '/assets/apordom-3.jpg',
            alt: 'APORDOM — listado de noticias',
            caption: 'Listado de noticias del sector',
          },
          {
            src: '/assets/apordom-4.jpg',
            alt: 'APORDOM — tarifario de almacenamiento',
            caption: 'Tarifario y trámites digitales',
          },
        ],
      },
    ] as Project[],
  },

  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia laboral',
    educationLabel: 'Formación',
    jobs: [
      {
        id: 'banreservas',
        kind: 'Interno',
        group: 'interno',
        company: 'Banreservas',
        role: 'Ingeniero Front End',
        dates: 'Mar 2024 · Presente · Santo Domingo, RD',
        body: 'Desarrollo móvil en el banco más grande del país, dentro de un equipo con estándares de banca.',
        bullets: [
          'Implementación de nuevas funcionalidades en React Native y TypeScript.',
          'Desarrollo y optimización de flujos en la aplicación móvil.',
          'Trabajo de rendimiento sobre flujos existentes.',
        ],
        tech: ['React Native', 'TypeScript', 'JavaScript', 'Expo', 'Next.js', 'Git'],
      },
      {
        id: 'solvex',
        kind: 'Interno · Liderazgo',
        group: 'interno',
        company: 'Solvex Dominicana',
        role: 'Tech Lead Mobile Developer',
        dates: 'Sep 2021 · Mar 2024 · Santo Domingo, RD',
        body: 'Lideré la unidad de desarrollo de aplicaciones móviles con un equipo de 4 profesionales a mi cargo, entregando productos para clientes de pensiones, seguros y sector público.',
        bullets: [
          'Responsable del análisis de requerimientos de los proyectos y del desarrollo de las especificaciones técnicas.',
          'Definí la arquitectura base y los estándares de código del área móvil, en React Native y en Flutter.',
          'Lideré el desarrollo para iOS y Android en coordinación directa con diseño, QA y backend, incluyendo publicación y mantenimiento en ambas tiendas.',
          'Implementé nuevas características y mejoras de rendimiento en aplicaciones existentes.',
          'Revisión de código, estimación de esfuerzo y acompañamiento técnico del equipo.',
        ],
        tech: [
          'React Native',
          'Flutter',
          'Dart',
          'TypeScript',
          'JavaScript',
          'Expo',
          'Firebase',
          'Azure DevOps',
          'Node.js',
          '.NET / C#',
          'Docker',
          'AWS',
          'Next.js',
          'Git',
        ],
      },
      {
        id: 'apordom-job',
        kind: 'Outsourcing',
        group: 'cliente',
        company: 'Autoridad Portuaria Dominicana',
        role: 'Mobile Lead — contratista externo de Solvex Dominicana',
        dates: 'May 2024 · Ago 2024',
        body: 'Al terminar mi contrato con Solvex seguí a cargo del proyecto como contratista externo hasta entregarlo: la app oficial para trámites portuarios, directorio de puertos y noticias del sector, incluyendo el despliegue completo en App Store y Google Play.',
        bullets: [
          'Mapa de puertos con fichas de ubicación, contacto y navegación desde la posición actual.',
          'Módulo de noticias con paginación, pull-to-refresh y caché local para uso sin conexión.',
          'Notificaciones push por tópico y publicación bajo los requisitos de una entidad gubernamental.',
        ],
        tech: [
          'Flutter',
          'Dart',
          'Google Maps',
          'Push Notifications',
          'Caché offline',
          'Firebase',
          'App Store Connect',
          'Google Play Console',
        ],
      },
      {
        id: 'siembra-job',
        kind: 'Outsourcing',
        group: 'cliente',
        company: 'AFP Siembra',
        role: 'Mobile Lead — proyecto vía Solvex Dominicana',
        dates: 'Jun 2023 · Ene 2024',
        body: 'Nuevas funcionalidades sobre la app de fondo de pensiones en producción: carnet virtual, notificaciones y flujo de ofertas por geolocalización.',
        bullets: [
          'Segundo factor con TOTP (RFC 6238) para autorizar operaciones sobre el fondo.',
          'Carnet virtual con consulta offline y credencial cifrada en el almacenamiento seguro del sistema.',
          'Motor de ofertas por geolocalización y notificaciones push segmentadas con deep links.',
          'Analíticas por paso de embudo y reporte de crashes, validando cada feature con QA y Backend.',
        ],
        tech: [
          'Flutter',
          'Dart',
          'TOTP',
          'Cifrado',
          'Geolocalización',
          'Push Notifications',
          'Firebase',
          'Azure DevOps',
        ],
      },
      {
        id: 'humano-job',
        kind: 'Outsourcing',
        group: 'cliente',
        company: 'Grupo Humano',
        role: 'Mobile Lead — proyecto vía Solvex Dominicana',
        dates: 'Feb 2022 · May 2022',
        body: 'Integración de cobros dentro de la app de seguros y salud, más geolocalización de farmacias y trabajo de estabilidad sobre código heredado.',
        bullets: [
          'Pasarela de pagos in-app con tokenización del lado del proveedor y operaciones idempotentes contra el doble cobro.',
          'Manejo de estados intermedios del pago: pendiente, rechazado, timeout y reconciliación.',
          'Geolocalización para el flujo de farmacia más cercana, con fallback a búsqueda manual.',
          'Bugs heredados priorizados por usuarios afectados y mejoras de rendimiento en listas y arranque.',
        ],
        tech: ['React Native', 'JavaScript', 'Pasarela de pagos', 'Google Maps', 'Azure DevOps'],
      },
      {
        id: 'redbote',
        kind: 'Interno',
        group: 'interno',
        company: 'RedBote',
        role: 'Frontend Developer',
        dates: 'Feb 2019 · Oct 2021 · Santo Domingo, RD',
        body: 'Desarrollo y creación del sitio web de la empresa, trabajando con equipos multidisciplinarios para lograr un resultado alineado a la necesidad del negocio.',
        bullets: [],
        tech: ['JavaScript', 'HTML', 'CSS', 'Git'],
      },
    ] as Job[],
    education: [
      { name: 'Flutter', place: 'Udemy', year: '2023', main: false },
      { name: 'Ingeniería en Software', place: 'UTESA', year: '2016 – 2022', main: true },
      { name: 'React Native', place: 'Udemy', year: '2021', main: false },
      { name: 'TypeScript', place: 'Udemy', year: '2020', main: false },
      { name: 'JavaScript', place: 'Udemy', year: '2019', main: false },
    ] as Education[],
  },

  stack: {
    eyebrow: 'Herramientas',
    title: 'Stack técnico',
    groups: [
      {
        id: 'languages',
        title: 'Lenguajes',
        items: ['JavaScript', 'TypeScript', 'Dart', 'C#', 'SQL'],
      },
      {
        id: 'mobile',
        title: 'Móvil',
        items: ['React Native', 'Expo', 'EAS', 'Flutter', 'Módulos nativos iOS/Android'],
      },
      {
        id: 'state-data',
        title: 'Estado y datos',
        items: ['Redux Toolkit', 'Zustand', 'Context API', 'BLoC', 'Provider'],
      },
      {
        id: 'networking',
        title: 'Red y APIs',
        items: [
          'REST',
          'Axios',
          'Dio',
          'Interceptores',
          'Refresh tokens',
          'Reintentos con backoff',
          'Caché offline',
        ],
      },
      {
        id: 'security',
        title: 'Seguridad',
        items: [
          'Biometría (Face ID / Touch ID / huella)',
          'Keychain y Keystore',
          'Cifrado',
          'TOTP',
          'OAuth2 / JWT',
          'Tokenización de pagos',
        ],
      },
      {
        id: 'services-platform',
        title: 'Servicios y plataforma',
        items: [
          'Firebase (Cloud Messaging, Crashlytics, Analytics, Remote Config)',
          'Google Maps',
          'Geolocalización',
          'Deep linking',
          'Push notifications',
          'Pasarelas de pago',
        ],
      },
      {
        id: 'backend-web',
        title: 'Backend y web',
        items: ['Node.js', '.NET / C#', 'Next.js', 'React', 'AWS', 'Docker'],
      },
      {
        id: 'quality-delivery',
        title: 'Flujo de trabajo y entrega',
        items: [
          'Git',
          'Azure DevOps (Boards, Repos, Pipelines)',
          'TestFlight',
          'App Store Connect',
          'Google Play Console',
        ],
      },
      {
        id: 'methodology',
        title: 'Metodología',
        items: ['Scrum', 'Kanban'],
      },
    ] as StackGroup[],
  },

  method: {
    eyebrow: 'Método',
    title: 'Cómo trabajo',
    items: [
      {
        id: 'spec-first',
        title: 'Primero la especificación, después el código.',
        body: 'Antes de abrir el editor escribo qué se va a construir, qué casos borde existen y qué pasa cuando falla. Ahorra semanas de retrabajo y hace que la estimación signifique algo.',
      },
      {
        id: 'error-states',
        title: 'El estado de error es parte del diseño.',
        body: 'Sin conexión, permiso denegado, sesión expirada, pago pendiente. Si esos estados no se diseñan, se improvisan en producción — y ahí se improvisan mal.',
      },
      {
        id: 'measure',
        title: 'Lo que no se mide no se arregla.',
        body: 'Analíticas por paso de embudo y reporte de crashes desde el día uno. Es la diferencia entre creer que la gente abandona en cierta pantalla y saberlo.',
      },
      {
        id: 'shipping',
        title: 'Publicar es parte del trabajo.',
        body: 'Firma de builds, ambientes por flavor, canales de prueba, revisión de tiendas, etiquetas de privacidad. Entrego apps instaladas, no repositorios.',
      },
      {
        id: 'handover',
        title: 'El código se queda con ustedes.',
        body: 'Estructura por capas, nombres explícitos y documentación de las decisiones. Nadie debería quedar atado a un desarrollador para poder mantener su propio producto.',
      },
    ] as MethodItem[],
  },

  about: {
    eyebrow: 'Sobre mí',
    headline:
      'Empecé en frontend web y terminé donde realmente me interesaba: el móvil. Lo que me atrapó fue que una app no perdona — o abre rápido, funciona sin conexión y no se cae, o el usuario la desinstala.',
    paragraphs: [
      'Desde entonces me muevo en dos ecosistemas en paralelo, React Native y Flutter, y en dominios donde el error cuesta caro: el fondo de pensión de alguien, el pago de una póliza, un trámite portuario. Eso me acostumbró a pensar en estados de error antes que en la pantalla feliz y a escribir la especificación técnica antes que el código.',
      'Como Tech Lead me tocó la otra mitad del trabajo: traducir requerimientos de negocio a alcance técnico, estimar, repartir, revisar código y coordinar con diseño, QA y backend para que el release salga cuando dijimos.',
      'Fuera del trabajo formal mantengo proyectos propios donde pruebo cosas antes de proponerlas en un proyecto de cliente.',
    ],
    footnotes: ['Ingeniería en Software — UTESA', 'Español nativo · Inglés B1'],
    portraitAlt: (name: string) => `Retrato de ${name}`,
  },

  contact: {
    title:
      '¿Tienen una app que construir, una que arreglar o un equipo móvil sin dirección técnica?',
    lead: 'Cuénteme qué necesitan y les digo con franqueza si es algo que puedo resolver, cuánto trabajo implica y cómo lo abordaría. Si no soy la persona indicada, se lo digo también.',
    emailCta: 'Enviar correo',
    linkedinCta: 'LinkedIn',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    formTitle: 'Cuénteme el proyecto',
    formLead: 'Escríbame qué necesitan y le respondo por correo.',
    emailField: 'Su correo',
    optional: '(opcional)',
    messageField: 'Qué necesitan construir o arreglar',
    emailPlaceholder: 'nombre@empresa.com',
    submit: 'Enviar',
    sent: 'Recibido. Respondo en menos de 24 horas.',
    error: 'Escriba qué necesitan antes de enviar.',
    /** Asunto del `mailto:` que compone el formulario. */
    mailSubject: 'Proyecto móvil — desde el portafolio',
    /** Asunto del botón directo "Enviar correo". */
    directMailSubject: 'Proyecto móvil',
    myEmailLine: (email: string) => `Mi correo: ${email}`,
  },

  footer: {
    role: 'Ingeniero de Software Móvil · Santo Domingo, RD',
    linksLabel: 'Enlaces de contacto',
  },
};

/** Forma que todo diccionario debe cumplir. */
export type Dictionary = typeof es;
