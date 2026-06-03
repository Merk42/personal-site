import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mec-icon',
  imports: [],
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './icon.css'
})
export class Icon {
  readonly name = input.required()
}
