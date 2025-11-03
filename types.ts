import { ReactNode } from 'react';

export enum Screen {
  Home = 'HOME',
  Category = 'CATEGORY',
  Grid = 'GRID',
  Detail = 'DETAIL',
}

export interface CardItem {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface CardCategory {
  name: 'Regions' | 'Themes' | 'Mood';
  items: CardItem[];
}

export type RouletteItem = {
  item: CardItem;
  category: CardCategory;
};

export interface SessionLog {
  timestamp: Date;
  event: 'session_start' | 'category_selected' | 'item_view_start' | 'item_view_end' | 'surprise_me_selected';
  detail?: string;
  duration?: number; // in seconds
}

export interface AppContextType {
    isAdminMode: boolean;
    currentItem: CardItem | null;
    currentCategory: CardCategory | null;
}