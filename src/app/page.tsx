"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GraduationCap,
  Users,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
  Download,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  Target,
  TrendingUp,
  BarChart3,
  Shield,
  Play,
  Eye,
  Calendar,
  Instagram,
  Facebook,
  Youtube,
  FileText,
  UserCheck,
  Sparkles,
  BadgeCheck,
  Heart,
  Zap,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/* ═══════════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

function SectionBadge({
  children,
  color = "red",
}: {
  children: React.ReactNode;
  color?: "red" | "amber";
}) {
  const cls =
    color === "red"
      ? "text-red-600 bg-red-50"
      : "text-amber-600 bg-amber-50";
  return (
    <span
      className={`inline-block text-sm font-semibold ${cls} px-4 py-1.5 rounded-full mb-4`}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Metode", href: "#metode" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Galeri", href: "#galeri" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
];

const advantages = [
  {
    icon: <Award className="w-7 h-7" />,
    title: "Tutor Berpengalaman",
    description: "Lulusan terbaik universitas ternama dengan sertifikasi mengajar.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Metode Efektif",
    description: "Pendekatan belajar berbasis pemahaman konsep, bukan sekadar menghafal.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Kelas Kecil/Privat",
    description: "Maksimal 8 siswa per kelas untuk perhatian optimal.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Jadwal Fleksibel",
    description: "Pilih jadwal belajar sesuai aktivitas sekolah dan kegiatan lainnya.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Pendampingan Intensif",
    description: "Monitoring berkala dan konsultasi rutin dengan orang tua.",
  },
];

const teachers = [
  {
    name: "Ibu Dr. Sari Dewi, M.Pd",
    subject: "Matematika",
    bio: "Lulusan Universitas Indonesia dengan pengalaman 15 tahun mengajar. Spesialisasi dalam aljabar dan kalkulus.",
    years: 15,
    image: "/images/teacher-1.png",
  },
  {
    name: "Bapak Ahmad Fauzi, S.Pd",
    subject: "Fisika",
    bio: "Lulusan Institut Teknologi Bandung. 10 tahun pengalaman dalam pembinaan olimpiade fisika.",
    years: 10,
    image: "/images/teacher-2.png",
  },
  {
    name: "Ibu Ratna Sari, S.Pd",
    subject: "Bahasa Inggris",
    bio: "IELTS 8.0 dan 8 tahun pengalaman. Ahli dalam persiapan ujian internasional dan speaking.",
    years: 8,
    image: "/images/teacher-3.png",
  },
  {
    name: "Bapak Budi Hartono, M.Sc",
    subject: "Kimia",
    bio: "Lulusan Universitas Gadjah Mada. 12 tahun pengalaman mengajar dan riset di bidang kimia.",
    years: 12,
    image: "/images/teacher-4.png",
  },
  {
    name: "Ibu Linda Permata, S.Pd",
    subject: "Biologi",
    bio: "Lulusan Universitas Airlangga. 9 tahun pengalaman dengan fokus pada biologi molekuler.",
    years: 9,
    image: "/images/teacher-5.png",
  },
];

const programs = [
  {
    title: "SD Kelas 1–6",
    description: "Penguatan fondasi akademik untuk siswa sekolah dasar. Belajar membaca, menulis, berhitung, dan sains dasar dengan cara yang menyenangkan.",
    icon: "📚",
    color: "from-red-500 to-red-600",
    features: [
      "Fondasi Membaca & Menulis",
      "Matematika Dasar yang Menyenangkan",
      "Sains & Eksplorasi Alam",
      "Bimbingan Karakter Anak",
    ],
  },
  {
    title: "SMP Kelas 7–9",
    description: "Persiapan menyeluruh untuk ujian dan peningkatan pemahaman materi IPA, Matematika, Bahasa Inggris, dan lainnya.",
    icon: "📖",
    color: "from-amber-500 to-orange-500",
    features: [
      "Persiapan Ujian Semester",
      "Latihan Soal Intensif",
      "Pembinaan Olimpiade",
      "Bimbingan Karir SMP",
    ],
  },
  {
    title: "SMA Kelas 10–12",
    description: "Program intensif untuk menghadapi UAS, Ujian Nasional, dan SBMPTN. Materi mendalam dan latihan soal berkala.",
    icon: "🎓",
    color: "from-red-600 to-rose-600",
    features: [
      "Materi Mendalam per Mapel",
      "Tryout Rutin & Pembahasan",
      "Strategi Jawab SNBT/UTBK",
      "Konsultasi Jurusan Kampus",
    ],
  },
  {
    title: "Persiapan UTBK/SNBT",
    description: "Simulasi tes, strategi menjawab, dan pembahasan materi TPS & TKA. Latihan soal intensif setiap minggu.",
    icon: "🎯",
    color: "from-amber-600 to-yellow-500",
    features: [
      "Simulasi UTBK Realistis",
      "Bank Soal 10.000+ Soal",
      "Pembahasan TPS & TKA",
      "Mentoring Alumni PTN",
    ],
  },
  {
    title: "Les Privat",
    description: "Pendampingan one-on-one dengan tutor berpengalaman. Jadwal fleksibel sesuai kebutuhan dan fokus pada kelemahan siswa.",
    icon: "👨‍🏫",
    color: "from-red-500 to-amber-500",
    features: [
      "Tutor Eksklusif 1-on-1",
      "Jadwal 100% Fleksibel",
      "Fokus Kelemahan Siswa",
      "Laporan Berkala ke Ortu",
    ],
  },
];

const prestasiSiswa = [
  {
    name: "Anindya Putri",
    school: "SMA N 1 Jakarta",
    achievement: "Lulus UI Teknik 2024, Juara 1 Olimpiade Matematika",
    badge: "Lulus UI",
    image: "/images/prestasi-1.png",
  },
  {
    name: "Muhammad Rizky",
    school: "SMA N 3 Bandung",
    achievement: "Lulus ITB Informatika 2024, Nilai UTBK 985",
    badge: "Nilai UTBK 985",
    image: "/images/prestasi-2.png",
  },
  {
    name: "Khadijah Azzahra",
    school: "SMP N 2 Surabaya",
    achievement: "Juara 1 OSN IPA tingkat Provinsi 2024",
    badge: "Juara 1 OSN",
    image: "/images/prestasi-3.png",
  },
  {
    name: "Dimas Pratama",
    school: "SMA N 5 Semarang",
    achievement: "Lulus UGM Kedokteran 2024, Beasiswa Bidikmisi",
    badge: "Lulus UGM",
    image: "/images/prestasi-4.png",
  },
  {
    name: "Siti Nurhaliza",
    school: "SMA N 1 Yogyakarta",
    achievement: "Juara 2 Olimpiade Fisika Nasional 2024",
    badge: "Juara 2 Fisika",
    image: "/images/prestasi-5.png",
  },
  {
    name: "Farhan Rizqi",
    school: "SMA N 8 Jakarta",
    achievement: "Lulus ITS Teknik Sipil 2024, Nilai UTBK 975",
    badge: "Lulus ITS",
    image: "/images/prestasi-6.png",
  },
  {
    name: "Aisyah Putri R.",
    school: "SD Islam Al-Azhar",
    achievement: "Juara 1 Lomba Matematika tingkat Kota 2024",
    badge: "Juara 1 Matematika",
    image: "/images/prestasi-7.png",
  },
  {
    name: "Naila Syahputri",
    school: "SMA N 2 Bandung",
    achievement: "Juara 1 OSN Biologi tingkat Nasional 2024, Lulus UNAIR Kedokteran",
    badge: "Juara 1 OSN Bio",
    image: "/images/prestasi-8.png",
  },
];

const testimonials = [
  {
    name: "Anisa Putri",
    role: "Siswa SMA",
    avatar: "/images/avatar-1.png",
    text: "Nilai matematika saya naik dari 65 ke 92 dalam 3 bulan! Metode belajarnya sangat mudah dipahami dan tutornya sabar banget.",
    rating: 5,
  },
  {
    name: "Rizky Pratama",
    role: "Siswa SMP",
    avatar: "/images/avatar-2.png",
    text: "Saya berhasil lolos SNBT ke kampus impian! Terima kasih EduStar atas bimbingan yang luar biasa selama persiapan UTBK.",
    rating: 5,
  },
  {
    name: "Ibu Sarah",
    role: "Orang Tua Siswa",
    avatar: "/images/avatar-3.png",
    text: "Anak saya jadi lebih semangat belajar. Tutor-tutornya profesional dan selalu memberikan feedback perkembangan anak saya.",
    rating: 5,
  },
];

const articles = [
  {
    title: "5 Strategi Efektif Mengerjakan Soal UTBK",
    category: "Tips UTBK",
    date: "15 Oktober 2024",
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "Cara Membuat Jadwal Belajar yang Konsisten",
    category: "Tips Belajar",
    date: "10 Oktober 2024",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Mengenal Sistem Seleksi SNBT 2024",
    category: "Info Ujian",
    date: "5 Oktober 2024",
    gradient: "from-red-600 to-amber-500",
  },
  {
    title: "Tips Menghadapi Ujian Akhir Semester",
    category: "Tips UAS",
    date: "1 Oktober 2024",
    gradient: "from-amber-600 to-yellow-500",
  },
];

const faqs = [
  {
    question: "Apakah bisa trial sebelum mendaftar?",
    answer: "Ya, kami menyediakan kelas trial gratis 1 sesi untuk semua program. Anda bisa mencoba pengalaman belajar di EduStar sebelum memutuskan untuk bergabung secara resmi.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI, BRI). Pembayaran bisa dilakukan secara cicilan hingga 3 bulan tanpa bunga untuk paket tertentu.",
  },
  {
    question: "Apakah kelas tersedia secara online dan offline?",
    answer: "Ya, keduanya tersedia! Kami menyediakan kelas offline di kantor kami dan kelas online via Zoom/Google Meet. Anda juga bisa memilih format hybrid sesuai kebutuhan.",
  },
  {
    question: "Apakah jadwal belajar fleksibel?",
    answer: "Tentu! Untuk program reguler, Anda bisa memilih slot jadwal yang tersedia. Untuk les privat, jadwal 100% bisa disesuaikan dengan kebutuhan siswa.",
  },
  {
    question: "Apakah ada garansi peningkatan nilai?",
    answer: "Ya, kami memberikan garansi peningkatan nilai. Jika dalam 3 bulan nilai siswa tidak menunjukkan peningkatan, kami akan memberikan sesi tambahan secara gratis hingga target tercapai.",
  },
  {
    question: "Berapa biaya bimbingan belajar di EduStar?",
    answer: "Biaya bervariasi tergantung program dan paket yang dipilih. Hubungi kami via WhatsApp untuk konsultasi gratis dan mendapatkan penawaran harga terbaik sesuai kebutuhan Anda.",
  },
];

const galleryImages = [
  { src: "/images/gallery-1.png", alt: "Sesi Tutoring Privat" },
  { src: "/images/gallery-2.png", alt: "Belajar Kelompok" },
  { src: "/images/gallery-3.png", alt: "Diskusi Kelas" },
  { src: "/images/gallery-4.png", alt: "Lingkungan Belajar" },
  { src: "/images/gallery-5.png", alt: "Pembelajaran Interaktif" },
  { src: "/images/gallery-6.png", alt: "Perayaan Sukses" },
];

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20EduStar,%20saya%20ingin%20konsultasi%20gratis";
const WA_DAFTAR = "https://wa.me/6281234567890?text=Halo%20EduStar,%20saya%20ingin%20mendaftar";

const heroSlides = [
  {
    image: "/images/banner-1.png",
    badge: "Bimbingan Belajar #1 Terpercaya",
    badgeIcon: <Sparkles className="w-4 h-4 text-amber-500" />,
    titleLine1: "Naikkan",
    titleHighlight1: "Nilai",
    titleLine2: "Raih",
    titleHighlight2: "Sekolah Impian",
    description: "Bergabunglah dengan 5.000+ siswa yang telah berhasil meningkatkan prestasi mereka bersama EduStar. Tutor berpengalaman, metode terbukti.",
    ctaPrimary: { label: "Daftar Sekarang", href: "#pendaftaran" },
    ctaSecondary: { label: "Konsultasi Gratis", href: WA_LINK },
    gradient: "from-black/60 via-black/30 to-transparent",
  },
  {
    image: "/images/banner-2.png",
    badge: "Tutor Berpengalaman",
    badgeIcon: <Award className="w-4 h-4 text-amber-500" />,
    titleLine1: "Belajar Bersama",
    titleHighlight1: "Tutor Terbaik",
    titleLine2: "Lulusan",
    titleHighlight2: "Kampus Ternama",
    description: "Tim pengajar kami adalah lulusan UI, ITB, UGM, dan universitas terkemuka lainnya dengan pengalaman mengajar lebih dari 10 tahun.",
    ctaPrimary: { label: "Lihat Tim Pengajar", href: "#tentang" },
    ctaSecondary: { label: "Hubungi Kami", href: WA_LINK },
    gradient: "from-red-900/70 via-red-900/30 to-transparent",
  },
  {
    image: "/images/banner-3.png",
    badge: "Program Lengkap",
    badgeIcon: <BookOpen className="w-4 h-4 text-amber-500" />,
    titleLine1: "SD, SMP, SMA",
    titleHighlight1: "Semua Mapel",
    titleLine2: "Persiapan",
    titleHighlight2: "UTBK / SNBT",
    description: "Program belajar komprehensif dari SD hingga SMA dengan bahan ajar terstruktur, latihan soal intensif, dan tryout berkala.",
    ctaPrimary: { label: "Lihat Program", href: "#program" },
    ctaSecondary: { label: "Konsultasi Gratis", href: WA_LINK },
    gradient: "from-amber-900/60 via-amber-900/25 to-transparent",
  },
  {
    image: "/images/banner-4.png",
    badge: "Pendaftaran Dibuka!",
    badgeIcon: <Zap className="w-4 h-4 text-amber-500" />,
    titleLine1: "95% Siswa",
    titleHighlight1: "Lulus Kampus Impian",
    titleLine2: "Bergabung",
    titleHighlight2: "Sekarang!",
    description: "Dapatkan potongan biaya pendaftaran 30% untuk pendaftar bulan ini. Kelas mulai setiap minggu — jangan sampai ketinggalan!",
    ctaPrimary: { label: "Daftar Sekarang", href: "#pendaftaran" },
    ctaSecondary: { label: "Chat WhatsApp", href: WA_DAFTAR },
    gradient: "from-black/70 via-black/40 to-transparent",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [daftarForm, setDaftarForm] = useState({ name: "", phone: "", program: "", kelas: "" });
  const [daftarSubmitted, setDaftarSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);
  const sliderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play slider
  useEffect(() => {
    if (sliderPaused) {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
      return;
    }
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [sliderPaused]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDaftarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDaftarSubmitted(true);
    setTimeout(() => setDaftarSubmitted(false), 4000);
    setDaftarForm({ name: "", phone: "", program: "", kelas: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ╔══════════════════════════════════════════════════════╗
          ║  1. STICKY NAVBAR                                  ║
          ╚══════════════════════════════════════════════════════╝ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                Edu<span className="text-red-600">Star</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-2 text-sm font-medium text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="ml-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                <a href={WA_LINK}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Konsultasi Gratis
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <Button asChild className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white">
                    <a href={WA_LINK}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Konsultasi Gratis
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  2. HERO SLIDER BANNER                              ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section
        id="beranda"
        className="relative h-[85vh] min-h-[550px] max-h-[900px] overflow-hidden"
        onMouseEnter={() => setSliderPaused(true)}
        onMouseLeave={() => setSliderPaused(false)}
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].badge}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient}`} />
            {/* Bottom fade for nav dots */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            >
              <div className="max-w-2xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6"
                >
                  {heroSlides[currentSlide].badgeIcon}
                  <span className="text-sm font-semibold text-white">{heroSlides[currentSlide].badge}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg"
                >
                  {heroSlides[currentSlide].titleLine1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                    {heroSlides[currentSlide].titleHighlight1}
                  </span>{" "}
                  {heroSlides[currentSlide].titleLine2}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-amber-300">
                    {heroSlides[currentSlide].titleHighlight2}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed drop-shadow-md"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-base px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  >
                    <a href={heroSlides[currentSlide].ctaPrimary.href}>
                      {heroSlides[currentSlide].ctaPrimary.label}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/40 text-white hover:bg-white/15 text-base px-8 py-6 rounded-2xl transition-all hover:-translate-y-0.5 backdrop-blur-sm"
                  >
                    <a href={heroSlides[currentSlide].ctaSecondary.href}>
                      <Phone className="w-5 h-5 mr-2" />
                      {heroSlides[currentSlide].ctaSecondary.label}
                    </a>
                  </Button>
                </motion.div>

                {/* Trust indicator - only on first slide */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-8 flex items-center gap-4"
                  >
                    <div className="flex -space-x-2">
                      {["prestasi-1", "prestasi-2", "prestasi-3", "prestasi-5"].map((img, i) => (
                        <img
                          key={i}
                          src={`/images/${img}.png`}
                          alt="Siswa EduStar"
                          className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                        />
                      ))}
                    </div>
                    <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-white/90">
                        <strong className="text-white">4.9/5</strong> dari 2.500+ siswa
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-all group"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-all group"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`relative rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-10 h-3"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70"
              }`}
            >
              {index === currentSlide && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-amber-400"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {index !== currentSlide && (
                <span className="block w-full h-full rounded-full bg-current" />
              )}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
          {!sliderPaused && (
            <motion.div
              key={`progress-${currentSlide}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-400"
            />
          )}
        </div>
      </section>


      {/* ╔══════════════════════════════════════════════════════╗
          ║  3. TRUST INDICATORS / STATISTICS                   ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection className="relative py-16 md:py-20 bg-gradient-to-r from-red-600 via-red-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: <Users className="w-8 h-8" />, value: 5000, suffix: "+", label: "Siswa Aktif" },
              { icon: <GraduationCap className="w-8 h-8" />, value: 95, suffix: "%", label: "Tingkat Kelulusan" },
              { icon: <Award className="w-8 h-8" />, value: 12, suffix: "+", label: "Tahun Pengalaman" },
              { icon: <Star className="w-8 h-8" />, value: 150, suffix: "+", label: "Tutor Profesional" },
            ].map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <p className="text-3xl md:text-5xl font-extrabold mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                </p>
                <p className="text-sm md:text-base text-white/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  4. TENTANG KAMI                                    ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="tentang" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Tentang Kami</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Membangun Generasi Unggul Sejak 2012
            </h2>
            <p className="text-lg text-gray-600">
              EduStar adalah lembaga bimbingan belajar yang berdedikasi untuk mengembangkan potensi akademik dan karakter setiap siswa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                EduStar didirikan pada tahun 2012 oleh sekelompok pendidik muda yang memiliki visi besar untuk menciptakan lembaga pendidikan non-formal yang berkualitas tinggi dan dapat diakses oleh semua kalangan.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                Selama lebih dari satu dekade, kami telah melayani ribuan siswa dari berbagai jenjang pendidikan — dari SD hingga persiapan masuk universitas. Dengan tim pengajar yang berpengalaman dan metode pembelajaran yang terus diperbarui, EduStar telah menjadi salah satu bimbingan belajar terdepan di Indonesia.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                Kami percaya bahwa setiap anak memiliki potensi luar biasa yang menunggu untuk dikembangkan. Oleh karena itu, kami selalu berupaya menciptakan lingkungan belajar yang kondusif, menyenangkan, dan penuh semangat.
              </p>

              {/* Legalitas badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <BadgeCheck className="w-5 h-5" />, text: "Terdaftar di Kemenkumham" },
                  { icon: <Shield className="w-5 h-5" />, text: "Berbadan Hukum PT" },
                  { icon: <Award className="w-5 h-5" />, text: "Sertifikasi ISO 9001" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm"
                  >
                    <span className="text-red-600">{badge.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Key Facts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Visi */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Visi</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Menjadi lembaga bimbingan belajar terdepan yang menghasilkan generasi cerdas, berkarakter, dan siap bersaing di tingkat nasional maupun internasional.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Misi</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Menyediakan pendidikan berkualitas dengan tutor berpengalaman dan metode terkini.",
                    "Membangun karakter siswa melalui pendekatan holistik yang mengintegrasikan akademik dan soft skill.",
                    "Membuat layanan pendidikan yang inklusif dan dapat diakses oleh semua kalangan.",
                  ].map((misi, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {misi}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sejarah */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Sejarah Singkat</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Berawal dari sebuah kelas kecil dengan 15 siswa di Jakarta Selatan, EduStar kini telah berkembang menjadi lembaga bimbingan belajar dengan 10 cabang di berbagai kota besar di Indonesia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  6. TIM PENGAJAR                                    ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge color="amber">Tim Pengajar</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tim Pengajar Kami
            </h2>
            <p className="text-lg text-gray-600">
              Para pendidik terbaik siap membimbing putra-putri Anda menuju kesuksesan akademik.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teachers.map((teacher, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-semibold text-red-600">
                    {teacher.years} tahun pengalaman
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{teacher.name}</h3>
                  <p className="text-red-600 text-xs font-semibold mb-2">{teacher.subject}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{teacher.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  KEUNGGULAN UTAMA (moved below Tim Pengajar)       ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionBadge color="amber">Keunggulan</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih <span className="text-red-600">EduStar</span>?
            </h2>
            <p className="text-lg text-gray-600">
              Kami berkomitmen memberikan pengalaman belajar terbaik untuk setiap siswa.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group text-center p-5 md:p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 text-red-600 mb-4 group-hover:from-red-600 group-hover:to-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  7. PROGRAM / KELAS                                 ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="program" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Program Kami</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Program Bimbingan Belajar
            </h2>
            <p className="text-lg text-gray-600">
              Pilih program yang sesuai dengan kebutuhan akademikmu. Setiap program dirancang untuk memaksimalkan potensi belajar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${program.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto font-semibold text-sm"
                  >
                    <a href="#kontak">
                      Lihat Detail
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-sm"
                  >
                    <a href="#pendaftaran">Daftar</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  8. METODE BELAJAR                                  ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="metode" className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/learning-method.png"
                  alt="Metode belajar EduStar"
                  className="w-full h-auto object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">500+ Video Pembelajaran</p>
                    <p className="text-xs text-gray-500">Tersedia kapan saja</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionBadge>Metode Belajar</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Metode Belajar yang{" "}
                <span className="text-red-600">Terbukti Efektif</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Kami menggabungkan teknologi pendidikan terkini dengan pendekatan personal untuk menghasilkan pengalaman belajar yang optimal.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <BookOpen className="w-6 h-6" />,
                    title: "Pembelajaran Interaktif",
                    desc: "Diskusi, presentasi, dan hands-on practice agar siswa aktif berpartisipasi dalam setiap sesi.",
                  },
                  {
                    icon: <BarChart3 className="w-6 h-6" />,
                    title: "Evaluasi Berkala",
                    desc: "Tes evaluasi setiap 2 minggu untuk mengukur pemahaman dan mengidentifikasi area perbaikan.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Tracking Perkembangan",
                    desc: "Dashboard digital untuk memantau perkembangan belajar siswa, bisa diakses oleh orang tua.",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Tryout & Latihan Soal",
                    desc: "Bank soal 10.000+ dari berbagai sumber untuk latihan intensif dan simulasi ujian.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center text-red-600">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {["Online", "Offline", "Hybrid"].map((mode) => (
                  <span
                    key={mode}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-amber-50 text-red-600 text-sm font-medium px-4 py-2 rounded-xl border border-red-100"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {mode}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  9. PROFIL SISWA BERPRESTASI                        ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="prestasi" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Siswa Berprestasi</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Kumpulan Siswa Berprestasi EduStar
            </h2>
            <p className="text-lg text-gray-600">
              Mereka adalah bukti nyata bahwa dedikasi dan metode belajar yang tepat dapat menghasilkan prestasi luar biasa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prestasiSiswa.map((siswa, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Large photo */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={siswa.image}
                    alt={siswa.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Achievement badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                    {siswa.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{siswa.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{siswa.school}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{siswa.achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  10. TESTIMONI & HASIL                              ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="testimoni" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonials */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge color="amber">Testimoni</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-gray-600">
              Dengarkan cerita sukses dari siswa dan orang tua yang telah merasakan manfaat belajar di EduStar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-100"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hasil Nyata */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, value: "35%", label: "Rata-rata kenaikan nilai dalam 3 bulan" },
              { icon: <GraduationCap className="w-8 h-8" />, value: "95%", label: "Siswa lolos SNBT ke PTN impian" },
              { icon: <Award className="w-8 h-8" />, value: "100+", label: "Siswa meraih juara kompetisi akademik" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-100/50"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 text-white mb-4">
                  {item.icon}
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-red-600 mb-2">{item.value}</p>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  11. GALERI KEGIATAN                                ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="galeri" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Galeri</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Galeri Kegiatan
            </h2>
            <p className="text-lg text-gray-600">
              Lihat langsung aktivitas belajar dan lingkungan yang nyaman untuk mendukung proses belajar mengajar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={scaleIn}
                className={`group relative rounded-2xl overflow-hidden ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 md:h-full min-h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                  <span className="text-white font-semibold text-sm md:text-base">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  12. ARTIKEL / TIPS BELAJAR                         ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge color="amber">Artikel</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tips & Informasi Belajar
            </h2>
            <p className="text-lg text-gray-600">
              Dapatkan tips dan informasi terbaru seputar dunia pendidikan dan strategi belajar efektif.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Placeholder gradient image */}
                <div className={`relative h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                  <FileText className="w-12 h-12 text-white/60" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 px-3 py-1 rounded-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3 group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <a
                    href="#"
                    className="text-red-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  13. FAQ                                            ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="faq" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-gray-600">
              Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang EduStar.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:text-red-600 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  14. KONTAK & LOKASI                                ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="kontak" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge>Kontak</SectionBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-lg text-gray-600">
              Kami siap membantu Anda. Hubungi kami untuk konsultasi gratis atau langsung kunjungi kantor kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: <Phone className="w-6 h-6" />, title: "Telepon", value: "(021) 1234-5678", sub: "Senin–Sabtu, 09:00–21:00", color: "from-red-500 to-red-600" },
              { icon: <Mail className="w-6 h-6" />, title: "Email", value: "info@edustar.id", sub: "Respons dalam 24 jam", color: "from-amber-500 to-orange-500" },
              { icon: <MapPin className="w-6 h-6" />, title: "Alamat", value: "Jl. Pendidikan No. 123, Jakarta Selatan", sub: "10 cabang di Indonesia", color: "from-red-600 to-amber-500" },
              { icon: <Clock className="w-6 h-6" />, title: "Jam Operasional", value: "Senin – Sabtu: 09:00 – 21:00", sub: "Minggu: 10:00 – 17:00", color: "from-amber-600 to-yellow-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center text-red-600 mb-4">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                <p className="text-gray-700 text-sm">{item.value}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-base px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat via WhatsApp
              </a>
            </Button>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904178223536!2d106.82492431538466!3d-6.229746995493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4008b5e4c3d%3A0x79632b1c1c23d44d!2sJl.%20Pendidikan%20No.%20123%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi EduStar - Jakarta Selatan"
              className="w-full"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  15. PENDAFTARAN (Conversion-focused)               ║
          ╚══════════════════════════════════════════════════════╝ */}
      <AnimatedSection id="pendaftaran" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-600 to-amber-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwTTMwLTEwdjYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Daftar Sekarang & Dapatkan Bonus Spesial!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto"
            >
              Daftar hari ini dan dapatkan: <strong>Trial gratis 1 minggu</strong> + <strong>Modul belajar eksklusif</strong> + <strong>Diskon 20%</strong> untuk bulan pertama.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-8"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-white text-sm font-medium">
                Promo terbatas untuk 50 pendaftar pertama!
              </span>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {daftarSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-12 text-center shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                  <p className="text-gray-600">Tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleDaftarSubmit}
                  className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl"
                >
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <Label htmlFor="d-name" className="text-gray-900 font-semibold">Nama</Label>
                      <Input
                        id="d-name"
                        placeholder="Nama lengkap"
                        value={daftarForm.name}
                        onChange={(e) => setDaftarForm({ ...daftarForm, name: e.target.value })}
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="d-phone" className="text-gray-900 font-semibold">No HP</Label>
                      <Input
                        id="d-phone"
                        placeholder="081234567890"
                        type="tel"
                        value={daftarForm.phone}
                        onChange={(e) => setDaftarForm({ ...daftarForm, phone: e.target.value })}
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-6">
                    <div>
                      <Label htmlFor="d-program" className="text-gray-900 font-semibold">Program</Label>
                      <select
                        id="d-program"
                        value={daftarForm.program}
                        onChange={(e) => setDaftarForm({ ...daftarForm, program: e.target.value })}
                        required
                        className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Pilih Program</option>
                        <option value="sd">SD Kelas 1-6</option>
                        <option value="smp">SMP Kelas 7-9</option>
                        <option value="sma">SMA Kelas 10-12</option>
                        <option value="utbk">Persiapan UTBK</option>
                        <option value="privat">Les Privat</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="d-kelas" className="text-gray-900 font-semibold">Kelas</Label>
                      <select
                        id="d-kelas"
                        value={daftarForm.kelas}
                        onChange={(e) => setDaftarForm({ ...daftarForm, kelas: e.target.value })}
                        required
                        className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Pilih Kelas</option>
                        <option value="1">Kelas 1</option>
                        <option value="2">Kelas 2</option>
                        <option value="3">Kelas 3</option>
                        <option value="4">Kelas 4</option>
                        <option value="5">Kelas 5</option>
                        <option value="6">Kelas 6</option>
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                        <option value="9">Kelas 9</option>
                        <option value="10">Kelas 10</option>
                        <option value="11">Kelas 11</option>
                        <option value="12">Kelas 12</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  >
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <div className="mt-4 text-center">
                    <a
                      href={WA_DAFTAR}
                      className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-800 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Atau daftar via WhatsApp
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  16. FOOTER                                         ║
          ╚══════════════════════════════════════════════════════╝ */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="#beranda" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Edu<span className="text-red-500">Star</span>
                </span>
              </a>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Lembaga bimbingan belajar terpercaya yang berdedikasi membangun generasi unggul Indonesia sejak 2012.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram className="w-5 h-5" />, href: "#" },
                  { icon: <Facebook className="w-5 h-5" />, href: "#" },
                  { icon: <Youtube className="w-5 h-5" />, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-amber-500 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-white font-bold mb-4">Menu</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Beranda", href: "#beranda" },
                  { label: "Tentang Kami", href: "#tentang" },
                  { label: "Tim Pengajar", href: "#tentang" },
                  { label: "Metode Belajar", href: "#metode" },
                  { label: "Siswa Berprestasi", href: "#prestasi" },
                  { label: "Testimoni", href: "#testimoni" },
                  { label: "FAQ", href: "#faq" },
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Program */}
            <div>
              <h4 className="text-white font-bold mb-4">Program</h4>
              <ul className="space-y-2.5">
                {["SD Kelas 1-6", "SMP Kelas 7-9", "SMA Kelas 10-12", "Persiapan UTBK/SNBT", "Les Privat"].map(
                  (prog, i) => (
                    <li key={i}>
                      <a href="#program" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                        {prog}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">(021) 1234-5678</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">info@edustar.id</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Jl. Pendidikan No. 123, Jakarta Selatan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Sen–Sab: 09:00–21:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} EduStar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  17. FLOATING BUTTONS (WhatsApp + Download)           ║
          ╚══════════════════════════════════════════════════════╝ */}
      {/* Floating Download Button */}
      <motion.a
        href="/download"
        className="fixed bottom-6 right-[4.5rem] sm:right-24 z-50 w-14 h-14 bg-gradient-to-br from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 rounded-full flex items-center justify-center shadow-2xl transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-6 h-6 text-white relative z-10" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Download & Deploy
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900" />
        </span>
      </motion.a>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-colors group"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" />

        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat WhatsApp
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900" />
        </span>
      </motion.a>
    </div>
  );
}
