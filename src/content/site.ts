/**
 * All copy for gmvpgroupenterprise.com lives here so it can be edited
 * without touching components. Texts come from the original site, lightly polished.
 */

export const site = {
  name: "GMVP Group Enterprise",
  shortName: "GMVP Group",
  legalName: "GMVP Group Enterprise S.A.S. (GGE S.A.S.)",
  url: "https://gmvpgroupenterprise.com",
  slogan: "Sueña, crea, avanza: es posible.",
  description:
    "Fondo de inversión de capital privado con sede en Bogotá. Creamos valor sostenible con gobierno corporativo, modelos de negocio probados y asociaciones de largo plazo donde todos ganan.",
  phone: "+57 313 694 0102",
  phoneHref: "tel:+573136940102",
  whatsapp: "573136940102",
  emails: {
    management: "gerencia@gmvpgroupenterprise.com",
    info: "info@gmvpgroupenterprise.com",
  },
  address: { city: "Bogotá", country: "Colombia" },
  nav: [
    { href: "/grupo", label: "El Grupo" },
    { href: "/portafolio", label: "Portafolio" },
    { href: "/fundador", label: "Fundador" },
    { href: "/invertir", label: "Invertir" },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;

export const hero = {
  eyebrow: "Fondo de inversión de capital privado",
  lines: ["Sueña. Crea.", "Avanza."],
  accent: "Es posible.",
  intro:
    "Somos un fondo de inversión de capital privado en crecimiento, con direccionamiento estratégico basado en las mejores prácticas de gobierno corporativo y gestión.",
};

export const pillars = [
  {
    title: "Gobierno corporativo",
    text: "Direccionamiento estratégico basado en las mejores prácticas de gobierno corporativo y gestión.",
  },
  {
    title: "Valor sostenible",
    text: "Creación de valor sostenible mediante nuestra tecnología probada y modelos de negocio exitosos, alineando objetivos y trabajo en equipo.",
  },
  {
    title: "Asociaciones de largo plazo",
    text: "Respeto, transparencia y reciprocidad siempre en primer lugar, para formar asociaciones de largo plazo donde todos ganan.",
  },
];

export const manifesto =
  "Estamos aquí para hacer realidad sus sueños y enseñarle a invertir en su futuro. Cada persona llega hasta donde su mente se lo permite: ese es el motor de las grandes ideas y de las grandes empresas.";

export const slogan = [
  {
    word: "Sueña",
    text: "Soñamos con realizar nuestros deseos de ser alguien y tener una vida próspera y cómoda. En cada etapa —niñez, juventud, adultez— debemos mantener vivo el deseo de soñar, por muy duras que sean las cosas.",
  },
  {
    word: "Crea",
    text: "Formalizar los sueños: plasmarlos en el papel, diversificarlos, organizarlos y darles forma de acuerdo con la etapa de la vida en que nos encontremos.",
  },
  {
    word: "Avanza",
    text: "Concretar y conseguir lo deseado. Estar siempre al frente de lo realizado, trabajar y alcanzar las metas propuestas sin dejar a un lado lo que siempre hemos deseado.",
  },
  {
    word: "Es posible",
    text: "Lo que se proponga lo puede obtener con dedicación, ganas y superación. Cada persona llega hasta donde su mente se lo permita. Eso es posible.",
  },
];

export const companies = [
  {
    slug: "credifinanzas",
    sector: "Sector financiero",
    name: "GMVP Credifinanzas S.A.S.",
    short: "Credifinanzas",
    text: "Crédito rotativo y asesoría para iniciar o recuperar la vida crediticia comercial.",
    href: "https://gmvpcredifinanzas.com",
    external: true,
    tone: "#1B4E8F",
  },
  {
    slug: "construcciones",
    sector: "Construcción e inmobiliario",
    name: "GMVP Construcciones e Inmobiliaria S.A.S.",
    short: "Construcciones",
    text: "Compraventa y arrendamiento de bienes inmuebles en todas sus categorías.",
    href: "/portafolio#construcciones",
    external: false,
    tone: "#7A5C2E",
  },
  {
    slug: "muebles",
    sector: "Sector madera",
    name: "GMVP Muebles",
    short: "Muebles",
    text: "Fabricación de muebles y utensilios para el hogar y la oficina, con los más altos estándares de calidad.",
    href: "/portafolio#muebles",
    external: false,
    tone: "#5B3A29",
  },
] as const;

export const stats = [
  { value: 10, suffix: "", label: "acciones como compra mínima" },
  { value: 100, suffix: "", label: "acciones como tope por inversionista" },
  { value: 4, suffix: "", label: "meses entre cada pago de dividendos" },
  { value: 60, suffix: "", label: "meses de horizonte autorizado de inversión" },
];

export const about = {
  history:
    "GMVP Group Enterprise (GGE S.A.S.) nace como fondo de inversión, conformando un grupo de inversiones en diferentes sectores.",
  mission:
    "GMVP Group Enterprise (GGE S.A.S.) es la compañía matriz de un grupo empresarial que genera valor sostenible para sus grupos de interés mediante la administración de un portafolio de inversiones dinámico.",
  vision:
    "Ser un grupo empresarial dinámico que impulsa la innovación y la gestión del conocimiento, donde el retorno de sus inversiones supere ampliamente el riesgo asumido. Ser el socio preferido de cualquier inversionista que desee hacer negocios en nuestras diferentes compañías.",
  values: [
    "Transparencia externa e interna",
    "Cultura de comunicación",
    "Responsabilidad social y tolerancia",
    "Orientación al servicio",
    "Estándares profesionales",
    "Compromiso personal",
    "Meritocracia",
  ],
  culture:
    "Nuestro equipo humano se caracteriza por su actitud positiva ante el trabajo, su ética y su motivación profesional. El fomento de los valores nos permite mantener excelentes relaciones con nuestros clientes, lo que nos convierte en una compañía fuerte y diferente. Disfrutamos de nuestro trabajo y compartimos la vocación de servicio hacia los sectores menos favorecidos de la sociedad.",
  objective: [
    "El objetivo estratégico de GMVP Group Enterprise es la creación de valor sostenible del grupo a través de la administración basada en valor, de modo que la fortaleza de GGE S.A.S. esté en el valor de sus inversiones.",
    "El sistema de Administración Basada en Valor integra el control y la medición de resultados para alinear las actuaciones de los administradores con los intereses de los accionistas. Determina la planeación y el presupuesto, las decisiones de inversión de capital y el establecimiento de objetivos y metas.",
    "GGE S.A.S. busca que sus compañías operativas sean líderes de mercado de forma rentable: sus planes de negocio deben explicar con claridad cómo generarán valor futuro, y las inversiones estratégicas deben estar soportadas en valor económico.",
    "El grupo valida y apoya los planes estratégicos de las compañías operativas, buscando un rendimiento anual creciente sobre el capital invertido, y promueve las sinergias entre ellas para trabajar como un verdadero grupo empresarial.",
  ],
};

export const investor = {
  profile:
    "GMVP Group Enterprise S.A.S. es una sociedad por acciones simplificada administrada bajo la filosofía de un fondo de inversión. Gestiona activamente un portafolio de compañías en Colombia y es un vehículo clave para cualquier inversionista que desee ser dueño de una participación en nuestro grupo empresarial.",
  shareholders:
    "Nuestros accionistas son personas naturales y jurídicas que buscan una rentabilidad sostenible de su inversión y no priorizan maximizar beneficios a corto plazo. Invertimos en la capacitación de nuestro personal para crear un ambiente de trabajo agradable y eficiente, y así brindar las mejores alternativas de inversión.",
  seeking:
    "Buscamos personas naturales o jurídicas que deseen pertenecer a esta iniciativa emprendedora y empresarial, apoyándonos con la compra de acciones preferentes de nuestra compañía. Así harás parte de un grupo empresarial con visión de futuro y propuestas de calidad, que busca resultados satisfactorios para el grupo y para sus accionistas. Las acciones pueden pagarse de contado o por cuotas, según la cantidad adquirida.",
  criteria: [
    "Rentabilidad",
    "Operatividad",
    "Trayectoria",
    "Competitividad",
    "Equipo gerencial profesional y competente",
    "Productos y servicios de alta calidad",
  ],
  journey: [
    { step: "01", title: "Asesoría", text: "Un asesor te orienta hacia la inversión más acorde para ti." },
    { step: "02", title: "Compra de acciones", text: "Desde 10 y hasta 100 acciones, de contado o por cuotas mensuales." },
    { step: "03", title: "Título", text: "Si pagas por cuotas, recibes tu título al cancelar la última cuota del plan." },
    { step: "04", title: "Dividendos", text: "Cada cuatro meses, tras el primer ciclo operacional, consignados en tu cuenta registrada." },
    { step: "05", title: "Liquidez", text: "Horizonte autorizado de 60 meses; puedes vender a un tercero, y el grupo podría recomprar a partir del mes 30." },
  ],
};

export const faqs = [
  {
    q: "Si pago de contado mis 10 acciones, ¿obtengo beneficios?",
    a: "Sí. Obtiene descuentos en los diferentes servicios de las compañías que poseemos.",
  },
  {
    q: "Si pago mis 10 acciones por cuotas, ¿cuándo recibo el título?",
    a: "Lo recibe cuando termine de pagar la última cuota del plan que haya elegido para el pago de las acciones.",
  },
  {
    q: "Si no puedo cancelar el total de las acciones, ¿pierdo el dinero que he pagado?",
    a: "No. Debe conseguir un comprador para sus acciones que le pague el valor que usted haya cancelado y continúe pagando las cuotas pendientes.",
  },
  {
    q: "¿A partir de cuándo empiezo a recibir dividendos?",
    a: "Después de cancelar el valor de sus acciones, recibirá dividendos cada cuatro meses, una vez cumplido el primer ciclo de año operacional de la compañía (hasta el 31 de diciembre del año finalizado).",
  },
  {
    q: "¿Dónde reclamo mis dividendos?",
    a: "Los dividendos se consignan en la cuenta que usted haya registrado para tal fin.",
  },
  {
    q: "¿Puedo comprar más de 10 acciones?",
    a: "Sí. La compra mínima es de 10 acciones y el tope es de 100 acciones.",
  },
  {
    q: "Si estoy en otra ciudad, ¿cómo realizo los pagos?",
    a: "Mensualmente le enviaremos un estado de cuenta y la información de consignación para realizar el pago.",
  },
  {
    q: "¿Cuánto tiempo debo conservar las acciones?",
    a: "El horizonte autorizado es de 60 meses, pero si lo desea puede venderlas a un tercero.",
  },
  {
    q: "¿El grupo recompraría mis acciones?",
    a: "Sí, después de 30 meses, o antes si la junta directiva lo considera conveniente. Todo depende de la capacidad financiera de la compañía.",
  },
  {
    q: "¿En qué se invierte el dinero de la venta de acciones?",
    a: "Los recursos se destinan a capital de trabajo y al fortalecimiento de la compañía y sus filiales.",
  },
];

export const founder = {
  name: "Gerberth Martín Vega Prada",
  role: "Fundador y accionista",
  intro:
    "Nacido en Armenia, Quindío, desde muy joven se caracterizó por su inquietud por los negocios: vendía dulces en la escuela primaria y, en los años ochenta, traía mercancía desde Bogotá para pagar su colegio y sus gastos.",
  team:
    "Hoy lidera GMVP Group Enterprise S.A.S. junto a un equipo de asesores económicos, administrativos y jurídicos, con un profundo conocimiento de las empresas del grupo.",
  timeline: [
    {
      year: "80s",
      title: "El primer negocio",
      text: "Comercializa mercancía traída de Bogotá para pagar sus estudios. Nace el emprendedor.",
    },
    {
      year: "1987",
      title: "Bogotá y las finanzas",
      text: "Viaja en busca de oportunidades. Estudia y trabaja en bancos, donde nace su amor por las finanzas.",
    },
    {
      year: "1995",
      title: "Avianca",
      text: "Tras graduarse como auxiliar de servicios a bordo en 1994, ingresa a Avianca y luego estudia aviación comercial.",
    },
    {
      year: "2003",
      title: "Edison, New Jersey",
      text: "Se radica en Estados Unidos durante tres años, donde conoce nuevos procesos y modelos de negocio.",
    },
    {
      year: "Regreso",
      title: "Armenia, su ciudad natal",
      text: "Crea minimercados, cooperativas de aporte y crédito, empresas de telecomunicaciones y fábricas de muebles.",
    },
    {
      year: "2012",
      title: "Nace GMVP Group",
      text: "Inicia operaciones GMVP Group Enterprise S.A.S. en Medellín: un grupo de empresas con una misma visión.",
    },
    {
      year: "2016",
      title: "Fondo de inversión",
      text: "Traslada la operación a Bogotá y crea el fondo de inversiones, incursionando con éxito en el sector financiero.",
    },
  ],
  quote: "Lo más importante son las personas, el proceso y el producto.",
};

export const disclaimer =
  "La información de este sitio es de carácter informativo y no constituye una oferta pública de valores ni asesoría financiera personalizada. Toda inversión implica riesgos; consulte con un asesor antes de invertir.";
