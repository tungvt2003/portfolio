export const locales = ['en', 'vi'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact',
      hireMe: 'Hire me',
    },
    hero: {
      greeting: 'Hi, I am',
      name: 'Van Thien Tung',
      title: 'Frontend Developer',
      subtitle:
        'I build scalable and user-friendly web apps with React and Next.js, with strong focus on performance, clean architecture, and practical UI/UX.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      yearsExp: 'Years Experience',
      projectsCompleted: 'Key Projects',
      techStack: 'Core Technologies',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Projects from real production work and professional practice',
      viewDetails: 'Details',
      viewDemo: 'Demo',
      viewCode: 'GitHub',
    },
    experience: {
      title: 'Work Experience',
      subtitle: 'My professional timeline in frontend development',
    },
    education: {
      title: 'Education',
      subtitle: 'Academic foundation and specialization',
      degree: 'Major',
      gpa: 'GPA',
    },
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Technologies and tools used in daily development',
      frontend: 'Frontend',
      backend: 'Backend & Data',
      devops: 'DevOps & Quality',
      tools: 'Tools',
    },
    contact: {
      title: 'Let\'s Build Together',
      subtitle:
        'If you need a frontend developer for product implementation, optimization, or admin dashboard development, let\'s connect.',
      cta: 'Send me an email',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  vi: {
    nav: {
      projects: 'Dự án',
      experience: 'Kinh nghiệm',
      education: 'Học vấn',
      skills: 'Kỹ năng',
      contact: 'Liên hệ',
      hireMe: 'Hợp tác',
    },
    hero: {
      greeting: 'Xin chào, tôi là',
      name: 'Van Thien Tung',
      title: 'Frontend Developer',
      subtitle:
        'Tôi xây dựng ứng dụng web để mở rộng và dễ sử dụng bằng React và Next.js, tập trung vào hiệu năng, kiến trúc sạch và trải nghiệm người dùng thực tế.',
      viewProjects: 'Xem dự án',
      downloadCV: 'Tải CV',
      yearsExp: 'Năm kinh nghiệm',
      projectsCompleted: 'Dự án tiêu biểu',
      techStack: 'Công nghệ chính',
    },
    projects: {
      title: 'Dự án tiêu biểu',
      subtitle: 'Các dự án từ kinh nghiệm làm việc và sản phẩm thực tế',
      viewDetails: 'Chi tiết',
      viewDemo: 'Demo',
      viewCode: 'GitHub',
    },
    experience: {
      title: 'Kinh nghiệm làm việc',
      subtitle: 'Hành trình phát triển chuyên môn frontend',
    },
    education: {
      title: 'Học vấn',
      subtitle: 'Nền tảng học thuật và chuyên ngành',
      degree: 'Chuyên ngành',
      gpa: 'Điểm GPA',
    },
    skills: {
      title: 'Kỹ năng & Chuyên môn',
      subtitle: 'Công nghệ và công cụ sử dụng hàng ngày',
      frontend: 'Frontend',
      backend: 'Backend & Dữ liệu',
      devops: 'DevOps & Chất lượng',
      tools: 'Công cụ',
    },
    contact: {
      title: 'Cùng tạo sản phẩm tốt hơn',
      subtitle:
        'Nếu bạn cần frontend developer cho triển khai tính năng, tối ưu hiệu năng hoặc xây dựng dashboard admin, hãy kết nối với tôi.',
      cta: 'Gửi email cho tôi',
    },
    footer: {
      rights: 'Bảo lưu mọi quyền.',
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en
}
