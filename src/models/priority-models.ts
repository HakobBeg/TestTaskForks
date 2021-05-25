export class ForksState{
  forks: Fork[];
  forksCount: number;
  saveMethodId: number;
}

export interface Fork{
  fullName: string;
  stars: string;
  owner: string;
  url: string;
}



