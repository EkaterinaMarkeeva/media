export default class UserGeolocation {
  constructor(target) {
    this.target = target;
    
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;
      
        this.target.position = { latitude, longitude };

        this.target.processingDataMessage();
      }, () => {
        this.target.view.createPopupError();
      }, { enableHighAccuracy: true});
    }
  }
}
