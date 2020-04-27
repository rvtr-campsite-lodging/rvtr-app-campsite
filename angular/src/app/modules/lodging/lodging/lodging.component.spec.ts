import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';
import { Observable, of, defer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LodgingComponent', () => {
  let httpClient: HttpClient;
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;
  let lodgingService: LodgingService;
  let spy: jasmine.Spy;
  let quoteEl;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LodgingComponent ],
      providers: [
        { provide: LodgingService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingComponent);
    lodgingService = fixture.debugElement.injector.get(LodgingService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

