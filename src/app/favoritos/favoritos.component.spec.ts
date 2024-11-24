import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosComponent } from './favoritos.component';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve remover um favorito corretamente', () => {
    const filmesSimulados = [
      { Title: 'Filme 1' },
      { Title: 'Filme 2' },
      { Title: 'Filme 3' }
    ];
    localStorage.setItem('favoritos', JSON.stringify(filmesSimulados));

    component.favoritos = [...filmesSimulados];

    component.removerFavorito(1);

    expect(component.favoritos.length).toBe(2);
    expect(component.favoritos).toEqual([
      { Title: 'Filme 1' },
      { Title: 'Filme 3' }
    ]);

    const favoritosAtualizados = JSON.parse(localStorage.getItem('favoritos') || '[]');
    expect(favoritosAtualizados).toEqual([
      { Title: 'Filme 1' },
      { Title: 'Filme 3' }
    ]);

    expect(component.mensagem).toBe('Filme "Filme 2" removido dos favoritos!');
  });
});
