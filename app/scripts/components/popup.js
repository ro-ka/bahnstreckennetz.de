/* global mapboxgl */

/**
 * The infowindow popup
 */
export default class {
  /**
   * Initialize the map
   * @param {mapbox.Map} mapCanvas The map canvas
   * @param {Object} feature The clicked feature
   */
  constructor({mapCanvas, feature}) {
    const baseUrl = 'https://reiseauskunft.bahn.de/bin/query.exe/dn' +
        '?country=DEU&S=',
      name = feature.properties.name;

    this.mapCanvas = mapCanvas;
    this.popup = new mapboxgl.Popup();

    this.popup.setLngLat(feature.geometry.coordinates)
      .setHTML(`<b>${name}</b></br>
        <a href='${baseUrl}${encodeURIComponent(name)}'
          title='Verbindungen für ${name} suchen'
          target='_blank'>
            &raquo; Verbindungen suchen
        </a>`)
      .addTo(this.mapCanvas);
  }
}
