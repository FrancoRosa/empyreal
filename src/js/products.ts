const products = [
  {
    id: 1,
    name: {
      en: "Magnetic GNSS Antenna",
      es: "Antena GNSS con base magnética",
    },
    description: {
      en: "The ANN-MB-00 GNSS multiband antenna is extremely unique from other GNSS/GPS antennas in that it is designed to receive both the classic L1 GPS band and the newly launched (started in 2005) L2 GPS band. This is a general purpose GPS antenna, not recommend for millimeter grade accuracy applications.",
      es: "La antena multibanda ANN-MB-00 GNSS es extremadamente única en comparación con otras antenas GNSS/GPS, ya que está diseñada para recibir tanto la clásica banda L1 GPS como la recién lanzada (iniciada en 2005) banda L2 GPS. Esta es una antenna GPS de proposito general, no recomendable en aplicaciones que requieran grado de presicion milimetrico.",
    },
    price: 90,
    image: "magnetic_antenna",
    price_hidden: false,
    link: "https://www.ead-ltd.com/wp-content/uploads/2019/08/8111D-datasheet.pdf",
  },
  {
    id: 2,
    name: {
      en: "GNSS Antenna",
      es: "Antena GNSS",
    },
    description: {
      en: "The GNSS antenna is engineered to provide high-quality reception of satellite signals, even in challenging environments. Its compact and rugged design allows for easy installation on various platforms, including vehicles, buildings, and surveying equipment. This is a L1/L2 antenna great for surveying applications specially on masts or static places.",
      es: "La antena GNSS está diseñada para proporcionar una recepción de alta calidad de las señales de satélite, incluso en entornos desafiantes. Su diseño compacto y resistente permite una fácil instalación en varias plataformas, incluyendo vehículos, edificios y equipos de topografía. Esta antena es de banda L1/L2 perfecta para aplicaciones de estacion estatica o mastiles.",
    },
    price: 180,
    image: "antenna",
    price_hidden: false,
    link: "",
  },
  {
    id: 3,
    name: {
      en: "Trimble AV28 Antenna",
      es: "Antena Trimble AV28",
    },
    description: {
      en: "A precise triple-frequency, L-band antenna suitable for a wide range of applications where the weight and size really matter (Compact). This antenna is perfect for mobile applications and can be mounted on any vehicle.",
      es: "Una antena de banda L precisa de triple frecuencia adecuada para una amplia gama de aplicaciones donde el peso y el tamaño son realmente importantes (compacta). Esta antena es perfecta para aplicaciones mobiles y puede ser montada con seguridad sobre cualquier vehiculo.",
    },
    price: 700,
    image: "trimble_av28",
    price_hidden: false,
    link: "https://oemgnss.trimble.com/product/trimble-av28/?tab=support",
  },
  {
    id: 4,
    name: {
      en: "Trimble Zephyr 3 Rugged",
      es: "Trimble Zephyr 3 Resistente",
    },
    description: {
      en: "Designed for applications in high shock and vibration environments like machine-control up to 75g shock and 20.4g RMS, the Zephyr Rugged is available in two versions with 5/8” mast mounting and with 3” mast clamp.",
      es: 'Diseñada para aplicaciones en entornos de alto impacto y vibración como el control de máquinas con un impacto de hasta 75 g y 20.4 g de RMS, la Zephyr Rugged está disponible en dos versiones con montaje en mástil de 5/8" y abrazadera de mástil de 3 pulgadas.',
    },
    price: 1300,
    image: "trimble_zephyr",
    price_hidden: false,
    link: "https://oemgnss.trimble.com/product/trimble-zephyr-3-rugged/",
  },
  {
    id: 5,
    name: {
      en: "RTK Dual tracking board",
      es: "Placa de rastreo dual RTK",
    },
    description: {
      en: "rtklink board, centimeter accuracy, and precise heading, USB based ready to connect to any display or software by its USB connectors, it contains two ZED-F9P boards for a rover & moving-base configuration",
      es: "Placa rtklink, precisión centimétrica y dirección precisa, lista para conectar a cualquier pantalla o software a través de USB. Contiene dos placas ZED-F9P de Ublox para una configuracion rover & moving-base",
    },
    price: 680,
    image: "boards",
    price_hidden: false,
    link: "https://www.mouser.fi/pdfDocs/ZED-F9P_ProductSummary_UBX-17005151-2.pdf",
  },
  {
    id: 6,
    name: {
      en: "Correction stream (1 month)",
      es: "Transmisión de corrección (1 mes)",
    },
    description: {
      en: "RTCM3 correction data 24/7 to get centimeter level accuracy, 1 month subscription. The RTCM correction data will be provided to the client as long as there is internet connection availabe on their devices. The client must send an message with his device ID to enable his stream.",
      es: "Datos de corrección RTCM3 las 24 horas del día, los 7 días de la semana, para lograr una precisión de nivel centimétrico, suscripción de 1 mes.",
    },
    price: 250,
    image: "stream",
    price_hidden: false,
    link: "http://www.euref.eu/symposia/2018Amsterdam/03-02-Soehne.pdf",
  },
  {
    id: 7,
    name: {
      en: "Correction stream (12 month).",
      es: "Transmisión de corrección (12 meses)",
    },
    description: {
      en: "RTCM3 correction data 24/7 to get centimeter level accuracy, 12 month subscription. The RTCM correction data will be provided to the client as long as there is internet connection availabe on their devices. The client must send an message with his device ID to enable his stream.",
      es: "Datos de corrección RTCM3 24/7 subscripcion de 12 meses.",
    },
    price: 2500,
    image: "stream",
    price_hidden: false,
    link: "http://www.euref.eu/symposia/2018Amsterdam/03-02-Soehne.pdf",
  },
  {
    id: 8,
    name: {
      en: "Magnetic antenna mount",
      es: "Soporte magnético para antena",
    },
    description: {
      en: "This is a very handy magnetic mount for survey grade GNSS/GPS antennas. Sturdy, compact, and surprisingly strong, this is a quick way of mounting your antenna to metal roofs, parapets, and other ferrous materials",
      es: "Este es un soporte magnético muy práctico para antenas GNSS/GPS de grado topográfico. Resistente, compacto y sorprendentemente fuerte, esta es una forma rápida de montar su antena en techos metálicos, almenas y otros materiales ferrosos",
    },
    price: 30,
    image: "magnetic_mount",
    price_hidden: false,
    link: "",
  },
  {
    id: 9,
    name: {
      en: "GPS-RTK-SMA ZED-F9P",
      es: "GPS-RTK-SMA ZED-F9P",
    },
    description: {
      en: "Top-of-the-line module for high accuracy GNSS and GPS location solutions including RTK that is capable of 10mm, three-dimensional accuracy. This PCB contains the ZED-F9P rtk enabled positioning chip from Ublox",
      es: "Módulo de última generación para soluciones de localización GNSS y GPS de alta precisión, incluido RTK, capaz de una precisión tridimensional de 10 mm. Este PCB contiene el chip ZED-F9P de Ublox con capacidad rtk",
    },
    price: 310,
    image: "ublox",
    price_hidden: false,
    link: "https://cdn.sparkfun.com/assets/f/8/d/6/d/ZED-F9P-02B_DataSheet_UBX-21023276.pdf",
  },
  {
    id: 10,
    name: {
      en: "Board case dual RTK",
      es: "Estuche de placa RTK dual",
    },
    description: {
      en: "Rugged PVC case to mount DUAL RTK boards, It includes holes to firmly mount the boards on any surface",
      es: "Estuche resistente de PVC para montar placas RTK duales. Incluye orificios para montar firmemente las placas en cualquier superficie",
    },
    price: 10,
    image: "case",
    price_hidden: false,
    link: "",
  },
  {
    id: 11,
    name: {
      en: "Dell Rugged 7212",
      es: "Dell Rugged 7212",
    },
    description: {
      en: "Rugged tablet preconfigured with augmented reality tool and tracking software to get the vehicles position in the field. This article contains just the tablet with one battery. Keyboard and additional accesories are sold separatelly.",
      es: "Tablet resistente preconfigurada con herramienta de realidad aumentada y software de seguimiento para obtener la posición de los vehículos en el campo. Este articulo solo contine la tablet y una bateria. Accesorios adicionales como el teclado se venden por separado",
    },
    price: 650,
    image: "dell",
    price_hidden: false,
    link: "http://www.ongov.net/911/documents/latitude-rugged-extreme-tablet-ecosystem-guidenew.pdf",
  },
  {
    id: 12,
    name: {
      en: "Correction stream (1hr).",
      es: "Transmisión de corrección (1hr)",
    },
    description: {
      en: "RTCM3 correction data 24/7 to get centimeter level accuracy, 12 month subscription. The RTCM correction data will be provided to the client as long as there is internet connection availabe on their devices. The client must send an message with his device ID to enable his stream.",
      es: "Datos de corrección RTCM3 24/7 subscripcion de 12 meses.",
    },
    price: 1,
    image: "stream",
    price_hidden: false,
    link: "http://www.euref.eu/symposia/2018Amsterdam/03-02-Soehne.pdf",
  },
];

export default products;
