import {
  Cloud,
  Users,
  Building,
  LayoutDashboard,
  FileText,
  BarChart3,
  Wrench,
  Server,
  TerminalSquare,
  RefreshCw,
  Lock,
  Shield,
  Database,
  Save,
  BrickWall,
  FolderLock,
  ShieldCheck,
  Settings2,
  MessageCircle,
} from '@lucide/svelte';

export const siteConfig = {
  brand: 'Vila Cloud',
  tagline: 'Private Ops Console',
  description:
    'Hosting privat untuk portal karyawan, dashboard admin, database operasional, dengan biaya ringan, SSL, backup dasar, dan maintenance terkelola.',
  whatsappNumber: '628159677746',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent('Halo saya ingin konsultasi kebutuhan private app hosting')}`;
  },
  seo: {
    title: 'Vila Cloud — Private Infrastructure for Internal Apps',
    description:
      'Hosting privat untuk portal karyawan, dashboard admin, database operasional, dengan biaya ringan, SSL, backup dasar, dan maintenance terkelola.',
    keywords:
      'private infrastructure, internal app hosting, ops console, managed server, dashboard hosting, portal karyawan, hosting aplikasi internal, VPS managed Indonesia',
  },
  copyright: `© ${new Date().getFullYear()} Vila Cloud. Private infrastructure for internal business systems.`,
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Layanan', href: '#services' },
  { label: 'Harga', href: '#pricing' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
];

export interface UseCase {
  icon: any;
  title: string;
  description: string;
  span?: string; // For bento grid layout
}

export const useCases: UseCase[] = [
  {
    icon: Users,
    title: 'Employee Portal',
    description: 'Aman untuk memo internal, SOP, handbook, template, dan direktori akses karyawan terpusat tanpa terekspos ke publik.',
    span: 'col-span-1 md:col-span-2 row-span-1', // Large horizontal
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Panel & DB App',
    description: 'Deploy aplikasi operasional dengan role-based access control, CRUD, dan private database terisolasi.',
    span: 'col-span-1 md:col-span-1 row-span-2', // Tall vertical
  },
  {
    icon: Building,
    title: 'Branch Dashboard',
    description: 'Sistem sentralisasi data antar cabang yang tersinkron.',
    span: 'col-span-1', // Small box
  },
  {
    icon: FileText,
    title: 'Secure Document Portal',
    description: 'Penyimpanan dokumen internal dan SOP perusahaan.',
    span: 'col-span-1', // Small box
  },
  {
    icon: BarChart3,
    title: 'NPS / Feedback Tracker',
    description: 'Dashboard khusus tim CX mencatat komplain tanpa takut data bocor.',
    span: 'col-span-1 md:col-span-2', // Medium horizontal
  },
];

export interface Service {
  icon: any;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: Server,
    title: 'Internal App Hosting',
    description: 'Hosting spesifik untuk dashboard admin, portal internal, dan sistem operasional.',
    features: ['App isolation', 'Private Database', 'SSL Encryption', 'Domain pointing'],
  },
  {
    icon: TerminalSquare,
    title: 'Managed Server Setup',
    description: 'Kami siapkan server dari nol agar aplikasi tim Anda langsung siap digunakan.',
    features: ['Ubuntu config', 'Reverse proxy', 'Firewall setup', 'App deployment'],
  },
  {
    icon: RefreshCw,
    title: 'Backup & Maintenance',
    description: 'Infrastruktur dipelihara secara rutin agar operasional Anda tidak terganggu.',
    features: ['Scheduled backup', 'Basic monitoring', 'Log checking', 'Service restart'],
  },
];

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  yearlyPrice?: string;
  subtitle: string;
  features: string[];
  cta: string;
  recommended?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 'Rp149.000',
    period: '/bulan',
    subtitle: 'For demo and staging.',
    features: [
      '1 aplikasi ringan',
      'Database ringan',
      'SSL configuration',
      'Backup mingguan',
      'Storage terbatas',
      'Basic support',
    ],
    cta: 'Pilih Starter',
  },
  {
    name: 'Internal App',
    price: 'Rp249.000',
    period: '/bulan',
    yearlyPrice: 'Rp2.988.000/tahun',
    subtitle: 'For lightweight production internal apps.',
    features: [
      '1 aplikasi production',
      'Dedicated Database',
      'Strict SSL',
      'Backup harian dasar',
      'Monitoring ringan',
      'Storage dokumen',
      'Maintenance server',
      'Troubleshooting infra',
    ],
    cta: 'Mulai Internal App',
    recommended: true,
  },
  {
    name: 'Managed Plus',
    price: 'Rp399.000',
    period: '/bulan',
    subtitle: 'For apps used regularly by operational teams.',
    features: [
      'Semua fitur Internal App',
      'Backup ekstensif',
      'Longer retention',
      'Pengecekan bulanan',
      'Laporan status',
      'Support prioritas',
    ],
    cta: 'Konsultasi Paket',
  },
];

export const pricingNote =
  'Harga belum termasuk development aplikasi custom. Paket berfokus pada hosting, database, SSL, backup dasar, dan maintenance infrastruktur ringan.';

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Apakah ini VPS biasa?',
    answer: 'Bukan sekadar VPS kosong. Ini adalah infrastruktur terkelola (managed) yang didesain khusus untuk menjalankan portal internal dan dashboard bisnis Anda tanpa Anda harus repot mengurus setup server.',
  },
  {
    question: 'Apakah cocok untuk website company profile?',
    answer: 'Layanan kami sangat dioptimalkan untuk aplikasi internal (login, database, akses khusus). Untuk website company profile sederhana, shared hosting biasa mungkin lebih ekonomis.',
  },
  {
    question: 'Apakah termasuk pembuatan aplikasi (development)?',
    answer: 'Tidak. Fokus kami murni menyediakan infrastruktur (hosting, SSL, database, maintenance) yang andal. Development aplikasi dapat didiskusikan secara terpisah jika diperlukan.',
  },
  {
    question: 'Seberapa aman data internal kami?',
    answer: 'Kami menerapkan arsitektur standar: SSL aktif, database private (tidak terekspos publik), role-based access di level server, dan firewall dasar. Data internal Anda tidak bercampur dengan website publik.',
  },
  {
    question: 'Apakah bisa digunakan untuk aplikasi custom framework?',
    answer: 'Ya, kami mendukung berbagai stack modern (Node.js, Laravel, Go, Svelte, dll) selama kebutuhan resource-nya sesuai dengan kapasitas paket.',
  },
];

export const targetAudience = [
  'Software Agencies',
  'Development Teams',
  'Startup Founders',
  'IT Departments',
  'SaaS Builders',
  'Internal Dashboards',
];

export interface ComparisonItem {
  feature: string;
  shared: string;
  private: string;
}

export const comparisonData: ComparisonItem[] = [
  {
    feature: 'Cocok untuk',
    shared: 'Website biasa',
    private: 'Aplikasi dengan login dan database',
  },
  {
    feature: 'Kontrol server',
    shared: 'Terbatas',
    private: 'Lebih fleksibel',
  },
  {
    feature: 'Backend custom',
    shared: 'Terbatas',
    private: 'Bisa deploy dashboard/admin panel',
  },
  {
    feature: 'Resource',
    shared: 'Berbagi',
    private: 'Environment lebih terkontrol',
  },
  {
    feature: 'Aplikasi internal',
    shared: 'Kurang fleksibel',
    private: 'Maintenance bisa disesuaikan',
  },
];

export const comparisonNote =
  'Kalau hanya company profile, shared hosting sudah cukup. Tapi kalau aplikasi sudah memiliki login, database, upload dokumen, role-based access, dan dashboard internal — private app hosting lebih tepat.';

export interface SecurityFeature {
  icon: any;
  title: string;
  description: string;
}

export const securityFeatures: SecurityFeature[] = [
  {
    icon: Lock,
    title: 'HTTPS / SSL',
    description: 'Semua aplikasi menggunakan koneksi terenkripsi melalui SSL.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Aplikasi dapat dibangun dengan pembatasan akses sesuai role user.',
  },
  {
    icon: Database,
    title: 'Private Database',
    description: 'Database tidak dibuka langsung ke publik.',
  },
  {
    icon: Save,
    title: 'Backup Dasar',
    description: 'Backup database dan file penting dapat dijadwalkan.',
  },
  {
    icon: BrickWall,
    title: 'Server Firewall',
    description: 'Server dikonfigurasi dengan firewall dasar untuk membatasi akses.',
  },
  {
    icon: FolderLock,
    title: 'Sensitive File Access',
    description: 'Dokumen internal dapat dibatasi agar tidak bisa diakses publik.',
  },
];

export const securityDisclaimer =
  'Untuk kebutuhan compliance tingkat enterprise, audit keamanan dan arsitektur tambahan perlu disiapkan secara terpisah.';

