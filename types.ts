import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  level: number; // 0-100
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}