import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

declare var google: any;
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public directionsPanel;
  public directionsDisplay;

  constructor(public navCtrl: NavController) {}
  ionViewDidLoad() {
    this.showMap(); //this.addMarkers(map);
  }

  showMap() {
    var origin = new google.maps.LatLng(40.19765868463258, 29.05735731124878);
    // map in ilk açıldığındaki konumu
    var options = {
      center: origin,
      zoom: 15,
      scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById("map"), options);
    this.addMarkers(map);
  }
  addMarkers(map) {
    let icon = {
      url: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png", // url
      scaledSize: new google.maps.Size(50, 50) // scaled size
    };
    var baslangic = new google.maps.LatLng(
        40.19765868463258,
        29.05735731124878
      ),
      bitis = new google.maps.LatLng(40.19765868463258, 29.15735731124878);

    let marker = new google.maps.Marker({
      map: map,
      position: baslangic,
      icon: icon // blue, red, orange, yellow, pink
    });

    let marker2 = new google.maps.Marker({
      map: map,
      position: bitis,
      icon: icon // blue, red, orange, yellow, pink
    });

    this.drawRoute(map, baslangic, bitis);
  }

  drawRoute(map, bas, bit) {
    let directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);

    directionsService.route(
      {
        origin: bas,
        destination: bit,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING'
      },
      (res, status) => {
        let colors = ["red", "blue", "purple", "black"];
        if (status == google.maps.DirectionsStatus.OK) {
          let durationAndDistances = "";
          // Her bir rota bir bir eklenir
          for (var i = 0, len = res.routes.length; i < len; i++) {
            new google.maps.DirectionsRenderer({
              map: map,
              directions: res,
              routeIndex: i,
              polylineOptions: {
                strokeColor: colors[i]
              }
            });
          }
        } else {
          console.warn(status);
        }
      }
    );
  }
}
