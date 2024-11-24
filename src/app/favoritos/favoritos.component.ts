import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-favoritos',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

  public favoritos: any[] = [];
  public mensagem: string = '';

  constructor() {
    const filmesFavoritos = localStorage.getItem('favoritos');
    if (filmesFavoritos) {
      this.favoritos = JSON.parse(filmesFavoritos);
    }
  }

  public removerFavorito(index: number): void {
    const filmeRemovido = this.favoritos[index];
    this.favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    this.mensagem = `Filme "${filmeRemovido.Title}" removido dos favoritos!`;
    this.displayMensagem();
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
