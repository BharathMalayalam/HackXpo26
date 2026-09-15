export type AcademicYear = '2nd Year' | '3rd Year';

export interface ProjectMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  teamName: string;
  year: AcademicYear;
  category: string;
  description: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyFeatures: string[];
  techStack: string[];
  projectPhoto: string;
  teamPhoto: string;
  members: ProjectMember[];
  facultyMentorId: string;
  studentMentorId: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  designation: string;
  organization: string;
  domain: string;
  bio: string;
  photo: string;
  linkedin: string;
  type: 'Faculty' | 'Industry';
}

export interface StudentMentor {
  id: string;
  name: string;
  designation: string;
  avatar: string;
  teamName: string;
  projectName: string;
  linkedin: string;
}

export type GalleryCategory = 'EVENTS' | 'PROJECTS' | 'WORKSHOPS' | 'STUDENTS' | 'MEMORIES';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: GalleryCategory;
  isNew?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Event Highlights' | 'Project Walkthroughs' | 'Student Interviews' | 'Keynotes';
  duration: string;
  thumbnail: string;
  videoUrl: string;
  speakerOrTeam: string;
  description: string;
}

export interface Winner {
  rank: 1 | 2 | 3 | 'Special Mention';
  awardTitle: string;
  prizePool: string;
  teamName: string;
  projectName: string;
  projectId: string;
  year: AcademicYear;
  category: string;
  members: string[];
  thumbnail: string;
  githubUrl: string;
  demoUrl: string;
  citation: string;
}

export interface Coordinator {
  id: string;
  name: string;
  role: string;
  category: 'Faculty Coordinator' | 'Student Committee';
  department: string;
  year?: AcademicYear;
  photo: string;
  contactEmail?: string;
  linkedin?: string;
  github?: string;
}

export interface Judge {
  id: string;
  name: string;
  role: string;
  organization: string;
  domain: string;
  photo: string;
  contactEmail?: string;
  linkedin?: string;
  category: 'Industry' | 'Academic';
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  iconName: string;
  description: string;
}
