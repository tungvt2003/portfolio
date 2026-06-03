export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface Project {
  id: string
  slug?: string
  role?: {
    en: string
    vi: string
  }
  title: {
    en: string
    vi: string
  }
  summary: {
    en: string
    vi: string
  }
  problem?: {
    en: string
    vi: string
  }
  solution?: {
    en: string
    vi: string
  }
  impact?: {
    en: string
    vi: string
  }
  repoUrl: string
  demoUrl: string
  tags: string[]
  status: ProjectStatus
  order: number
  thumbnailUrl: string
  galleryUrls: string[]
  createdAt: Date
  updatedAt: Date
}

export const availableTags = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'REST API',
  'Zustand',
  'Socket.IO',
  'GitHub Actions',
  'i18n',
  'Vite',
  'Figma',
]

export const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

export const mockProjects: Project[] = [
  {
    id: '1',
    title: {
      en: 'FastCare - Phone & Laptop Repair System',
      vi: 'FastCare - Hệ thống sửa chữa điện thoại và laptop',
    },
    summary: {
      en: 'Customer-facing website and internal admin dashboard for repair services and content management.',
      vi: 'Website bán hàng cho khách và dashboard nội bộ để quản lý dịch vụ sửa chữa và nội dung.',
    },
    problem: {
      en: 'The team needed a consistent frontend system for both customer and internal operations.',
      vi: 'Đội ngũ cần một hệ thống frontend thống nhất cho cả khách hàng và vận hành nội bộ.',
    },
    solution: {
      en: 'Built responsive pages and reusable components from Figma, integrated REST APIs, and standardized UI patterns.',
      vi: 'Xây dựng giao diện responsive và component tái sử dụng từ Figma, tích hợp REST API và chuẩn hóa pattern UI.',
    },
    impact: {
      en: 'Accelerated delivery speed and improved UX consistency across website and admin dashboard.',
      vi: 'Tăng tốc độ triển khai và cải thiện độ nhất quán UX trên website và dashboard admin.',
    },
    tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'REST API', 'GitHub Actions'],
    repoUrl: 'https://github.com/tungvt2003',
    demoUrl: '',
    status: 'published',
    order: 1,
    thumbnailUrl: '/placeholder.jpg',
    galleryUrls: [],
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    title: {
      en: 'Tamda Express - Logistics Management System',
      vi: 'Tamda Express - Hệ thống quản lý vận tải',
    },
    summary: {
      en: 'Logistics platform with admin dashboard, operations module, and real-time updates via Socket.IO.',
      vi: 'Nền tảng logistics gồm dashboard admin, module vận hành và cập nhật real-time qua Socket.IO.',
    },
    problem: {
      en: 'Operations needed real-time coordination for trips, drivers, and orders.',
      vi: 'Bộ phận vận hành cần đồng bộ real-time giữa chuyến đi, tài xế và đơn hàng.',
    },
    solution: {
      en: 'Implemented core CRUD modules, trip scheduling flows, and map-based visualization with real-time sockets.',
      vi: 'Triển khai module CRUD, quy trình lập lịch chuyến đi và hiển thị bản đồ kết hợp socket real-time.',
    },
    impact: {
      en: 'Improved operational visibility and reduced manual coordination for logistics workflows.',
      vi: 'Tăng khả năng theo dõi vận hành và giảm thao tác phối hợp thủ công trong quy trình logistics.',
    },
    tags: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Socket.IO', 'REST API'],
    repoUrl: 'https://github.com/tungvt2003',
    demoUrl: '',
    status: 'published',
    order: 2,
    thumbnailUrl: '/placeholder.jpg',
    galleryUrls: [],
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2025-01-12'),
  },
  {
    id: '3',
    title: {
      en: 'Skyline Edu - Education Website & CMS',
      vi: 'Skyline Edu - Website giáo dục và CMS',
    },
    summary: {
      en: 'Education platform with user website and CMS panel, optimized for scalability and maintainability.',
      vi: 'Nền tảng giáo dục gồm website người dùng và CMS, tối ưu cho mở rộng và bảo trì.',
    },
    problem: {
      en: 'The platform required a scalable architecture for both content management and public-facing pages.',
      vi: 'Nền tảng cần kiến trúc mở rộng cho cả quản trị nội dung và giao diện người dùng.',
    },
    solution: {
      en: 'Established project architecture, reusable UI system, and CI/CD staging flow with GitHub Actions.',
      vi: 'Thiết lập kiến trúc dự án, hệ thống UI tái sử dụng và quy trình CI/CD staging bằng GitHub Actions.',
    },
    impact: {
      en: 'Reduced implementation effort for new pages and improved release confidence through deployment automation.',
      vi: 'Giảm effort khi thêm trang mới và tăng độ ổn định release nhờ tự động hóa triển khai.',
    },
    tags: ['Next.js', 'Tailwind CSS', 'i18n', 'shadcn/ui', 'REST API', 'GitHub Actions'],
    repoUrl: 'https://github.com/tungvt2003',
    demoUrl: '',
    status: 'published',
    order: 3,
    thumbnailUrl: '/placeholder.jpg',
    galleryUrls: [],
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-02-15'),
  },
]
