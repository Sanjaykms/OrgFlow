export interface User {
  id: string;
  name: string;
  avatar: string;
  department: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  createdAt: string;
  department: string;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  votes: number;
  createdAt: string;
  isAccepted?: boolean;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    department: "Engineering",
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    department: "Marketing",
  },
  {
    id: "4",
    name: "David Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    department: "Project",
  },
];

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "How to configure VPN for remote access?",
    content: "We are expanding remote work policy. I need to set up a reliable VPN solutions. What practices and configurations do you recommend? We use an organization of ~500 people with Windows, macOS, and Linux machines.",
    author: mockUsers[0],
    votes: 15,
    answers: 3,
    views: 234,
    tags: ["vpn", "security", "remote-work"],
    createdAt: "2023-11-20",
    department: "Engineering",
  },
  {
    id: "2",
    title: "How to configure VPN for remote",
    content: "Looking for best practices on VPN configuration for our remote team.",
    author: mockUsers[1],
    votes: 8,
    answers: 1,
    views: 156,
    tags: ["vpn", "networking"],
    createdAt: "2012-21",
    department: "Engineering",
  },
  {
    id: "3",
    title: "Best practices for VPN and unit tests?",
    content: "I need help with testing VPN connections in our CI/CD pipeline. What are the recommended approaches?",
    author: mockUsers[2],
    votes: 12,
    answers: 2,
    views: 189,
    tags: ["vpn", "testing"],
    createdAt: "2012-23",
    department: "Engineering",
  },
  {
    id: "4",
    title: "Best practices for writing unit tests?",
    content: "What are the industry standards for writing comprehensive unit tests?",
    author: mockUsers[3],
    votes: 6,
    answers: 1,
    views: 143,
    tags: ["testing", "best-practices"],
    createdAt: "2012-21",
    department: "Engineering",
  },
  {
    id: "5",
    title: "Deadline for Q3 budget proposals?",
    content: "When is the final deadline for submitting Q3 budget proposals to finance?",
    author: mockUsers[0],
    votes: 0,
    answers: 1,
    views: 78,
    tags: ["budget", "finance"],
    createdAt: "2024-15",
    department: "Marketing",
  },
];

export const mockAnswers: Record<string, Answer[]> = {
  "1": [
    {
      id: "a1",
      content: "For VPN configuration, I recommend using WireGuard as it offers excellent performance and security. Here are the key steps: 1) Set up a dedicated VPN server, 2) Configure firewall rules, 3) Implement two-factor authentication, 4) Use split tunneling for better performance.",
      author: mockUsers[1],
      votes: 8,
      createdAt: "2012-21",
    },
    {
      id: "a2",
      content: "I have been using OpenVPN for years and it works great. Make sure to use strong encryption and regularly update your VPN software. Also consider implementing logging and monitoring.",
      author: mockUsers[2],
      votes: 5,
      createdAt: "2012-21",
    },
    {
      id: "a3",
      content: "Recommended VPN Protocols: IPSec/IKEv2, OpenVPN, WireGuard. For your organization size, I suggest implementing a managed VPN solution with VPN clustering for redundancy and load balancing.",
      author: mockUsers[3],
      votes: 1,
      createdAt: "1012-21",
    },
  ],
};
