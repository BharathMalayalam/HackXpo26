import { Project } from '../types';

export const projectsData: Project[] = [
  // 3rd Year Projects
  {
    id: 'proj-agrovision-ai',
    title: 'AgroVision AI: Smart Crop Disease & Yield Predictor',
    tagline: 'Edge AI-driven multi-spectral crop diagnostic system with vernacular voice assistant.',
    teamName: 'Team Phytocure',
    year: '3rd Year',
    category: 'AI & Sustainable AgriTech',
    description: 'AgroVision AI leverages fine-tuned Vision Transformers and edge TPU processors to detect crop foliage diseases in real time. Designed specifically for agricultural clusters in western Tamil Nadu, it provides voice-guided remedial actions in Tamil and English without requiring constant cellular connectivity.',
    problemStatement: 'Smallholder farmers in the Cauvery basin suffer up to 35% crop loss each season due to delayed diagnosis of leaf blast, stem borer, and viral mosaic infections. Existing agricultural apps require high-speed internet and complex technical inputs.',
    solutionArchitecture: 'A hybrid edge-cloud pipeline featuring a quantized MobileNetV4 inference model running on an on-device WebAssembly/TFLite runtime. High-resolution anomaly telemetry synchronizes asynchronously with a backend cloud cluster running FastAPI and PostgreSQL for macro-epidemic mapping.',
    keyFeatures: [
      'Sub-50ms offline disease detection from camera feed',
      'Dual-language voice advisory interface (Tamil & English)',
      'Automated soil NPK recommendation algorithm',
      'Historical infection risk heatmap for agricultural wards'
    ],
    techStack: ['PyTorch', 'FastAPI', 'React', 'Tailwind CSS', 'TensorFlow Lite', 'PostgreSQL', 'Web Speech API'],
    projectPhoto: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Karthik Raja S', role: 'Team Lead & ML Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Dharshini M', role: 'Full Stack & UI Developer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Vigneshwaran P', role: 'Edge Computing & IoT Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Swetha R', role: 'Data Engineer & Model Optimization', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-2',
    studentMentorId: 'sm-1',
    githubUrl: 'https://github.com/hackxpo26-gce/agrovision-ai',
    liveDemoUrl: 'https://agrovision-demo.example.org',
    featured: true
  },
  {
    id: 'proj-neurogrid-iot',
    title: 'NeuroGrid: Autonomous Industrial Microgrid Balancing',
    tagline: 'Deep Reinforcement Learning for dynamic renewable load dispatch in textile spinning mills.',
    teamName: 'Team WattVolt',
    year: '3rd Year',
    category: 'IoT & Smart Energy',
    description: 'Industrial textile mills in Erode face unpredictable peak tariff charges and diesel generator dependency. NeuroGrid integrates ESP32 energy telemetry clamps with an adaptive PPO (Proximal Policy Optimization) agent that balances solar PV, battery energy storage systems (BESS), and grid input.',
    problemStatement: 'Spinning units experience heavy harmonic surges and erratic power drops. Manual switching leads to equipment wear and thousands of kilowatt-hours wasted monthly during peak demand hours.',
    solutionArchitecture: 'Custom Modbus RS-485 / MQTT gateways stream 3-phase power characteristics at 100Hz into an on-premises InfluxDB cluster. The reinforcement learning dispatch agent predicts tariff windows 1 hour in advance and orchestrates contactors with zero human intervention.',
    keyFeatures: [
      'Real-time power quality and harmonic analysis',
      'Dynamic BESS peak shaving via reinforcement learning',
      'Tamper-evident MQTT broker with TLS 1.3 encryption',
      'Predictive generator startup countdown with SMS alerts'
    ],
    techStack: ['Python', 'PyTorch RL', 'MQTT', 'InfluxDB', 'React', 'Grafana SDK', 'Docker', 'C++ ESP-IDF'],
    projectPhoto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Arun Kumar T', role: 'Lead Embedded Systems', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Sneha Priyadharshini B', role: 'RL Agent & Simulation', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Naveen Prasath K', role: 'Industrial Dashboard Engineer', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-1',
    studentMentorId: 'sm-2',
    githubUrl: 'https://github.com/hackxpo26-gce/neurogrid-iot',
    featured: true
  },
  {
    id: 'proj-medsync-ehr',
    title: 'MedSync 360: Zero-Knowledge Decentralized Health Vault',
    tagline: 'Privacy-first electronic health record sharing protocol backed by zk-SNARKs and decentralized IPFS storage.',
    teamName: 'Team CipherHealth',
    year: '3rd Year',
    category: 'Web3 & Cybersecurity',
    description: 'MedSync 360 gives patients sovereign control over their sensitive diagnostic reports, prescriptions, and lab panels. Utilizing cryptographic zero-knowledge proofs, patients can prove eligibility or condition criteria to medical insurers and referral physicians without disclosing raw medical records.',
    problemStatement: 'Centralized hospital databases remain prime targets for ransomware attacks, while patients struggle with fragmented physical records across rural primary health centres and tertiary hospitals.',
    solutionArchitecture: 'Medical documents are encrypted client-side using ChaCha20-Poly1305 and committed to a permissioned IPFS network. Access granting generates ephemeral cryptographic capability tokens verified via smart contracts on an Ethereum layer-2 rollup.',
    keyFeatures: [
      'Self-sovereign patient identity via DID standards',
      'Zero-knowledge proof verification for insurance clearance',
      'Emergency QR access protocol with biometric consent',
      'FHIR compliant schema export for hospital integrations'
    ],
    techStack: ['Solidity', 'Circom (zk-SNARKs)', 'Next.js', 'Ethers.js', 'IPFS', 'TypeScript', 'Tailwind CSS'],
    projectPhoto: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Pradeep Chandran V', role: 'Smart Contract & Cryptography', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Janani K', role: 'Security & Protocol Testing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Abishek S', role: 'Frontend Architecture & Web3 UI', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-3',
    studentMentorId: 'sm-3',
    githubUrl: 'https://github.com/hackxpo26-gce/medsync-ehr',
    liveDemoUrl: 'https://medsync-ehr.example.org',
    featured: true
  },
  {
    id: 'proj-trafficflow-ai',
    title: 'AdaptiveFlow: Dynamic AI Signal & Emergency Corridor System',
    tagline: 'Computer vision-driven junction synchronization with automated blue-light siren preemption.',
    teamName: 'Team UrbanPulse',
    year: '3rd Year',
    category: 'Computer Vision & Smart Cities',
    description: 'A multi-camera vehicle queue density estimation system that converts fixed-timer traffic lights into an adaptive, self-tuning network. Built-in sound classification and optical tracking detect approaching ambulances up to 300 meters away, clearing a seamless green wave corridor.',
    problemStatement: 'Urban bottlenecks in arterial city intersections delay emergency medical transit by up to 14 minutes, directly endangering critical trauma patients.',
    solutionArchitecture: 'YOLOv11-Nano models deployed on edge Jetson Orin Nano units count vehicles by class across four junction legs. A central coordinator running over low-latency MQTT computes optimal green duration using modified Webster queuing logic.',
    keyFeatures: [
      'Edge camera vehicle volume detection (cars, buses, bikes, autos)',
      'Acoustic siren frequency trigger with 98.4% precision',
      'Dynamic green wave cascading across adjacent intersections',
      'Traffic police override console with real-time RTSP streams'
    ],
    techStack: ['YOLOv11', 'OpenCV', 'FastAPI', 'WebSockets', 'React', 'Tailwind CSS', 'Docker'],
    projectPhoto: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Sanjay Kumar S', role: 'CV Lead & Algorithm Design', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Bhavani R', role: 'IoT & Firmware Integration', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Hariharan N', role: 'Frontend & Map Visualization', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-4',
    studentMentorId: 'sm-4',
    githubUrl: 'https://github.com/hackxpo26-gce/adaptive-flow',
    featured: false
  },

  // 2nd Year Projects
  {
    id: 'proj-campus-nexus',
    title: 'CampusNexus: Smart Resource Booking & Peer Tutoring Hub',
    tagline: 'Automated campus laboratory scheduling, project asset tracker, and peer knowledge exchange platform.',
    teamName: 'Team CodeCraft',
    year: '2nd Year',
    category: 'Full-Stack Web & Campus Tech',
    description: 'CampusNexus digitizes student access to college hardware labs, robotics stations, and research servers while introducing a community-driven peer tutoring marketplace rewarded with campus micro-credits.',
    problemStatement: 'Laboratory reservation in collegiate institutions relies on manual ledger registers, resulting in double-booking of oscilloscopes and computing clusters, while juniors struggle to find senior mentorship.',
    solutionArchitecture: 'A modern Next.js single-page portal coupled with Node.js and Supabase. Role-based access ensures faculty approvals, automated email tokens, and real-time laboratory slot occupancy displays.',
    keyFeatures: [
      'Interactive visual slot reservation for department labs',
      'QR code check-in & check-out for hardware development boards',
      'Peer tutor rating system and subject-wise doubt clearing channels',
      'Instant push notifications for upcoming booked lab hours'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM'],
    projectPhoto: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Manoj Kumar V', role: 'Frontend & UI Specialist', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Preethi G', role: 'Backend API & Schema Architect', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Dhanush R', role: 'Database & Auth Integration', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-5',
    studentMentorId: 'sm-5',
    githubUrl: 'https://github.com/hackxpo26-gce/campus-nexus',
    liveDemoUrl: 'https://campus-nexus.example.org',
    featured: true
  },
  {
    id: 'proj-ecobite-tracker',
    title: 'EcoBite: AI Hostel Food Waste Management & Redistribution',
    tagline: 'Computer vision food tray scanner connected with local community food redistribution networks.',
    teamName: 'Team GreenFork',
    year: '2nd Year',
    category: 'Social Impact & AI',
    description: 'EcoBite tracks and quantifies meal leftover patterns across student dining halls. By combining weighing sensor scales and image segmentation, it predicts accurate ingredient procurement quantities for hostel mess contractors while redirecting safe surplus food to local community centres.',
    problemStatement: 'College mess kitchens discard dozens of kilograms of unconsumed cooked meals daily due to inaccurate attendance forecasting and lack of instant redistribution logistics.',
    solutionArchitecture: 'Load cells connected to an ESP32 report dish returns, while an overhead camera runs a lightweight food segmentation model to classify untouched vs discarded food. A dispatch dispatch engine coordinates with registered NGOs via WhatsApp Business API.',
    keyFeatures: [
      'Automated leftover meal weight and volume analysis',
      'Daily attendance and food requirement forecasting',
      'Automated NGO pickup alerts with temperature safety timers',
      'Mess committee cost-savings analytics dashboard'
    ],
    techStack: ['Python', 'Flask', 'React', 'Tailwind CSS', 'OpenCV', 'SQLite', 'Chart.js'],
    projectPhoto: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Aakash R', role: 'Full Stack & IoT Integrator', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Pavithra S', role: 'ML Model & Data Wrangling', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Kishore B', role: 'UI/UX & Mobile Interface', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-6',
    studentMentorId: 'sm-6',
    githubUrl: 'https://github.com/hackxpo26-gce/ecobite-tracker',
    featured: false
  },
  {
    id: 'proj-cyberguard-sentinel',
    title: 'CyberSentinel: Zero-Config Local Network Vulnerability Audit',
    tagline: 'Lightweight autonomous vulnerability scanner tailored for educational laboratory subnets.',
    teamName: 'Team ByteShield',
    year: '2nd Year',
    category: 'Cybersecurity & Networks',
    description: 'CyberSentinel provides continuous discovery of unpatched firmware, open default credentials, and rogue WiFi AP beacons within campus computer laboratory networks, summarizing security posture into an interactive defensive matrix.',
    problemStatement: 'Educational labs frequently run heterogeneous hardware and legacy operating systems vulnerable to lateral propagation of malware without dedicated enterprise SOC teams.',
    solutionArchitecture: 'A containerized daemon using Scapy and custom Nmap NSE scripts scans subnets at configurable maintenance intervals, correlating discovered banner hashes against CVE databases and outputting MITRE ATT&CK aligned defensive recommendations.',
    keyFeatures: [
      'Automatic IP address subnet discovery and port fingerprinting',
      'CVE correlation engine with severity scoring (CVSS v3.1)',
      'One-click remediation cheat sheet generator for lab technicians',
      'Instant Slack & Webhook alerts for unauthorized rogue devices'
    ],
    techStack: ['Python', 'Scapy', 'React', 'Tailwind CSS', 'FastAPI', 'Docker', 'SQLite'],
    projectPhoto: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Siddharth M', role: 'Security Analyst & Scripting', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Nandhini P', role: 'Frontend & Report Visuals', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Vijay Anand K', role: 'Network Protocols & Backend', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-2',
    studentMentorId: 'sm-7',
    githubUrl: 'https://github.com/hackxpo26-gce/cybersentinel',
    featured: false
  },
  {
    id: 'proj-voice-bridge',
    title: 'VoiceBridge: Sign Language & Vernacular Gestural Transcriber',
    tagline: 'Real-time camera gestural translation into synthesized speech for inclusive education.',
    teamName: 'Team InclusiTech',
    year: '2nd Year',
    category: 'Accessibility & Computer Vision',
    description: 'VoiceBridge enables speech- and hearing-impaired students to participate in classroom discussions by translating Indian Sign Language (ISL) gestures into real-time spoken Tamil and English voice streams via browser-based MediaPipe hand landmark tracking.',
    problemStatement: 'Differently-abled students face immense communication friction in live engineering lectures, where sign language interpreters are rarely present during ad-hoc group work and technical labs.',
    solutionArchitecture: 'MediaPipe 21-point hand tracking runs purely in the client browser. An LSTM temporal sequence model classifies gesture sequences, emitting phonetic tokens to the Web Speech synthesis engine with minimal latency.',
    keyFeatures: [
      'In-browser 30fps hand landmark tracking with no plugin required',
      'Dual-language sign-to-speech output in Tamil and English',
      'Custom phrase recorder allowing students to register personalized gestures',
      'Low compute overhead suitable for budget student laptops'
    ],
    techStack: ['MediaPipe', 'TensorFlow.js', 'React', 'Tailwind CSS', 'Web Speech API', 'Vite'],
    projectPhoto: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop',
    teamPhoto: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
    members: [
      { name: 'Kavya Shree T', role: 'Vision Pipeline & Model Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Rohit Balaji S', role: 'Speech Synthesis & UI Design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' },
      { name: 'Deepika M', role: 'Dataset Curation & User Testing', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', github: 'https://github.com', linkedin: 'https://linkedin.com' }
    ],
    facultyMentorId: 'mentor-3',
    studentMentorId: 'sm-8',
    githubUrl: 'https://github.com/hackxpo26-gce/voicebridge',
    liveDemoUrl: 'https://voicebridge.example.org',
    featured: true
  }
];
