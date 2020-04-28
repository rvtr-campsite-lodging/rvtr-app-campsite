import { HttpClient } from '@angular/common/http';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { defer } from 'rxjs';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RentalUnitComponent } from './rental-unit.component';
import { RentalUnit } from 'src/app/data/rental-unit.model';
import { RentalUnitService } from 'src/app/services/lodging/rental-unit.service';

describe('RentalUnitComponent', () => {
  let httpClient: HttpClient;
  let component: RentalUnitComponent;
  let fixture: ComponentFixture<RentalUnitComponent>;
  let getSpy;
  let rentalUnitService;
  const rentalUnitMock: RentalUnit[] = [
    {
      id: '0',
      bathrooms: null,
      bedrooms: null,
      name: "rentalMock",
      occupancy: null,
      type: null
    },
  ];
  beforeEach(() => {
    rentalUnitService = jasmine.createSpyObj('RentalUnitService', ['get']);

    getSpy = rentalUnitService.get.and.returnValue(asyncData(rentalUnitMock));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RentalUnitComponent],
      providers: [{ provide: RentalUnitService, useValue: rentalUnitService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalUnitComponent);
    component = fixture.componentInstance;
  });

  it('should show rentalUnit', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(document.getElementsByClassName('rentalUnit').length).toBeGreaterThan(0, '');
    });
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
