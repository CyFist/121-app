import React, { useState } from "react";
import DeckGL from '@deck.gl/react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl'
import maplibregl from "maplibre-gl";
import {GeoJsonLayer} from '@deck.gl/layers';

import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';

import './map.css';

export const Map = () => {
      const [viewState, setViewState] = useState({
        longitude: 103.731667,
        latitude: 1.208333,
        zoom: 7
      });

      
  return (
    <div className="map-wrap">
    <ReactMapGL
    {...viewState}
    attributionControl={false}
    mapLib={maplibregl}
    onMove={evt => setViewState(evt.viewState)}
      mapStyle='https://api.maptiler.com/maps/d0af1468-795c-4934-824f-d29b70f13777/style.json?key=mqJEvB3cbnsReZRBL9Ww'
    className="map"></ReactMapGL>
    </div>
  )
//  return <div className="map-wrap">
//            <DeckGL
//           initialViewState={viewState}
//            controller={true} 
//            layers={layer} >
//                <ReactMapGL
//                attributionControl={false}
//                mapLib={maplibregl}
//                mapStyle='https://api.maptiler.com/maps/d0af1468-795c-4934-824f-d29b70f13777/style.json?key=mqJEvB3cbnsReZRBL9Ww'
//                className="map">
//                  <FullscreenControl /> 
//                  </ReactMapGL> 
//                
//            </DeckGL>
//        </div>;
//}