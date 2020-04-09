import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockFormComponent } from './create-stock-form.component';

describe('CreateStockFormComponent', () => {
  let component: CreateStockFormComponent;
  let fixture: ComponentFixture<CreateStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
