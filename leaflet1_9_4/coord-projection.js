L.Control.coordProjection = L.Control.extend({
    options: {
      position: 'bottomleft',
      separator: ' | ',
      emptyString: ' ',
      lngFirst: true,
      numDigits: 3,
      lngFormatter: undefined,
      latFormatter: undefined,
      prefix: "",
      crs: 'EPSG4326',
    },
  
    onAdd: function (map) {
      this._container = L.DomUtil.create('div', 'leaflet-control-coord-projection');
      L.DomEvent.disableClickPropagation(this._container);
      map.on('mousemove', this._onMouseMove, this);
      this._container.innerHTML=this.options.emptyString;
      return this._container;
    },
  
    onRemove: function (map) {
      map.off('mousemove', this._onMouseMove)
    },
  
    _onMouseMove: function (e) {
       this.options.numDigits = 6;
        
        let lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        let lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        let value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        let prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
    },
  
    _projectTo: function (crs, latLng) {
        let position;

        if (crs instanceof L.Proj.CRS) {
            position = crs.project(latLng);
            return position;
        }
  
        switch (crs) {            
            case 'EPSG3395':
                position = L.Projection.Mercator.project(latLng);
                break;
            case 'EPSG3857':
                position = L.Projection.SphericalMercator.project(latLng);
                break;
            default: // Default is 'EPSG4326'
                return latLng;
        }
       // return position;
      },
    
      changeCrs: function (crs) {
          this.options.crs = crs;
      }
  });
  
  L.Map.mergeOptions({
      positionControl: false
  });
  
  L.Map.addInitHook(function () {
      if (this.options.positionControl) {
          this.positionControl = new L.Control.coordProjection();
          this.addControl(this.positionControl);
      }
  });
  
  L.control.coordProjection = function (options) {
      return new L.Control.coordProjection(options);
  };
