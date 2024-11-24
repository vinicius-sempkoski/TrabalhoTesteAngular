import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OmdbComponent } from './omdb.component';
import { OmdbService } from './omdb.service';

describe('Componente Omdb', () => {
  let component: OmdbComponent;
  let fixture: ComponentFixture<OmdbComponent>;
  let omdbServiceSpy: jasmine.SpyObj<OmdbService>;

  beforeEach(async () => {
    const omdbServiceMock = jasmine.createSpyObj('OmdbService', ['getFilmes', 'getFilmeDetalhes']);

    await TestBed.configureTestingModule({
      imports: [OmdbComponent],
      providers: [{ provide: OmdbService, useValue: omdbServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(OmdbComponent);
    component = fixture.componentInstance;
    omdbServiceSpy = TestBed.inject(OmdbService) as jasmine.SpyObj<OmdbService>;
    fixture.detectChanges();
  });

  it('deve adicionar um filme aos favoritos se ainda não estiver favoritado', () => {
    const mockFilme = { Title: 'Filme Favorito', imdbID: 'tt1234567' };
    localStorage.setItem('favoritos', JSON.stringify([]));

    component.onFavoritar(mockFilme);

    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    expect(favoritos).toContain(mockFilme);
    expect(component.mensagem).toBe('Filme "Filme Favorito" adicionado aos favoritos!');
  });

  it('não deve adicionar um filme aos favoritos se já estiver favoritado', () => {
    const mockFilme = { Title: 'Filme Favorito', imdbID: 'tt1234567' };
    localStorage.setItem('favoritos', JSON.stringify([mockFilme]));

    component.onFavoritar(mockFilme);

    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    expect(favoritos.length).toBe(1);
    expect(component.mensagem).toBe('Filme "Filme Favorito" já está nos favoritos.');
  });
});
