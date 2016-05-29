/* global mapboxgl */

import {point, featureCollection} from 'turf';

import mapConfig from '../config/map';
import Popup from './popup';
import rawStations from '../data/stations.json';

/**
 * The basemap
 */
export default class {
  /**
   * Initialize the map
   */
  constructor({onLoad = () => {}}) {
    this.canvas = new mapboxgl.Map({
      container: 'map',
      style: mapConfig.style,
      center: mapConfig.center,
      zoom: mapConfig.zoom
    });

    this.canvas.dragRotate.disable();
    this.canvas.touchZoomRotate.disableRotation();

    this.canvas.on('load', () => {
      onLoad(this.canvas);
      this.onLoad();
    });
    this.canvas.on('click', this.onClick.bind(this));
    this.canvas.on('mousemove', this.onMousemove.bind(this));
    this.canvas.on('zoom', this.onZoom.bind(this));
  }

  /**
   * When the map loaded
   */
  onLoad() {
    const stations = rawStations.map(station => point(
      [station[0], station[1]],
      {name: station[2]}
    ));

    this.canvas.addSource('stations', {
      type: 'geojson',
      data: featureCollection(stations)
    });

    this.canvas.addLayer({
      id: 'stations',
      type: 'circle',
      source: 'stations',
      paint: {
        'circle-radius': this.getStationSize(),
        'circle-color': '#6c6b6a'
      }
    });
  }

  /**
   * When the map got clicked
   * @param {Event} event The click event
   */
  onClick(event) {
    const stations = this.canvas.queryRenderedFeatures(
        event.point, {layers: ['stations']}),
      station = stations.length && stations[0];

    if (station) {
      this.popup = new Popup({mapCanvas: this.canvas, feature: station});
    }
  }

  /**
   * When the mouse got moved
   * @param {Event} event The click event
   */
  onMousemove(event) {
    const stations = this.canvas.queryRenderedFeatures(
        event.point, {layers: ['stations']});

    this.canvas.getCanvas().style.cursor = (stations.length) ? 'pointer' : '';
  }

  /**
   * When the map is zoomed
   */
  onZoom() {
    const stationSize = this.getStationSize();
    this.canvas.setPaintProperty('stations', 'circle-radius', stationSize);
  }

  /**
   * Get the size of a station
   * @return {Number} The size
   */
  getStationSize() {
    return this.canvas.getZoom() - 4;
  }
}
