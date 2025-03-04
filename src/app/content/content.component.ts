import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ResumeComponent } from '../resume/resume.component';
import { ContentService } from '../content.service';

interface ImageExample {
  source:Array<{
    srcset: string;
    type:string;
  }>
  src: string;
  width: number;
  height: number;
  alt: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [AboutComponent, ResumeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent  {
  contentService = inject(ContentService);

  sourcemap(formats:Array<string>):Array<{srcset: string;type:string;}> {
    return formats.map( format => {
      return {
        srcset: `https://www.markecurtis.com/images/${format}`,
        type: `image/${format.split('.')[1]}`
      }
    })
  }

  images = computed<ImageExample>(() => {
    if (!this.contentService.currentWork().image) {
      return {
        source:[],
        src: "",
        width:0,
        height:0,
        alt: ""
      }
    }
    return {
      source:this.sourcemap(this.contentService.currentWork().image?.formats ?? ['']),
      src: "",
      width:10,
      height:10,
      alt: "my alt"
    }
  })
}
