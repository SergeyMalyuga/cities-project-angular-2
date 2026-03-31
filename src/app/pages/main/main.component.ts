import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    HeaderComponent
  ]
})
export class MainComponent {}
