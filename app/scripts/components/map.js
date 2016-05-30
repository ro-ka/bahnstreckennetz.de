/* global mapboxgl */

import mapConfig from '../config/map';
import Popup from './popup';

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
      zoom: mapConfig.zoom,
      minZoom: mapConfig.minZoom
    });

    this.canvas.dragRotate.disable();
    this.canvas.touchZoomRotate.disableRotation();

    this.canvas.on('load', () => onLoad(this.canvas));
    this.canvas.on('click', this.onClick.bind(this));
    this.canvas.on('mousemove', this.onMousemove.bind(this));
  }

  /**
   * When the map got clicked
   * @param {Event} event The click event
   */
  onClick(event) {
    const stations = this.canvas.queryRenderedFeatures(
        event.point, {layers: ['railwaystationnodes']}),
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
        event.point, {layers: ['railwaystationnodes']});

    this.canvas.getCanvas().style.cursor = stations.length ? 'pointer' : '';
  }
}
