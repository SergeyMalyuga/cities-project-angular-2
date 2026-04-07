import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
export class MapComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {


  @Input({required: true}) currentCity!: City;
  @Input({required: true}) activeCard!: OfferPreview | null;
  @Input({required: true}) offers!: OfferPreview[];

  private map!: L.Map;
  private center!: L.LatLngExpression
  private markers: L.Marker[] = [];

  private defaultCustomIcon = new L.Icon({
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  private currentCustomIcon = new L.Icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  ngOnInit(): void {
    this.center = [this.currentCity.location.latitude, this.currentCity.location.longitude];
  }

  ngAfterViewInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;
    if (changes['offers']) {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.addMarkers();
      this.map.setView(
        [this.currentCity.location.latitude, this.currentCity.location.longitude],
        12,
        {animate: true}
      )
    } else if (changes['activeCard']) {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.addMarkers();
    }
  }

  private addMarkers(): void {
    this.offers.forEach(offer => {
      const marker = new L.Marker([offer.location.latitude, offer.location.longitude])
        .bindTooltip(offer.title, {permanent: false, direction: 'top', offset: [0, -20]})
        .setIcon(this.activeCard && this.activeCard.id === offer.id ? this.currentCustomIcon : this.defaultCustomIcon).addTo(this.map);
      this.markers.push(marker);
    })
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
