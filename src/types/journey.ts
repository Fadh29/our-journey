export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  badge: string;
  description: string[];
  highlight?: string;
  quote?: string;
}

export interface FutureMilestone {
  year: string;
  title: string;
  badge: string;
  description: string;
  items: string[];
}
