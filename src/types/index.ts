export type AcademicYear = '2nd Year' | '3rd Year';

export interface ProjectMember {
  name: string;
  role: string;
  avatar: string;
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
  thumbnail: string;
  bannerImage: string;
  galleryImages: string[];
  members: ProjectMember[];
  mentor: {
    name: string;
    designation: string;
    avatar: string;
  };
  githubUrl: string;
  liveDemoUrl: string;
  featured?: boolean;
}

export interface StudentProfile {
  name: string;
  role: string;
  year: AcademicYear;
  avatar: string;
  github: string;
  linkedin: string;
  email?: string;
}

export interface Team {
  id: string;
  teamName: string;
  year: AcademicYear;
  projectTitle: string;
  projectId: string;
  teamPhoto: string;
  leadName: string;
  members: StudentProfile[];
  mentorName: string;
  category: string;
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

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Opening Ceremony' | 'Team Action' | 'Mentoring' | 'Project Demos' | 'Behind-the-Scenes' | 'Prize Ceremony';
  imageUrl: string;
  caption: string;
  aspectRatio?: 'wide' | 'tall' | 'square';
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

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  iconName: string;
  description: string;
}
