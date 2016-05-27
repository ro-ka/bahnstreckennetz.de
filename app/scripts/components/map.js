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
        style: 'mapbox://styles/roka/ciomo4s7f0011dkm0lzhvi74w',
        center: [10.45, 51.21],
        zoom: 6
    });

    this.canvas.dragRotate.disable();
    this.canvas.touchZoomRotate.disableRotation();

    this.canvas.on('load', () => onLoad(this.canvas));
  }
}
