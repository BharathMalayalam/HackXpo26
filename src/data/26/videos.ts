import { VideoItem } from '../../types';

export const videosData: VideoItem[] = [
  {
    id: 'vid-highlight-reel',
    title: 'HackXpo ’26 Official Aftermovie & Event Highlights',
    category: 'Event Highlights',
    duration: '04:15',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Clean embed placeholder
    speakerOrTeam: 'GCE Erode IT Media Cell',
    description: 'Relive the high-octane 36 hours of HackXpo ’26 — featuring keynote speeches, rapid prototyping, midnight coding blitz, and the final podium awards.'
  },
  {
    id: 'vid-agrovision-demo',
    title: 'AgroVision AI: Field Diagnosis & Soil Telemetry Walkthrough',
    category: 'Project Walkthroughs',
    duration: '06:40',
    thumbnail: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakerOrTeam: 'Team Phytocure (3rd Year)',
    description: 'Technical breakdown by lead Karthik Raja demonstrating quantized edge TFLite inference in real crop fields with zero internet connectivity.'
  },
  {
    id: 'vid-neurogrid-demo',
    title: 'NeuroGrid: Hardware Prototype & DRL Dispatch in Action',
    category: 'Project Walkthroughs',
    duration: '05:12',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakerOrTeam: 'Team WattVolt (3rd Year)',
    description: 'Live bench demonstration showing physical contactor relays switching load seamlessly between battery bank and grid simulation.'
  },
  {
    id: 'vid-voicebridge-demo',
    title: 'VoiceBridge: Real-Time Indian Sign Language Translation',
    category: 'Project Walkthroughs',
    duration: '03:48',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakerOrTeam: 'Team InclusiTech (2nd Year)',
    description: 'Student builders demonstrate continuous camera sign landmark tracking synthesizing clear Tamil sentences in under 200 milliseconds.'
  },
  {
    id: 'vid-student-voices',
    title: 'Voices of Builders: 2nd Year Juniors on Competing with Seniors',
    category: 'Student Interviews',
    duration: '07:22',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakerOrTeam: 'Preethi G & Aakash R',
    description: 'Junior participants share their experience navigating git conflicts, production Docker deployments, and learning from department mentors.'
  },
  {
    id: 'vid-hod-keynote',
    title: 'Keynote Address: Shaping Future Engineers for Industry 5.0',
    category: 'Keynotes',
    duration: '12:05',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakerOrTeam: 'Dr. M. Senthil Murugan (HOD, IT)',
    description: 'Inaugural address delineating the vision of the Department of IT in fostering an open-source, product-first mindset among students.'
  }
];
