import { HttpClient } from '@angular/common/http';
import { RentalComponent } from './rental.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RentalService } from 'src/app/services/lodging/rental.service';
import { defer } from 'rxjs';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Rental } from 'src/app/data/rental.model';


describe('RentalComponent', () => {
  let httpClient: HttpClient;
  let component: RentalComponent;
  let fixture: ComponentFixture<RentalComponent>;
  let getSpy;
  let rentals;
  let rentalService;
  const rentalMock: Rental[] = [
    {
      id: '0',
      lodgingId:'0',
      name: "another one",
      rentalUnit: null,
      rentalUnitId: null,
      images: [],
    },
  ];

  beforeEach(() => {
    rentalService = jasmine.createSpyObj('RentalService', ['get']);

    getSpy = rentalService.get.and.returnValue(asyncData(rentalMock));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RentalComponent],
      providers: [{ provide: RentalService, useValue: rentalService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalComponent);
    component = fixture.componentInstance;
  });

  it('should show rental', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(document.getElementsByClassName('rental').length).toBeGreaterThan(0, '');
    });
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
