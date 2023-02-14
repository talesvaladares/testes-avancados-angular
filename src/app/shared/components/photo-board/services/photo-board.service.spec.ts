import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'example 1',
      src: 'image.jpg'
    },
    {
      id: 2,
      description: 'example 2',
      src: 'image.jpg'
    },
  ]
}

describe(`${PhotoBoardService.name}`, () => {

  let photoBoardService: PhotoBoardService;
  let httpController: HttpTestingController

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    }).compileComponents();

    photoBoardService = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController)

  });

  afterEach(() => {
    //serve para fazer uma verificação
    //se houve alguma respostas
    //se não houver ele mostrá uma mensagem
    //para que haja uma respostas para uma chamada
    //httpController.expectOne(mockData.api).flush(mockData.data);
    httpController.verify();
  });

  //teste usado para saber se a api está retornando os dados já formatados
  //para isso é necessário usaro HttpClientTestingModule
  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase` , done => {


    photoBoardService.getPhotos().subscribe(photos => {
      expect(photos[0].description).toBe('EXAMPLE 1');
      expect(photos[1].description).toBe('EXAMPLE 2');
      done();
    })

    //precisa ficar depois do subscribe
    //isso indica que quando a requisição for feita
    //ela será feita no meu mockdata api/url
    //se ela for feita retornará os dados de mockData.data
    httpController.expectOne(mockData.api).flush(mockData.data);

  });

})
