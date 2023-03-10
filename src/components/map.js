import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { StylesControl  } from 'mapbox-gl-controls';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

class HelloWorldControl {
    onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl';
    this._container.textContent = 'Hello, world';
    return this._container;
    }
     
    onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
    }
    }

export function MapGL(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(103.731667);
  const [lat] = useState(1.208333);
  const [zoom] = useState(7);
  const [API_KEY] = useState('mqJEvB3cbnsReZRBL9Ww');

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current, // container id
      style: `https://api.maptiler.com/maps/d0af1468-795c-4934-824f-d29b70f13777/style.json?key=${API_KEY}`, // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      attributionControl: false // remove attribution
    });
    map.current.addControl(new HelloWorldControl(), 'bottom-left');
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'nautical'
        }), 'bottom-left');
    

      map.current.on('load', function () {
        map.current.addSource('maine', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'geometry': {
        'type': 'Polygon',
        'coordinates': [
        [
            [
                103.731667,
                1.208333
            ],
            [
                103.78997393982367,
                1.2083330002795634
            ],
            [
                103.78969311545924,
                1.2026191956284533
            ],
            [
                103.78885347176609,
                1.1969604238028377
            ],
            [
                103.78746309830363,
                1.191411181305211
            ],
            [
                103.78553538816745,
                1.1860249095001982
            ],
            [
                103.78308890889326,
                1.1808534799805879
            ],
            [
                103.78014722354496,
                1.175946695061085
            ],
            [
                103.77673866371264,
                1.171351808208427
            ],
            [
                103.77289605660965,
                1.1671130690242681
            ],
            [
                103.76865640889848,
                1.1632712971606163
            ],
            [
                103.76406055029067,
                1.1598634892688975
            ],
            [
                103.75915274035366,
                1.1569224627655947
            ],
            [
                103.75398024230955,
                1.1544765398429355
            ],
            [
                103.74859286792888,
                1.15254927476568
            ],
            [
                103.74304249789988,
                1.1511592270784066
            ],
            [
                103.73738258228887,
                1.150319782905822
            ],
            [
                103.7316676258995,
                1.150039026065785
            ],
            [
                103.72595266348277,
                1.1503196602353345
            ],
            [
                103.72029272984766,
                1.1511589829187434
            ],
            [
                103.71474232997136,
                1.1525489114680918
            ],
            [
                103.70935491420758,
                1.1544760609059708
            ],
            [
                103.70418236364301,
                1.1569218728014163
            ],
            [
                103.69927449055388,
                1.1598627939588741
            ],
            [
                103.69467855877038,
                1.1632705032006179
            ],
            [
                103.69043882856444,
                1.1671121840601952
            ],
            [
                103.68659613044204,
                1.1713508407625897
            ],
            [
                103.683187471942,
                1.175945654450142
            ],
            [
                103.68024568122782,
                1.1808523762258365
            ],
            [
                103.67779909090414,
                1.1860237532310773
            ],
            [
                103.67587126510422,
                1.191409983656946
            ],
            [
                103.6744807724776,
                1.1969591963092132
            ],
            [
                103.67364100726739,
                1.202617950110746
            ],
            [
                103.6733600602032,
                1.2083317487327023
            ],
            [
                103.6736406404573,
                1.2140455653998725
            ],
            [
                103.67448004942007,
                1.2197043728171388
            ],
            [
                103.67587020655267,
                1.2252536731142427
            ],
            [
                103.677797727073,
                1.230640022705362
            ],
            [
                103.68024405073206,
                1.2358115470084374
            ],
            [
                103.6831856204462,
                1.2407184400662932
            ],
            [
                103.68659410906915,
                1.2453134442565006
            ],
            [
                103.69043669212402,
                1.2495523054681923
            ],
            [
                103.69467636387259,
                1.2533941993599114
            ],
            [
                103.69473309592556,
                1.2534406896680503
            ],
            [
                103.731667,
                1.208333
            ]
        ]
        ]
        }
        }
        });
        map.current.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
        'fill-color': 'red',
        'fill-opacity': 0.05
        }
        });
        map.current.addLayer({
            'id': 'maine1',
            'type': 'line',
            'source': 'maine',
            'layout': {},
            'paint': {
            'line-color': 'red',
            'line-width': 0.5
            }
            });
        });
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}