import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateDialogComponent } from './document-create-dialog.component';

describe('DocumentCreateDialogComponent', () => {
  let component: DocumentCreateDialogComponent;
  let fixture: ComponentFixture<DocumentCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
