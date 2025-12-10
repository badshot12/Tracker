import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Landing } from './landing/landing';
import { ENGPick } from './engpick/engpick';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Landing,ENGPick, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  TitleT = "Tracker";
  
}
