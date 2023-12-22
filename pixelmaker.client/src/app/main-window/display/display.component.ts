import { Component } from '@angular/core';
import { Block } from '../../../shared/models/block.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
  cells = [...Array(1000).keys()].map(i => i + 1);

  blocks: Block[] = [

  ];
}
