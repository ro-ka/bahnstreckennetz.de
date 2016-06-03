/**
 * A marker at the users position
 */
export default class {
  /**
   * Initialize
   */
  constructor() {
    if (!navigator.geolocation) {
      return;
    }

    this.$button = document.querySelector('.user-position');
    this.$button.classList.add('user-position--show');
    this.$button.addEventListener('click', this.getPosition.bind(this));
  }

  /**
   * Initialize
   * @param {mapbox.Map} mapCanvas The map
   */
  initialize(mapCanvas) {
    this.mapCanvas = mapCanvas;

    this.mapCanvas.addSource('user', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    this.mapCanvas.addLayer({
      id: 'user',
      type: 'circle',
      source: 'user',
      paint: {
        'circle-radius': 7,
        'circle-color': '#F45252'
      }
    });
  }

  /**
   * Get the position of the user
   */
  getPosition() {
    this.$button.classList.add('user-position--searching');
    navigator.geolocation.getCurrentPosition(
      this.onPosition.bind(this), this.onError.bind(this));
  }

  /**
   * When the position loaded
   * @param {Object} position The users position
   */
  onPosition(position) {
    const userPosition = [position.coords.longitude, position.coords.latitude];

    this.$button.classList.remove('user-position--searching');

    this.mapCanvas.flyTo({center: userPosition, zoom: 10});
    this.mapCanvas.getSource('user').setData({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: userPosition
      }
    });
  }

  /**
   * When there was some error
   */
  onError() {
    this.$button.classList.remove('user-position--searching');
    console.log('No Geolocation');
  }
}
