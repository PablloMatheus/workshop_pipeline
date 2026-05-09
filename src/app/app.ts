import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Jogo da Velha Pro - V2.0';
  cells: string[] = Array(9).fill('');
  turn: 'X' | 'O' = 'X';
  winner: string | null = null;
  
  // Novas funcionalidades da V2
  score = { x: 0, o: 0 };
  history: string[] = [];

  makeMove(index: number) {
    if (!this.cells[index] && !this.winner) {
      this.cells[index] = this.turn;
      this.history.push(`Jogador ${this.turn} marcou a casa ${index + 1}`);
      this.checkWinner();
      if (!this.winner) {
        this.turn = this.turn === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        this.winner = this.cells[a];
        this.winner === 'X' ? this.score.x++ : this.score.o++;
        this.history.push(`FIM DE JOGO: Vitoria do ${this.winner}`);
        return;
      }
    }
    if (!this.cells.includes('') && !this.winner) {
      this.winner = 'Empate';
      this.history.push('FIM DE JOGO: Empate');
    }
  }

  reset() {
    this.cells = Array(9).fill('');
    this.winner = null;
    this.turn = 'X';
    this.history = [];
  }
}