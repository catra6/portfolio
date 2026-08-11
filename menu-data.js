'use strict';

window.XMB_MENU_DATA = {
  ICON_THEME: 'vista',
  ICON_MAPS: {
    default: {
      design: 'icons/folder025.ico',
      civil: 'icons/folder011.ico',
      electronics: 'icons/folder040.ico',
      education: 'icons/folder032.ico',
      profile: 'icons/folder015.ico',
      folder: 'icons/folder001.ico'
    },
    vista: {
      design: 'icons/folder025.ico',
      civil: 'icons/folder011.ico',
      electronics: 'icons/folder040.ico',
      education: 'icons/folder032.ico',
      profile: 'icons/folder015.ico',
      folder: 'icons/folder001.ico'
    }
  },
  CUSTOM_FOLDER_ICONS: {
    default: {
      '4_0': 'icons/cm036.ico',
      '4_1': 'icons/cm005.ico',
      '4_2': 'icons/write011.ico'
    },
    vista: {
      '0_0': 'icons/media011.ico',
      '0_1': 'icons/media001.ico',
      '0_2': 'icons/display001.ico',
      '1_0': 'icons/hd043.ico',
      '1_1': 'icons/cp001.ico',
      '1_2': 'icons/kb001.ico',
      '2_0': 'icons/cp005.ico',
      '2_1': 'icons/app001.ico',
      '2_2': 'icons/clock001.ico',
      '3_0': 'icons/cert001.ico',
      '3_1': 'icons/file001.ico',
      '3_2': 'icons/disc001.ico',
      '4_0': 'icons/user007.ico',
      '4_1': 'icons/net010.ico',
      '4_2': 'icons/write011.ico',
    }
  },
  FOLDER_ITEMS: {
    '0_0': [
      {
        title: { en: 'demoreel 2026', es: 'demostración 2026', de: 'demoreel 2026' },
        desc: { en: 'post-production & vfx compilation', es: 'compilación de postproducción y vfx', de: 'postproduktion & vfx kompilation' },
        columns: 2,
        img: 'icons/media011.ico'
      },
      {
        title: { en: 'branding intro', es: 'introducción de marca', de: 'branding intro' },
        desc: { en: 'after effects logo animation', es: 'animación de logo en after effects', de: 'after effects logoanimation' },
        columns: 2,
        img: 'icons/media001.ico'
      },
      {
        title: { en: 'interactive promo', es: 'promo interactiva', de: 'interaktive promo' },
        desc: { en: 'html5 / canvas advertising snippet', es: 'fragmento publicitario de html5 / canvas', de: 'html5 / canvas werbe-snippet' },
        columns: 2,
        img: 'icons/display001.ico'
      }
    ],
    '0_1': [
      {
        title: { en: 'character cycle', es: 'ciclo de personaje', de: 'character cycle' },
        desc: { en: 'rigid body physics walk test', es: 'prueba de caminata de física de cuerpo rígido', de: 'starrkörperphysik-gehtest' },
        columns: 2,
        img: 'icons/media001.ico'
      },
      {
        title: { en: 'kinetic type', es: 'tipografía cinética', de: 'kinetische typografie' },
        desc: { en: 'typography layout and styling', es: 'diseño y estilo de tipografía', de: 'typografie-layout und styling' },
        columns: 2,
        img: 'icons/display001.ico'
      }
    ],
    '0_2': [
      {
        title: { en: 'screencaps v1', es: 'capturas v1', de: 'screencaps v1' },
        desc: { en: 'portfolio landing preview', es: 'vista previa de página de portafolio', de: 'portfolio-landing-vorschau' },
        columns: 2,
        img: 'icons/display001.ico'
      }
    ],
    '1_0': [
      {
        title: { en: 'highway design', es: 'diseño de autopista', de: 'autobahnentwurf' },
        desc: { en: 'intersection reconstruction drawing', es: 'plano de reconstrucción de intersección', de: 'zeichnungen zur kreuzungsrekonstruktion' },
        columns: 2,
        img: 'icons/hd043.ico'
      },
      {
        title: { en: 'foundations', es: 'cimientos', de: 'fundamente' },
        desc: { en: 'footing and pad concrete calculations', es: 'cálculos de hormigón para zapatas', de: 'berechnungen für betonfundamente' },
        columns: 2,
        img: 'icons/cp001.ico'
      }
    ],
    '1_1': [
      {
        title: { en: 'cad structure', es: 'estructura cad', de: 'cad-struktur' },
        desc: { en: 'steel beam assembly layout', es: 'diseño de ensamblaje de vigas de acero', de: 'stahlträger-montagelayout' },
        columns: 2,
        img: 'icons/cp001.ico'
      }
    ],
    '1_2': [
      {
        title: { en: 'drafting draft', es: 'borrador de dibujo', de: 'zeichenentwurf' },
        desc: { en: 'retaining wall detailed profile', es: 'perfil detallado de muro de contención', de: 'detailliertes profil der stützmauer' },
        columns: 2,
        img: 'icons/kb001.ico'
      }
    ],
    '2_0': [
      {
        title: { en: 'power supply', es: 'fuente de alimentación', de: 'stromversorgung' },
        desc: { en: 'dc-dc stepdown converter schematic', es: 'esquema de convertidor reductor dc-dc', de: 'dc-dc-abwärtswandler-schaltplan' },
        columns: 2,
        img: 'icons/cp005.ico'
      },
      {
        title: { en: 'mcu breakout', es: 'placa de mcu', de: 'mcu-breakout' },
        desc: { en: 'stm32 board layout & signal traces', es: 'diseño de placa stm32 y pistas de señal', de: 'stm32-platinenlayout & signalspuren' },
        columns: 2,
        img: 'icons/app001.ico'
      }
    ],
    '2_1': [
      {
        title: { en: 'smart sensor', es: 'sensor inteligente', de: 'intelligenter sensor' },
        desc: { en: 'ambient temperature sensor prototype', es: 'prototipo de sensor de temperatura ambiente', de: 'prototyp des umgebungstemperatursensors' },
        columns: 2,
        img: 'icons/app001.ico'
      }
    ],
    '2_2': [
      {
        title: { en: 'c++ firmware', es: 'firmware c++', de: 'c++ firmware' },
        desc: { en: 'low-level peripheral drivers repo', es: 'repositorio de controladores de periféricos de bajo nivel', de: 'peripherietreiber-repository' },
        columns: 2,
        img: 'icons/clock001.ico'
      }
    ],
    '3_0': [
      {
        title: { en: 'fluid mechanics', es: 'mecánica de fluidos', de: 'strömungsmechanik' },
        desc: { en: 'coursework & computational lab notes', es: 'notas de laboratorio computacional y tareas', de: 'notizen zum computerlabor' },
        columns: 2,
        img: 'icons/cert001.ico'
      },
      {
        title: { en: 'solid state logic', es: 'lógica de estado sólido', de: 'festkörperlogik' },
        desc: { en: 'digital electronics theory course', es: 'curso de teoría de electrónica digital', de: 'theoriekurs für digitale elektronik' },
        columns: 2,
        img: 'icons/file001.ico'
      }
    ],
    '3_1': [
      {
        title: { en: 'cloud developer', es: 'desarrollador cloud', de: 'cloud-entwickler' },
        desc: { en: 'aws certified developer credentials', es: 'credenciales de desarrollador certificado de aws', de: 'aws-zertifizierter desarrollador' },
        columns: 2,
        img: 'icons/file001.ico'
      }
    ],
    '3_2': [
      {
        title: { en: 'transcripts', es: 'analítico', de: 'zeugnisse' },
        desc: { en: 'engineering curriculum grade sheet', es: 'calificaciones del plan de estudios de ingeniería', de: 'notenblatt des ingenieurstudiums' },
        columns: 2,
        img: 'icons/disc001.ico'
      }
    ]
  },
  PROFILE_DETAILS: {
    '4_0': {
      title: { en: 'about me', es: 'sobre mí', de: 'über mich' },
      sections: [
        {
          text: {
            en: 'civil engineering student with 6 years of experience in education and media, currently leading bim workshops for engineering and architecture classmates. developed bilingual public speaking skills in 200+ teenagers through 4 years of united nations model programs. produced multimedia content for clients across entertainment and commercial industries over 2 years.<br><br>capable of balancing technical engineering coursework with creative project execution and training initiatives.',
            es: 'estudiante de ingeniería civil con 6 años de experiencia en educación y medios, actualmente liderando talleres de bim para compañeros de ingeniería y arquitectura. desarrollé habilidades de oratoria bilingüe en más de 200 jóvenes a lo largo de 4 años de programas de modelo de naciones unidas. produje contenido multimedia para clientes en industrias comerciales y de entretenimiento durante 2 años.<br><br>capaz de equilibrar el plan de estudios técnico de ingeniería con la ejecución de proyectos creativos y de capacitación.',
            de: 'bauingenieurstudent mit 6 jahren erfahrung in bildung und medien, leitet derzeit bim-workshops für bauingenieur- und architekturkommilitonen. entwickelte zweisprachige rhetorische fähigkeiten bei über 200 jugendlichen durch 4 jahre model-united-nations-programme. produzierte über 2 jahre lang multimedia-inhalte für kunden in den unterhaltungs- und kommerziellen branchen.<br><br>fähig, technische ingenieurkurse mit kreativer projektausführung und trainingsinitiativen zu verbinden.'
          },
          img: 'images/academic-1.jpg'
        },
        {
          role: { en: 'fcv sur vial, redline drawings drafter', es: 'fcv sur vial, dibujante conforme a obra', de: 'fcv sur vial, redline-zeichner' },
          date: { en: 'may 2026 - present', es: 'mayo 2026 - actualidad', de: 'may 2026 - aktuell' },
          bullets: {
            en: [
              '→ drafted as-built drawings from redline markups using arcgis and civil 3d tools.',
              '→ produced approved documentation for two drainage and earthwork construction projects for malargüe i and anchoris ii solar farms in mendoza province.',
              '→ maintained ongoing communication with land surveyors, engineers, and interdisciplinary professionals to propose solutions for identified issues.'
            ],
            es: [
              '→ elaboré planos conforme a obra a partir de planos redline usando las herramientas de arcgis y civil 3d',
              '→ generé documentación aprobada en dos obras de drenaje y movimiento de suelos para los parques solares malargüe I y anchoris II, en la provincia de mendoza',
              '→ estuve en constante comunicación con topógrafos, ingenieros y profesionales de otras disciplinas para plantear soluciones a los problemas encontrados.'
            ],
            de: [
              '→ erstellte bestandspläne aus redline-zeichnungen mit hilfe von arcgis und civil 3d.',
              '→ erstellte genehmigte dokumentation für zwei entwässerungs- und erdbauprojekte für die solarparks malargüe i und anchoris ii in der provinz mendoza.',
              '→ stand in ständigem austausch mit vermessungsingenieuren, ingenieuren und fachleuten anderer disziplinen, um lösungen für aufgetretene probleme zu erarbeiten.'
            ]
          },
          img: ''
        },
        {
          role: { en: 'freelance, video editor & graphic designer', es: 'freelance, editor de video y diseñador gráfico', de: 'freelance, video-editor & grafikdesigner' },
          date: { en: 'march 2024 – january 2026 (remote)', es: 'marzo 2024 – enero 2026 (remoto)', de: 'märz 2024 – januar 2026 (remote)' },
          bullets: {
            en: [
              '→ delivered 40+ video productions and 10+ design projects on tight deadlines for clients across entertainment and commercial industries.',
              '→ redesigned brand identity for esportian, a us-based scholarship agency.',
              '→ produced content generating 200k+ views in long-form and 5m+ views in short-form across platforms.'
            ],
            es: [
              '→ entregué más de 40 producciones de video y más de 10 proyectos de diseño con plazos ajustados para clientes de las industrias comercial y de entretenimiento.',
              '→ rediseñé la identidad de marca de esportian, una agencia de becas con sede en ee. uu.',
              '→ produje contenido que generó más de 200 mil reproducciones en formato largo y más de 5 millones en formato corto en diversas plataformas.'
            ],
            de: [
              '→ lieferte 40+ videoproduktionen und 10+ designprojekte unter engen fristen für kunden aus der unterhaltungs- und kommerziellen branche.',
              '→ neugestaltung der markenidentität für esportian, eine us-amerikanische stipendienagentur.',
              '→ erstellung von inhalten mit über 200k aufrufen im langformat und über 5m aufrufen im kurzformat auf verschiedenen plattformen.'
            ]
          },
          img: ''
        },
        {
          role: { en: 'um program youth for the future, public speaking trainer', es: 'programa um juventud para el futuro, entrenador de oratoria', de: 'um-programm jugend für die zukunft, rhetoriktrainer' },
          date: { en: 'february 2020 – september 2024 (on site)', es: 'febrero 2020 – septiembre 2024 (presencial)', de: 'februar 2020 – september 2024 (vor ort)' },
          bullets: {
            en: [
              '→ trained 200+ high school students in spanish and english language public speaking, debate techniques and diplomatic communication.',
              '→ mentored students through mock united nations simulations, improving confidence and communication skills in academic settings.',
              '→ created presentations for large meetings, coordinating schedules and program updates.'
            ],
            es: [
              '→ entrené a más de 200 estudiantes de secundaria en oratoria en español e inglés, técnicas de debate y comunicación diplomática.',
              '→ guié a estudiantes en simulaciones de modelo de naciones unidas, mejorando la confianza y habilidades de comunicación.',
              '→ creé presentaciones para grandes reuniones, coordinando horarios y actualizaciones de programas.'
            ],
            de: [
              '→ trainierte 200+ schüler in spanischer und englischer rhetorik, debattiertechniken und diplomatischer kommunikation.',
              '→ mentorte schüler durch simulationen der vereinten nationen zur verbesserung des selbstbewusstseins und der kommunikation.',
              '→ erstellte präsentationen für große meetings und koordinierte zeitpläne sowie programmupdates.'
            ]
          },
          img: 'images/cat-1.png'
        }
      ]
    },
    '4_1': {
      title: { en: 'skills', es: 'habilidades', de: 'fähigkeiten' },
      sections: [
        {
          role: { en: 'languages', es: 'idiomas', de: 'sprachen' },
          text: {
            en: 'native spanish, proficient in english, conversational in german.',
            es: 'español nativo, inglés fluido, alemán conversacional.',
            de: 'spanisch muttersprache, englisch fließend, deutsch konversationssicher.'
          }
        },
        {
          role: { en: 'software', es: 'software', de: 'software' },
          text: {
            en: 'autocad, civil 3d, revit, sketchup, adobe creative cloud, affinity, office suite, antigravity, rhinoceros, grasshopper, fusion 3d, blender, mysql, n8n, google cloud console.',
            es: 'autocad, civil 3d, revit, sketchup, adobe creative cloud, affinity, office suite, antigravity, rhinoceros, grasshopper, fusion 3d, blender, mysql, n8n, google cloud console.',
            de: 'autocad, civil 3d, revit, sketchup, adobe creative cloud, affinity, office suite, antigravity, rhinoceros, grasshopper, fusion 3d, blender, mysql, n8n, google cloud console.'
          }
        },
        {
          role: { en: 'practical skills', es: 'habilidades prácticas', de: 'praktische fähigkeiten' },
          text: {
            en: 'drafting and drawing, woodworking, device troubleshooting, electronic circuits, electrical installations, public speaking.',
            es: 'dibujo y plano técnico, carpintería, solución de problemas en dispositivos, circuitos electrónicos, instalaciones eléctricas, oratoria.',
            de: 'zeichnen und planung, holzverarbeitung, gerätefehlersuche, elektronische schaltungen, elektroinstallationen, rhetorik.'
          }
        }
      ]
    },
    '4_2': {
      title: { en: 'contact info', es: 'información de contacto', de: 'kontaktinformationen' },
      body: {
        en: 'reach out to me for inquiries or feedback:<br><br>• email: <a href="mailto:prosiuk@proton.me">prosiuk@proton.me</a><br>• instagram: <a href="https://instagram.com/fnprosiuk" target="_blank">@fnprosiuk</a><br>• linkedin: <a href="https://www.linkedin.com/in/prosiuk/" target="_blank">linkedin.com/in/prosiuk</a><br>• location: bahia blanca, argentina',
        es: 'contactame para consultas o sugerencias:<br><br>• correo: <a href="mailto:prosiuk@proton.me">prosiuk@proton.me</a><br>• instagram: <a href="https://instagram.com/fnprosiuk" target="_blank">@fnprosiuk</a><br>• linkedin: <a href="https://www.linkedin.com/in/prosiuk/" target="_blank">linkedin.com/in/prosiuk</a><br>• ubicación: bahía blanca, argentina',
        de: 'kontaktieren sie mich für anfragen oder feedback:<br><br>• e-mail: <a href="mailto:prosiuk@proton.me">prosiuk@proton.me</a><br>• instagram: <a href="https://instagram.com/fnprosiuk" target="_blank">@fnprosiuk</a><br>• linkedin: <a href="https://www.linkedin.com/in/prosiuk/" target="_blank">linkedin.com/in/prosiuk</a><br>• standort: bahía blanca, argentinien'
      },
      columns: 2,
      img: ''
    }
  },
  TRANSLATIONS: {
    en: {
      categories: ['design & media', 'civil', 'electronics', 'education', 'profile'],
      folders: [
        ['showreels', 'animations', 'screen clips'],
        ['projects', 'designs', 'drawings'],
        ['schematics', 'prototypes', 'codebases'],
        ['courses', 'certifications', 'degrees'],
        ['about me', 'skills', 'contact info']
      ],
      emptyFolderDesc: 'empty folder',
      modalEmptyText: 'this folder is currently empty.',
      hints: ['browse category', 'browse folder', 'open']
    },
    es: {
      categories: ['diseño & medios', 'civil', 'electrónica', 'educación', 'perfil'],
      folders: [
        ['demostraciones', 'animaciones', 'clips de pantalla'],
        ['proyectos', 'diseños', 'planos'],
        ['esquemas', 'prototipos', 'código fuente'],
        ['cursos', 'certificaciones', 'títulos'],
        ['sobre mí', 'habilidades', 'información de contacto']
      ],
      emptyFolderDesc: 'carpeta vacía',
      modalEmptyText: 'esta carpeta está actualmente vacía.',
      hints: ['navegar categoría', 'navegar carpeta', 'abrir']
    },
    de: {
      categories: ['design & medien', 'bauwesen', 'elektronik', 'bildung', 'profil'],
      folders: [
        ['showreels', 'animationen', 'bildschirmclips'],
        ['projekte', 'entwürfe', 'zeichnungen'],
        ['schaltpläne', 'prototypen', 'quellcode'],
        ['kurse', 'zertifikate', 'abschlüsse'],
        ['über mich', 'fähigkeiten', 'kontaktinformationen']
      ],
      emptyFolderDesc: 'leerer ordner',
      modalEmptyText: 'dieser ordner ist derzeit leer.',
      hints: ['kategorie durchsuchen', 'ordner durchsuchen', 'öffnen']
    }
  }
};
