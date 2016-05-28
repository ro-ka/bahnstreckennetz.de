/* global mapboxgl */

import mapConfig from '../config/map';

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

    this.canvas.on('load', () => onLoad(this.canvas));
  }
}
