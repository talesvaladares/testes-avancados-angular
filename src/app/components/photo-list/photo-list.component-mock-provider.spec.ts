import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from '../../../app/shared/components/photo-board/test/build-photos-list'
import { Observable, of } from 'rxjs';
import { PhotoListModule } from './photo-list.module';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board-mock.service';

describe(`${PhotoListComponent.name} Mock Provider`,  () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  //esta abordagem é usada para mockar meu serviço e eu não precisar fazer um mock endividual
  //em todos os lugares que chama meu serviço

  //a forma que está comentada (useValue) é possivel mockar apenas um metodo do serviço
  //a forma useClass quer dizer que mockei todo o meu serviço e não apenas um metodo dele
  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ],
      providers: [{
        provide: PhotoBoardService,
        // useValue: {
        //   getPhotos() : Observable<Photo[]> {
        //     return of(buildPhotoList())
        //   }
        // }
        useClass: PhotoBoardMockService
      }]
    }).compileComponents()

    fixture = TestBed.createComponent(PhotoListComponent)
    component = fixture.componentInstance;

  })


  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('(D) Should display board when data arrives', () => {

    fixture.detectChanges();

    const board : HTMLElement = fixture.nativeElement.querySelector('app-photo-board');

    const loader: HTMLElement = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull();


  });

});
