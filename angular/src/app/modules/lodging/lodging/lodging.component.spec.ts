import { HttpClient } from '@angular/common/http';
import { LodgingComponent } from './lodging.component';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { defer } from 'rxjs';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';


describe('LodgingComponent', () => {
  let httpClient: HttpClient;
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;
  let getSpy;
  let lodgingService;
  
  const lodgingMock: Lodging[] = [
    {
      id: '0',
      location: null,
      name: "another one",
      rentals: [],
      reviews: [],
      images: [],
    },
  ];

  beforeEach(() => {
    lodgingService = jasmine.createSpyObj('LodgingService', ['get']);

    getSpy = lodgingService.get.and.returnValue(asyncData(lodgingMock));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LodgingComponent],
      providers: [{ provide: LodgingService, useValue: lodgingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LodgingComponent);
    component = fixture.componentInstance;
  });

  it('should show lodging', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(document.getElementsByClassName('lodging').length).toBeGreaterThan(0, '');
    });
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
