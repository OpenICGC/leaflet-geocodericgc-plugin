Leaflet + Geocodificador ICGC plugin
========================================

Plugin que permet tenir les funcions de geocodificació en un mapa fet amb Leaflet utilitzant el geocodificador ICGC fet amb Pelias.

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
	  url:'https://aws.icgc.cat/cerca_pelias/',
      expanded: true,
	  autocomplete: true,
	  focus:false
	  };
L.control.geocoder(geocodingOptions).addTo(map);
```

**Pas 4**: Provar!

## Demo
https://openicgc.github.io/leaflet-geocodericgc-plugin/

