import { YearKey } from '../config/years';

import { projectsData as projects25 } from './25/projects';
import { winnersData as winners25 } from './25/winners';
import { videosData as videos25 } from './25/videos';
import { galleryData as gallery25 } from './25/gallery';
import { coordinatorsData as coordinators25 } from './25/coordinators';
import { mentorsData as mentors25, studentMentorsData as studentMentors25 } from './25/mentors';
import { judgesData as judges25 } from './25/judges';
import { statsData as stats25, quickEventHighlights as highlights25 } from './25/stats';

import { projectsData as projects26 } from './26/projects';
import { winnersData as winners26 } from './26/winners';
import { videosData as videos26 } from './26/videos';
import { galleryData as gallery26 } from './26/gallery';
import { coordinatorsData as coordinators26 } from './26/coordinators';
import { mentorsData as mentors26, studentMentorsData as studentMentors26 } from './26/mentors';
import { judgesData as judges26 } from './26/judges';
import { statsData as stats26, quickEventHighlights as highlights26 } from './26/stats';

const yearDataMap = {
  '25': {
    projects: projects25,
    winners: winners25,
    videos: videos25,
    gallery: gallery25,
    coordinators: coordinators25,
    mentors: mentors25,
    studentMentors: studentMentors25,
    judges: judges25,
    stats: stats25,
    highlights: highlights25,
  },
  '26': {
    projects: projects26,
    winners: winners26,
    videos: videos26,
    gallery: gallery26,
    coordinators: coordinators26,
    mentors: mentors26,
    studentMentors: studentMentors26,
    judges: judges26,
    stats: stats26,
    highlights: highlights26,
  },
} as const;

export function getYearData(year: YearKey) {
  return yearDataMap[year];
}
