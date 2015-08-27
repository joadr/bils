Mediums.attachSchema({
  category: {
    type: String,
    label: "Categoría",
    allowedValues: ['Prensa escrita', 'Radio', 'TV', 'Online'],
    optional: true
  },
  subCategory: {
    type: String,
    label: "Subtipo",
    allowedValues: ['Diario principal', 'Suplemento', 'Diario web', 'Blog'],
    optional: true
  },
  style: {
    type: String,
    label: "Estilo",
    optional: true
  },
  zone: {
    type: String,
    label: "zona",
    allowedValues: ['Regional', 'Nacional'],
    optional: true
  },
  city: {
    type: String,
    label: "Ciudad",
    allowedValues: ['Algarrobo', 'Alhue', 'Alto Biobio', 'Alto Del Carmen', 'Alto Hospicio', 'Ancud', 'Andacollo', 'Angol', 'Antofagasta', 'Antuco', 'Arauco', 'Arica', 'Aysen', 'Buin', 'Bulnes', 'Cabildo', 'Cabo De Hornos', 'Cabrero', 'Calama', 'Calbuco', 'Caldera', 'Calera De Tango', 'Calle Larga', 'Camarones', 'Camina', 'Canela', 'Canete', 'Carahue', 'Cartagena', 'Casablanca', 'Castro', 'Catemu', 'Cauquenes', 'Cerrillos', 'Cerro Navia', 'Chaiten', 'Chanaral', 'Chanco', 'Chepica', 'Chiguayante', 'Chile Chico', 'Chillan', 'Chillan Viejo', 'Chimbarongo', 'Cholchol', 'Chonchi', 'Cisnes', 'Cobquecura', 'Cochamo', 'Cochrane', 'Codegua', 'Coelemu', 'Coihueco', 'Coinco', 'Colbun', 'Colchane', 'Colina', 'Collipulli', 'Coltauco', 'Combarbala', 'Concepcion', 'Conchali', 'Concon', 'Constitucion', 'Contulmo', 'Copiapo', 'Coquimbo', 'Coronel', 'Corral', 'Coyhaique', 'Cunco', 'Curacautin', 'Curacavi', 'Curaco De Velez', 'Curanilahue', 'Curarrehue', 'Curepto', 'Curico', 'Dalcahue', 'Diego De Almagro', 'Donihue', 'El Bosque', 'El Carmen', 'El Monte', 'El Quisco', 'El Tabo', 'Empedrado', 'Ercilla', 'Estacion Central', 'Florida', 'Freire', 'Freirina', 'Fresia', 'Frutillar', 'Futaleufu', 'Futrono', 'Galvarino', 'General Lagos', 'Gorbea', 'Graneros', 'Guaitecas', 'Hijuelas', 'Hualaihue', 'Hualane', 'Hualpen', 'Hualqui', 'Huara', 'Huasco', 'Huechuraba', 'Illapel', 'Independencia', 'Iquique', 'Isla De Maipo', 'Isla De Pascua', 'Juan Fernandez', 'La Calera', 'La Cisterna', 'La Cruz', 'La Estrella', 'La Florida', 'La Granja', 'La Higuera', 'La Ligua', 'La Pintana', 'La Reina', 'La Serena', 'La Union', 'Lago Ranco', 'Lago Verde', 'Laguna Blanca', 'Laja', 'Lampa', 'Lanco', 'Las Cabras', 'Las Condes', 'Lautaro', 'Lebu', 'Licanten', 'Limache', 'Linares', 'Litueche', 'Llanquihue', 'Llay-Llay', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Lolol', 'Loncoche', 'Longavi', 'Lonquimay', 'Los Alamos', 'Los Andes', 'Los Angeles', 'Los Lagos', 'Los Muermos', 'Los Sauces', 'Los Vilos', 'Lota', 'Lumaco', 'Machali', 'Macul', 'Mafil', 'Maipu', 'Malloa', 'Marchigue', 'Maria Elena', 'Maria Pinto', 'Mariquina', 'Maule', 'Maullin', 'Mejillones', 'Melipeuco', 'Melipilla', 'Molina', 'Monte Patria', 'Mulchen', 'Nacimiento', 'Nancagua', 'Natales', 'Navidad', 'Negrete', 'Ninhue', 'Niquen', 'Nogales', 'Nueva Imperial', 'Nunoa', 'Ohiggins', 'Olivar', 'Ollague', 'Olmue', 'Osorno', 'Ovalle', 'Padre Hurtado', 'Padre Las Casas', 'Paihuano', 'Paillaco', 'Paine', 'Palena', 'Palmilla', 'Panguipulli', 'Panquehue', 'Papudo', 'Paredones', 'Parral', 'Pedro Aguirre Cerda', 'Pelarco', 'Pelluhue', 'Pemuco', 'Penaflor', 'Penalolen', 'Pencahue', 'Penco', 'Peralillo', 'Perquenco', 'Petorca', 'Peumo', 'Pica', 'Pichidegua', 'Pichilemu', 'Pinto', 'Pirque', 'Pitrufquen', 'Placilla', 'Portezuelo', 'Porvenir', 'Pozo Almonte', 'Primavera', 'Providencia', 'Puchuncavi', 'Pucon', 'Pudahuel', 'Puente Alto', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Pumanque', 'Punitaqui', 'Punta Arenas', 'Puqueldon', 'Puren', 'Purranque', 'Putaendo', 'Putre', 'Puyehue', 'Queilen', 'Quellon', 'Quemchi', 'Quilaco', 'Quilicura', 'Quilleco', 'Quillon', 'Quillota', 'Quilpue', 'Quinchao', 'Quinta De Tilcoco', 'Quinta Normal', 'Quintero', 'Quirihue', 'Rancagua', 'Ranquil', 'Rauco', 'Recoleta', 'Renaico', 'Renca', 'Rengo', 'Requinoa', 'Retiro', 'Rinconada', 'Rio Bueno', 'Rio Claro', 'Rio Hurtado', 'Rio Ibanez', 'Rio Negro', 'Rio Verde', 'Romeral', 'Saavedra', 'Sagrada Familia', 'Salamanca', 'San Antonio', 'San Bernardo', 'San Carlos', 'San Clemente', 'San Esteban', 'San Fabian', 'San Felipe', 'San Fernando', 'San Francisco De Mostazal', 'San Gregorio', 'San Ignacio', 'San Javier', 'San Joaquin', 'San Jose De Maipo', 'San Juan De La Costa', 'San Miguel', 'San Nicolas', 'San Pablo', 'San Pedro', 'San Pedro De Atacama', 'San Pedro De La Paz', 'San Rafael', 'San Ramon', 'San Rosendo', 'San Vicente', 'Santa Barbara', 'Santa Cruz', 'Santa Juana', 'Santa Maria', 'Santiago', 'Santiago Oeste', 'Santiago Sur', 'Santo Domingo', 'Sierra Gorda', 'Talagante', 'Talca', 'Talcahuano', 'Taltal', 'Temuco', 'Teno', 'Teodoro Schmidt', 'Tierra Amarilla', 'Til-Til', 'Timaukel', 'Tirua', 'Tocopilla', 'Tolten', 'Tome', 'Torres Del Paine', 'Tortel', 'Traiguen', 'Trehuaco', 'Tucapel', 'Valdivia', 'Vallenar', 'Valparaiso', 'Vichuquen', 'Victoria', 'Vicuna', 'Vilcun', 'Villa Alegre', 'Villa Alemana', 'Villarrica', 'Vina Del Mar', 'Vitacura', 'Yerbas Buenas', 'Yumbel', 'Yungay', 'Zapallar'],
    optional: true
  },
  relevance: {
    type: Number,
    label: 'Relevancia',
    allowedValues: [1,2,3,4,5],
    optional: true
  },
  views: {
    type: Number,
    label: "Tiraje",
    optional: true
  },
  reads: {
    type:
  }

});
