import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchComponent } from './recent-search.component';

describe('RecentSearchComponent', () => {
  let component: RecentSearchComponent;
  let fixture: ComponentFixture<RecentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentSearchComponent]
    });
    fixture = TestBed.createComponent(RecentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
