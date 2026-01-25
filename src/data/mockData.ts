// --------------------------------------------------
// INTERFACES
// --------------------------------------------------
export interface User {
  id: string;
  name: string;
  avatar: string;
  department: string;
  email: string;
  password: string;  // NOTE: only for mock data
  role: "admin" | "moderator" | "user";
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

  replies?: {
    id: string;
    content: string;
    author: User;
    createdAt: string;
  }[];
}

// --------------------------------------------------
// USERS
// --------------------------------------------------
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    department: "Engineering",
    email: "sarah.johnson@ltts.com",
    password: "sarah123",
    role: "user",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    department: "Engineering",
    email: "michael.chen@company.com",
    password: "michael123",
    role: "moderator",
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    department: "Marketing",
    email: "emma.williams@company.com",
    password: "emma123",
    role: "user",
  },
  {
    id: "4",
    name: "David Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    department: "Project",
    email: "david.kumar@company.com",
    password: "david123",
    role: "moderator",
  },
  {
    id: "5",
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    department: "HR",
    email: "priya.sharma@company.com",
    password: "priya123",
    role: "user",
  },
  {
    id: "6",
    name: "Rohan Mehta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    department: "Engineering",
    email: "rohan.mehta@company.com",
    password: "rohan123",
    role: "user",
  },
  {
    id: "7",
    name: "Lakshmi Nair",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi",
    department: "Engineering",
    email: "lakshmi.nair@company.com",
    password: "lakshmi123",
    role: "user",
  },
];


// --------------------------------------------------
// QUESTIONS
// --------------------------------------------------
export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "How to configure VPN for remote access?",
    content:
      "We are expanding remote work policy. I need to set up a reliable VPN solution. What practices and configurations do you recommend?",
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
    content:
      "Looking for best practices on VPN configuration for our remote team.",
    author: mockUsers[1],
    votes: 8,
    answers: 1,
    views: 156,
    tags: ["vpn", "networking"],
    createdAt: "2012-02-21",
    department: "Engineering",
  },

  {
    id: "3",
    title: "Best practices for VPN and unit tests?",
    content:
      "I need help with testing VPN connections in our CI/CD pipeline. What are the recommended approaches?",
    author: mockUsers[2],
    votes: 12,
    answers: 2,
    views: 189,
    tags: ["vpn", "testing"],
    createdAt: "2012-02-23",
    department: "Engineering",
  },

  {
    id: "4",
    title: "Best practices for writing unit tests?",
    content:
      "What are the industry standards for writing comprehensive unit tests?",
    author: mockUsers[3],
    votes: 6,
    answers: 1,
    views: 143,
    tags: ["testing", "best-practices"],
    createdAt: "2012-02-21",
    department: "Engineering",
  },

  {
    id: "5",
    title: "Deadline for Q3 budget proposals?",
    content:
      "When is the final deadline for submitting Q3 budget proposals to finance?",
    author: mockUsers[0],
    votes: 0,
    answers: 1,
    views: 78,
    tags: ["budget", "finance"],
    createdAt: "2024-01-15",
    department: "Marketing",
  },

  // New Questions
  {
    id: "6",
    title: "How to improve build speed in React projects?",
    content:
      "Our React project builds are becoming slower as the codebase grows. What optimizations can improve build and reload time?",
    author: mockUsers[5],
    votes: 11,
    answers: 2,
    views: 201,
    tags: ["react", "performance", "build-tools"],
    createdAt: "2024-02-02",
    department: "Engineering",
  },
  {
    id: "7",
    title: "What is the leave policy for new joiners?",
    content:
      "I recently joined the company and want to understand how many leaves new employees get.",
    author: mockUsers[4],
    votes: 3,
    answers: 1,
    views: 67,
    tags: ["hr", "policy"],
    createdAt: "2024-02-10",
    department: "HR",
  },
  {
    id: "8",
    title: "How to fix Jenkins pipeline random failures?",
    content:
      "Our Jenkins CI pipeline occasionally fails without any logs. How can we debug or fix stability?",
    author: mockUsers[1],
    votes: 9,
    answers: 2,
    views: 175,
    tags: ["jenkins", "ci-cd", "devops"],
    createdAt: "2024-01-28",
    department: "Engineering",
  },
  {
    id: "9",
    title: "How to optimize SQL queries in PostgreSQL?",
    content:
      "Some dashboards load slowly due to heavy SQL queries. What are best practices?",
    author: mockUsers[2],
    votes: 6,
    answers: 1,
    views: 112,
    tags: ["sql", "postgresql", "optimization"],
    createdAt: "2024-02-14",
    department: "Marketing",
  },
  {
    id: "10",
    title: "Best practices for writing documentation?",
    content:
      "Our team struggles to maintain good documentation. Any proven standards?",
    author: mockUsers[0],
    votes: 4,
    answers: 1,
    views: 98,
    tags: ["documentation", "best-practices"],
    createdAt: "2024-02-16",
    department: "Engineering",
  },
];

// --------------------------------------------------
// ANSWERS + REPLIES
// --------------------------------------------------
export const mockAnswers: Record<string, Answer[]> = {
  // Existing question 1
  "1": [
    {
      id: "a1",
      content:
        "WireGuard offers excellent performance and security. Steps: 1) Setup server, 2) Configure firewall, 3) Enable MFA, 4) Use split tunneling.",
      author: mockUsers[1],
      votes: 8,
      createdAt: "2012-02-21",
      replies: [
        {
          id: "r1",
          content: "Agree, WireGuard is far better than OpenVPN in speed.",
          author: mockUsers[0],
          createdAt: "2012-02-22",
        },
      ],
    },
    {
      id: "a2",
      content:
        "I recommend OpenVPN with strong encryption and regular updates. Implement logging and monitoring as well.",
      author: mockUsers[2],
      votes: 5,
      createdAt: "2012-02-21",
      replies: [
        {
          id: "r2",
          content: "OpenVPN is reliable but slower compared to WireGuard.",
          author: mockUsers[3],
          createdAt: "2012-02-22",
        },
      ],
    },
    {
      id: "a3",
      content:
        "For a 500-user org, a managed VPN with redundancy is best. Use clustering.",
      author: mockUsers[3],
      votes: 1,
      createdAt: "2012-02-21",
      replies: [
        {
          id: "r3",
          content: "Managed VPN works great for scaling.",
          author: mockUsers[1],
          createdAt: "2012-02-23",
        },
      ],
    },
  ],

  // Question 2
  "2": [
    {
      id: "a2-1",
      content: "Use IKEv2 if you need stable mobile performance. Works well.",
      author: mockUsers[6],
      votes: 4,
      createdAt: "2012-02-22",
      replies: [
        {
          id: "r4",
          content: "Yes, IKEv2 reconnects faster than OpenVPN.",
          author: mockUsers[1],
          createdAt: "2012-02-23",
        },
      ],
    },
  ],

  // Question 3
  "3": [
    {
      id: "a3-1",
      content:
        "Mock VPN servers in CI using Docker containers. Works well for tests.",
      author: mockUsers[2],
      votes: 6,
      createdAt: "2012-02-24",
      replies: [
        {
          id: "r5",
          content: "We also use this approach. Stable and reproducible.",
          author: mockUsers[0],
          createdAt: "2012-02-25",
        },
      ],
    },
    {
      id: "a3-2",
      content: "Use a dedicated staging VPN instead of mocking.",
      author: mockUsers[4],
      votes: 3,
      createdAt: "2012-02-24",
      replies: [
        {
          id: "r6",
          content: "This helps test real scenarios.",
          author: mockUsers[3],
          createdAt: "2012-02-25",
        },
      ],
    },
  ],

  // Question 4
  "4": [
    {
      id: "a4-1",
      content:
        "Use AAA: Arrange-Act-Assert. It keeps tests clean and readable.",
      author: mockUsers[0],
      votes: 4,
      createdAt: "2012-02-22",
      replies: [
        {
          id: "r7",
          content: "AAA helped our team write cleaner tests.",
          author: mockUsers[6],
          createdAt: "2012-02-23",
        },
      ],
    },
  ],

  // Question 5
  "5": [
    {
      id: "a5-1",
      content:
        "The deadline is 25th of every quarter. Finance strictly enforces it.",
      author: mockUsers[3],
      votes: 2,
      createdAt: "2024-01-16",
      replies: [
        {
          id: "r8",
          content: "Thanks! Helpful.",
          author: mockUsers[0],
          createdAt: "2024-01-16",
        },
      ],
    },
  ],

  // NEW ANSWERS
  "6": [
    {
      id: "a6-1",
      content:
        "Switch to Vite and enable SWC. This alone reduces build times drastically.",
      author: mockUsers[1],
      votes: 7,
      createdAt: "2024-02-03",
      replies: [
        {
          id: "r9",
          content: "Vite improved our build time by 80%.",
          author: mockUsers[5],
          createdAt: "2024-02-04",
        },
      ],
    },
    {
      id: "a6-2",
      content:
        "Avoid deep barrel imports. They slow down bundlers significantly.",
      author: mockUsers[0],
      votes: 3,
      createdAt: "2024-02-04",
      replies: [
        {
          id: "r10",
          content: "True. Barrel files seem convenient but costly.",
          author: mockUsers[6],
          createdAt: "2024-02-04",
        },
      ],
    },
  ],

  "7": [
    {
      id: "a7-1",
      content:
        "New joiners get 24 leaves per year: 12 CL + 12 EL. Credited monthly.",
      author: mockUsers[4],
      votes: 2,
      createdAt: "2024-02-11",
      replies: [
        {
          id: "r11",
          content: "Good to know, thanks!",
          author: mockUsers[2],
          createdAt: "2024-02-11",
        },
      ],
    },
  ],

  "8": [
    {
      id: "a8-1",
      content:
        "Enable verbose logging and pin the pipeline to a stable agent.",
      author: mockUsers[3],
      votes: 5,
      createdAt: "2024-01-29",
      replies: [
        {
          id: "r12",
          content: "Pinning solved our flaky builds.",
          author: mockUsers[1],
          createdAt: "2024-01-29",
        },
      ],
    },
    {
      id: "a8-2",
      content: "Use retry logic inside Declarative Pipeline.",
      author: mockUsers[6],
      votes: 4,
      createdAt: "2024-01-30",
      replies: [
        {
          id: "r13",
          content: "Retries help with unstable tests.",
          author: mockUsers[0],
          createdAt: "2024-01-30",
        },
      ],
    },
  ],

  "9": [
    {
      id: "a9-1",
      content:
        "Use EXPLAIN ANALYZE and index frequently filtered columns.",
      author: mockUsers[5],
      votes: 5,
      createdAt: "2024-02-15",
      replies: [
        {
          id: "r14",
          content: "EXPLAIN ANALYZE saved us many hours.",
          author: mockUsers[3],
          createdAt: "2024-02-15",
        },
      ],
    },
  ],

  "10": [
    {
      id: "a10-1",
      content:
        "Follow Diátaxis Framework: Tutorials, Guides, Explanation, Reference.",
      author: mockUsers[1],
      votes: 6,
      createdAt: "2024-02-17",
      replies: [
        {
          id: "r15",
          content: "We adopted it last year — huge improvement.",
          author: mockUsers[5],
          createdAt: "2024-02-17",
        },
      ],
    },
  ],
};
