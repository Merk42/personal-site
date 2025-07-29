import { NgOptimizedImage } from '@angular/common'
import { Component, input } from '@angular/core';
import { Example } from '../types';
@Component({
  selector: 'app-example-figure',
  imports: [NgOptimizedImage],
  templateUrl: './example-figure.html',
  styleUrl: './example-figure.css',
})
export class ExampleFigure {
  readonly EX = input.required<Example>()
}
