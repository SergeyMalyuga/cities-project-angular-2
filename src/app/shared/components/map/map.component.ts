import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import * as L from 'leaflet';
import {City} from '../../../core/models/city';
import {OfferPreview} from '../../../core/models/offers';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input({required: true}) currentCity!: City;
  @Input({required: true}) activeCard!: OfferPreview | null;
  @Input({required: true}) offers!: OfferPreview[];

  private map!: L.Map;
  private center!: L.LatLngExpression
  private marker: L.Marker[] = [];

  private defaultCustomIcon = new L.Icon({
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  private currentCustomIcon = new L.Icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  ngAfterViewInit(): void {
    this.center = [this.currentCity.location.latitude, this.currentCity.location.longitude];
    this.map = new L.Map('map', {
      center: this.center,
      zoomControl: false,
      zoom: 12,
    })

    const tiles = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    this.addMarkers();
  }

  private addMarkers(): void {
    this.offers.forEach(offer => {
      const marker = new L.Marker([offer.location.latitude, offer.location.longitude])
        .bindTooltip(offer.title, {permanent: false, direction: 'top', offset: [0, -20]})
        .setIcon(this.activeCard && offer.id === this.activeCard.id ? this.currentCustomIcon : this.defaultCustomIcon).addTo(this.map);
      this.marker.push(marker);
    })
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
