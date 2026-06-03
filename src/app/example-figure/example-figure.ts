import { NgOptimizedImage } from '@angular/common'
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Example } from '../types';
@Component({
  selector: 'mec-example-figure',
  imports: [NgOptimizedImage],
  templateUrl: './example-figure.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './example-figure.css',
})
export class ExampleFigure {
  readonly EX = input.required<Example>()
}
