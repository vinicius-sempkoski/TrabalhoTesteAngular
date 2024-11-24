import {Component, inject} from '@angular/core';
import {OmdbService} from './omdb.service';
import {tap} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-omdb',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './omdb.component.html',
  styleUrl: './omdb.component.css',
})
export class OmdbComponent {
  private OmdbService = inject(OmdbService);
  public titulo = new FormControl(null);
  public filmesDetalhados: any[] = [];
  public mensagem: string = '';

  public onBusca() {
    this.filmesDetalhados = [];
    this.mensagem = '';

    let tituloSemEspacos = this.titulo.value || '' as string;
    if (tituloSemEspacos && tituloSemEspacos[tituloSemEspacos.length - 1] === ' ') {
      tituloSemEspacos = tituloSemEspacos.slice(0, -1);
    }

    if (this.titulo.value) {
      this.OmdbService.getFilmes(tituloSemEspacos)
        .pipe(
          tap((response: any) => {
            const filmes = response.Search || [];
            filmes.forEach((filme: any) => {
              this.OmdbService.getFilmeDetalhes(filme.imdbID).subscribe(
                (detalhes) => {
                  this.filmesDetalhados.push(detalhes);
                },
                (error) => {
                  this.mensagem = 'Erro ao buscar detalhes do filme.';
                  this.displayMensagem();
                }
              );
            });
          })
        )
        .subscribe(
          null,
          (error) => {
            this.mensagem = 'Erro ao buscar filmes.';
            this.displayMensagem();
          }
        );
    }
  }

  public onFavoritar(filme: any) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const jaFavoritado = favoritos.some((fav: any) => fav.imdbID === filme.imdbID);

    if (!jaFavoritado) {
      favoritos.push(filme);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      this.mensagem = `Filme "${filme.Title}" adicionado aos favoritos!`;
      this.displayMensagem();
    } else {
      this.mensagem = `Filme "${filme.Title}" já está nos favoritos.`;
      this.displayMensagem();
    }
  }

  private displayMensagem() {
    const mensagemElement = document.querySelector('.mensagem') as HTMLElement;

    if (mensagemElement) {
      mensagemElement.classList.remove('fade-out');
    }

    void mensagemElement?.offsetWidth;

    setTimeout(() => {
      if (mensagemElement) {
        mensagemElement.classList.add('fade-out');
      }
    }, 5000);
  }
}
