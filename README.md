Leaflet + Geocodificador ICGC plugin
========================================

Plugin que permet tenir les funcions de geocodificació en un mapa fet amb Leaflet utilitzant el geocodificador ICGC fet amb Pelias.
2022/10/18: 
  - he fet una copia de la branca master de https://github.com/OpenICGC/leaflet-geocodericgc-plugin.git
  - He copiat els canvis fets a branca devel
  - He fet commit a https://autogitlab.icgc.local/i.fabrellas/leaflet-geocodericgc-plugin-autogitlab.git

## Requeriments

Cal utilitzar la lliberia de mapes  **[Leaflet](https://github.com/Leaflet/Leaflet)** . Suporta Leaflet **v0.7.3** (i superior) and **v1.0.0**. 

## Ús bàsic

**Pas 1:** Al codi HTML, importar els fitxers Javascript i CSS de Leafet

```javascript
<!-- Load Leaflet from CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"></script>

<!-- Load geocoding plugin after Leaflet -->
<script src="js/leaflet-geocoder.js"></script>
```

**Pas 2:** Al codi JavaScript, inicialitzar el mapa de Leaflet.

```javascript
// This is an example of Leaflet usage; you should modify this for your needs.
var map = L.map('map', {
      center:[41.431, 1.8580],
      zoom: 8,
      minZoom:2,
	  maxZoom:18,
      scrollWheelZoom: true
    });
```

**Pas 3:** Al codi JavaScript, afegir la configuració del geocodificador amb la URL.

```javascript
var geocodingOptions = {      
	  //url:'https://betaserver2.icgc.cat/geocodificador',
    url:'https://eines.icgc.cat/geocodificador',
    expanded: true,
	  autocomplete: true,
	  focus:false
	  };
L.control.geocoder(geocodingOptions).addTo(map);
```

**Pas 4**: Provar!

## Demo
https://openicgc.github.io/leaflet-geocodericgc-plugin/

## ####################################################
## Pujada al servidor senodedev01

# copiar carpeta leaflet-geocodericgc-plugin-autogitlab a /home/des.web/aplicacions/visor_leaflet_pelias2023


# Fitxer Dockerfile a /home/des.web/aplicacions/visor_leaflet_pelias2023:

	# Instruction for Dockerfile to create a new image on top of the base image (httpd)
	FROM httpd:2.4
	COPY /leaflet-geocodericgc-plugin-autogitlab/. /usr/local/apache2/htdocs/

# esborrar contenidor
sudo docker rm --force visor_leaflet_pelias2023

# esborrar imatge
sudo docker rmi visor_leaflet_pelias2023

# Crear la imatge:
cd /home/des.web/aplicacions/visor_leaflet_pelias2023/leaflet-geocodericgc-plugin-autogitlab
sudo docker build -f build/Dockerfile -t visor_leaflet_pelias2023 .


# Arrencar el contenidor:
sudo docker run -d --name visor_leaflet_pelias2023 -p 85:80 visor_leaflet_pelias2023


# Execucio:
http://172.20.70.27:85/

## ################################

# Execució 
Cal engegar apache.
En el cas del servidors de PRE/PROD, cal engegar el docker d'apache i projecte

cd /home/des.web/serveis/visor_pelias  
sudo docker rmi icgc/visor_pelias
chmod 777 deploy_dev.sh  
./deploy_dev.sh  
sudo docker ps  

