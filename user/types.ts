export interface Recipe {
  name: string;
  description: string;
  image: string;
  category: string;
  lessonDuration: string;
  lessonCount: string;
}

export interface Achievement {
  name: string;
  description: string;
  image: string | null;
  date: Date;
  tags: string;
}

export interface User {
  profile: {userName: string; photo: string; email: string};
  flows: any[];
  recipes: Recipe[];
  places: Achievement[];
}
