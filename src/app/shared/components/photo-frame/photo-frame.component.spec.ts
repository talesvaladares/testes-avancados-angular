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

  it(`(D) Should display number of likes when (@Input likes) is inscremented `, () => {
    fixture.detectChanges();
    component.likes++;
    expect(component.likes).toBe(1);
    fixture.detectChanges();

    //pega o elemento da DOM para realizar os testes
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(element.textContent.trim()).toBe('1');
  });

  it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();

    //pega o elemento da DOM para realizar os testes
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`(D) Should have aria-label with default (@input likes) value`, () => {
    fixture.detectChanges();

    //pega o elemento da DOM para realizar os testes
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`(D) Should display image with src and description when bound to properties`, () => {
    const description = 'some description';
    const src = 'image.jgp';

    component.description = description;
    component.src = src

    fixture.detectChanges();

    //pega o elemento da DOM para realizar os testes
    const img: HTMLElement = fixture.nativeElement.querySelector('img');

    expect(img.getAttribute('alt')).toBe(description);
    expect(img.getAttribute('src')).toBe(src);
  });

});
