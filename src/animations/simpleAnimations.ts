import {trigger, state, transition, style, animate} from '@angular/animations';


export const showAnimation = trigger('showTrigger', [
  state('show', style({opacity: 1})),

  transition('void <=> show', animate(500)),
]);

