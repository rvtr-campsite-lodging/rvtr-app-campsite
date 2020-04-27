import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalUnitComponent } from './rental-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RentalUnitComponent', () => {
  let component: RentalUnitComponent;
  let fixture: ComponentFixture<RentalUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RentalUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
