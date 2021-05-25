import {TextAnimation} from 'ngx-teximate';
import {bounceIn} from 'ng-animate';

export const API_CONFIG_CONSTANTS = {
  endpoint: 'https://api.github.com/repos',
};


export const ANIMATION_CONSTANTS = {
  animation: bounceIn,
  delay: 50,
  type: 'letter'
};

export const TEXT_CONSTANTS = {
  topAnimationText: 'Type name of creator and repo name in format shown below!',
  bottomAnimationText: ':owner/:repositoryName',
  showAnimationStates: {
    0: 'show',
    1: 'hide'
  }
};


export const RESULT_TABLE_CONSTANTS = {
  columnNames: ['FullName', 'Owner', 'Stars', 'Repo Link']
};

