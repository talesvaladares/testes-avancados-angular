import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {

  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent = null;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it(`Should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) once when called multiple times within debouce time`, fakeAsync((() => {

    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    component.like();
    tick(500); // espera 500 milissegundos, so funciona dentro do fakeAsync
    expect(times).toBe(1)
  })));

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) two times when called outside debounce time`, fakeAsync((() => {

    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500); // espera 500 milissegundos, so funciona dentro do fakeAsync
    component.like();
    tick(500); // espera 500 milissegundos, so funciona dentro do fakeAsync
    expect(times).toBe(2);
  })));

});
