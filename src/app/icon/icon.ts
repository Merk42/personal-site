import { Component, input } from '@angular/core';

@Component({
  selector: 'mec-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css'
})
export class Icon {
  readonly name = input.required()
}
