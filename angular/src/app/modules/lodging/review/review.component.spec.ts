import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Review } from 'src/app/data/review.model';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { ReviewComponent } from './review.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';



describe('ReviewComponent', () => {
  let httpClient: HttpClient;
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let getSpy;
  let reviews;
  let reviewService;
  const reviewMock: Review[] = [
    {
      id: '1',
      accountId: '1',
      hotelId: '1',
      comment: 'blah',
      dateCreated: null,
      rating: 5
    },
  ];

  beforeEach(() => {
    reviewService = jasmine.createSpyObj('ReviewService', ['get']);

    getSpy = reviewService.get.and.returnValue(asyncData(reviewMock));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReviewComponent],
      providers: [{ provide: ReviewService, useValue: reviewService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
  });

  it('should show reviews', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(document.getElementsByClassName('review').length).toBeGreaterThan(0, '');
    });
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
