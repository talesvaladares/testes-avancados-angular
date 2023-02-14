import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from '../../../app/shared/components/photo-board/test/build-photos-list'
import { of } from 'rxjs';
import { PhotoListModule } from './photo-list.module';

describe(`${PhotoListComponent.name}`,  () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let photoBoardService: PhotoBoardService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoListComponent)
    component = fixture.componentInstance;
    photoBoardService = TestBed.inject(PhotoBoardService);
  })


  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('(D) Should display board when data arrives', () => {
    const photos = buildPhotoList();

    //mocko a api para retornar os dados que eu quero e não fazer a chamada no backend
    //informo o serviço, qual método do serviço será mockado e depois digo como será o retorno
    spyOn(photoBoardService, 'getPhotos').and.returnValue(of(photos));

    fixture.detectChanges();

    const board : HTMLElement = fixture.nativeElement.querySelector('app-photo-board');

    const loader: HTMLElement = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull();


  });

  it('(D) Should display loader while waiting for data', () => {

    spyOn(photoBoardService, 'getPhotos').and.returnValue(null);

    fixture.detectChanges();

    const board : HTMLElement = fixture.nativeElement.querySelector('app-photo-board');

    const loader: HTMLElement = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();


  });


});
