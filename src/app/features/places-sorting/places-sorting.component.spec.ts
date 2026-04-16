import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlacesSortingComponent} from './places-sorting.component';

describe('PlacesSortingComponent', () => {
  let component: PlacesSortingComponent;
  let fixture: ComponentFixture<PlacesSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesSortingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
