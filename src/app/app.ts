import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANTE para o *ngIf e *ngFor funcionarem

@Component({
  selector: 'app-root',
  standalone: true, // Garanta que isso está aqui
  imports: [CommonModule], // Adicione o CommonModule aqui
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'Jogo da Velha - DevOps S3';
  cells: string[] = Array(9).fill('');
  turn: 'X' | 'O' = 'X';
  winner: string | null = null;

  makeMove(index: number) {
    if (!this.cells[index] && !this.winner) {
      this.cells[index] = this.turn;
      this.checkWinner();
      this.turn = this.turn === 'X' ? 'O' : 'X';
    }
  }

  checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
      [0, 4, 8], [2, 4, 6]             // diagonais
    ];
    for (let [a, b, c] of lines) {
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        this.winner = this.cells[a];
      }
    }
  }

  reset() {
    this.cells = Array(9).fill('');
    this.winner = null;
    this.turn = 'X';
  }
}