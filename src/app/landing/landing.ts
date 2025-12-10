import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { ENGPick } from '../engpick/engpick';
import { MatButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [ENGPick,RouterModule,MatButton,MatTooltipModule, MatIcon,RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

constructor(private route: ActivatedRoute,private router:Router) { }



    NewRequestRoute(){
      this.router.navigate(['/NewRequest']);
    }
  }

