import type { Locale } from '@/lib/i18n'

export type LocalizedText = {
  en: string
  vi: string
}

export type LocalizedList = {
  en: string[]
  vi: string[]
}

export const profile = {
  name: 'Van Thien Tung',
  initials: 'VT',
  role: {
    en: 'Frontend Developer',
    vi: 'Frontend Developer',
  },
  objective: {
    en: 'Frontend Developer with 1+ year of experience building scalable, user-friendly web applications using React and Next.js. Focused on performance optimization, clean architecture, and practical UI/UX.',
    vi: 'Frontend Developer với hơn 1 năm kinh nghiệm xây dựng ứng dụng web có khả năng mở rộng bằng React và Next.js. Tập trung vào tối ưu hiệu năng, kiến trúc sạch và trải nghiệm người dùng thực tế.',
  },
  location: {
    en: 'Thu Duc City, Ho Chi Minh City',
    vi: 'Thủ Đức, TP. Hồ Chí Minh',
  },
  email: 'thientung57203@gmail.com',
  phone: '0816466357',
  github: 'https://github.com/tungvt2003',
  cvFile: '/CV-Van_Thien_Tung.pdf',
}

export const projects = [
  {
    id: 'fastcare',
    slug: 'fastcare-phone-laptop-repair',
    title: {
      en: 'FastCare - Phone & Laptop Repair System',
      vi: 'FastCare - Hệ thống sửa chữa điện thoại và laptop',
    },
    summary: {
      en: 'Customer-facing website and internal admin dashboard for repair services and content management.',
      vi: 'Website bán hàng cho khách và dashboard nội bộ để quản lý dịch vụ sửa chữa và nội dung.',
    },
    role: {
      en: 'Frontend Developer & DevOps (basic CI/CD, staging setup)',
      vi: 'Frontend Developer & DevOps (CI/CD cơ bản, staging)',
    },
    highlights: {
      en: [
        'Designed and implemented responsive UI from Figma.',
        'Built Blog, Service pages, and multiple Admin Dashboard modules.',
        'Integrated REST APIs and managed state with Zustand.',
        'Set up basic CI/CD pipeline and staging deployment with GitHub Actions.',
      ],
      vi: [
        'Thiết kế và triển khai giao diện responsive từ Figma.',
        'Phát triển các màn hình Blog, Service và nhiều module Admin Dashboard.',
        'Tích hợp REST API và quản lý state bằng Zustand.',
        'Thiết lập CI/CD cơ bản và deploy staging bằng GitHub Actions.',
      ],
    },
    tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'REST API', 'GitHub Actions'],
    thumbnail: '/portfolio/project-fastcare.png',
    demoUrl: '',
    repoUrl: 'https://github.com/tungvt2003',
    status: 'published',
  },
  {
    id: 'tamda-express',
    slug: 'tamda-express-logistics-management',
    title: {
      en: 'Tamda Express - Logistics Management System',
      vi: 'Tamda Express - Hệ thống quản lý vận tải',
    },
    summary: {
      en: 'Logistics platform with admin dashboard, operations system, and real-time trip/order updates.',
      vi: 'Nền tảng quản lý vận tải gồm dashboard quản trị, hệ thống vận hành và cập nhật real-time.',
    },
    role: {
      en: 'Frontend Developer',
      vi: 'Frontend Developer',
    },
    highlights: {
      en: [
        'Developed CRUD flows for drivers, vehicles, assistants, orders, and trips.',
        'Implemented trip scheduling with map-based visualization.',
        'Integrated Socket.IO for real-time trip and order updates.',
        'Built role-based forms and optimized rendering for high-volume data.',
      ],
      vi: [
        'Phát triển CRUD cho tài xế, phương tiện, phụ xe, đơn hàng và chuyến đi.',
        'Triển khai chức năng lập lịch chuyến đi kèm bản đồ trực quan.',
        'Tích hợp Socket.IO để cập nhật real-time cho chuyến đi và đơn hàng.',
        'Tối ưu form theo role và hiệu năng render cho dữ liệu lớn.',
      ],
    },
    tags: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Socket.IO', 'REST API'],
    thumbnail: '/portfolio/project-tamda.png',
    demoUrl: '',
    repoUrl: 'https://github.com/tungvt2003',
    status: 'published',
  },
  {
    id: 'skyline-edu',
    slug: 'skyline-edu-website-cms',
    title: {
      en: 'Skyline Edu - Education Website & CMS',
      vi: 'Skyline Edu - Website giáo dục và CMS',
    },
    summary: {
      en: 'Education platform with user website and CMS admin panel focused on scalable architecture.',
      vi: 'Nền tảng giáo dục gồm website người dùng và CMS admin, tập trung vào kiến trúc mở rộng.',
    },
    role: {
      en: 'Frontend Developer',
      vi: 'Frontend Developer',
    },
    highlights: {
      en: [
        'Implemented responsive UI from Figma for user website and CMS.',
        'Set up project architecture and reusable component system.',
        'Configured basic CI/CD with GitHub Actions and staging deployment.',
      ],
      vi: [
        'Triển khai giao diện responsive từ Figma cho website và CMS.',
        'Xây dựng kiến trúc dự án và hệ thống component tái sử dụng.',
        'Thiết lập CI/CD cơ bản với GitHub Actions và deploy staging.',
      ],
    },
    tags: ['Next.js', 'Tailwind CSS', 'i18n', 'shadcn/ui', 'REST API', 'GitHub Actions'],
    thumbnail: '/portfolio/project-skyline.png',
    demoUrl: '',
    repoUrl: 'https://github.com/tungvt2003',
    status: 'published',
  },
] as const

export const experiences = [
  {
    role: {
      en: 'Frontend Developer',
      vi: 'Frontend Developer',
    },
    company: 'DANSOLUTIONS Technology Co., Ltd',
    period: '08/2024 - Present',
    description: {
      en: [
        'Built modern user-facing and admin-facing products with React and Next.js.',
        'Delivered reusable component architecture and REST API integration.',
        'Contributed to basic DevOps workflows (CI/CD and staging environment).',
      ],
      vi: [
        'Phát triển sản phẩm cho người dùng và dashboard admin bằng React và Next.js.',
        'Xây dựng hệ thống component tái sử dụng và tích hợp REST API.',
        'Tham gia quy trình DevOps cơ bản (CI/CD và môi trường staging).',
      ],
    },
  },
  {
    role: {
      en: 'IT Tutor / Teaching Assistant',
      vi: 'IT Tutor / Teaching Assistant',
    },
    company: 'GREEN ACADEMY',
    period: '09/2022 - 09/2023',
    description: {
      en: [
        'Supported students in programming practice and assignment completion.',
        'Guided learners on frontend fundamentals and problem-solving workflow.',
      ],
      vi: [
        'Hỗ trợ học viên luyện tập lập trình và hoàn thành bài tập.',
        'Hướng dẫn kiến thức frontend cơ bản và quy trình giải quyết vấn đề.',
      ],
    },
  },
]

export const education = [
  {
    school: {
      en: 'Academy of Cryptography Techniques (KMA)',
      vi: 'Học viện Kỹ thuật Mật mã (KMA)',
    },
    major: {
      en: 'Information Security',
      vi: 'An toàn thông tin',
    },
    period: '09/2021 - 09/2025',
    gpa: '3.28 / 4.0',
  },
]

/** Icon key: Simple Icons (Si*) or Lucide (Lucide:IconName) */
export const skills = {
  frontend: [
    { name: 'React.js / Next.js', icon: 'SiReact' },
    { name: 'TypeScript', icon: 'SiTypescript' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
    { name: 'shadcn/ui, Ant Design', icon: 'SiAntdesign' },
    { name: 'React Hook Form, Yup', icon: 'SiReacthookform' },
  ],
  backend: [
    { name: 'REST API Integration', icon: 'Lucide:Webhook' },
    { name: 'MySQL', icon: 'SiMysql' },
    { name: 'MongoDB', icon: 'SiMongodb' },
    { name: 'Information Security Basics', icon: 'Lucide:Shield' },
    { name: 'Socket.IO', icon: 'SiSocketdotio' },
  ],
  devops: [
    { name: 'GitHub Actions', icon: 'SiGithubactions' },
    { name: 'CI/CD Fundamentals', icon: 'Lucide:GitBranch' },
    { name: 'Staging Deployment', icon: 'Lucide:Cloud' },
    { name: 'Performance Optimization', icon: 'Lucide:Zap' },
    { name: 'SEO Basics', icon: 'Lucide:Search' },
  ],
  tools: [
    { name: 'Git / GitHub', icon: 'SiGithub' },
    { name: 'Figma to Code Workflow', icon: 'SiFigma' },
    { name: 'Postman', icon: 'SiPostman' },
    { name: 'VS Code', icon: 'SiVscodium' },
    { name: 'Team Collaboration', icon: 'Lucide:Users' },
  ],
}

export function getLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en
}
