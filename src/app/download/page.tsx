"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  Cloud,
  Server,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  FileArchive,
  Globe,
  Terminal,
  Upload,
  FolderOpen,
  Settings,
  Rocket,
  Copy,
  Check,
} from "lucide-react";

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20EduStar,%20saya%20ingin%20konsultasi%20gratis";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function AccordionItem({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-red-600">{icon}</span>
          <span className="font-bold text-gray-900 text-base md:text-lg">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 md:px-6 pb-5 md:pb-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group bg-gray-900 rounded-xl p-4 my-3 font-mono text-sm text-green-400 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

function StepBadge({ num }: { num: number }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
      {num}
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              Edu<span className="text-red-600">Star</span>
            </span>
          </a>
          <Button asChild variant="outline" className="border-gray-200 text-gray-600 hover:text-red-600">
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-5 py-2 mb-6"
            >
              <Rocket className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Siap Deploy!</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Download &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">
                Deploy Website
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Pilih paket deployment sesuai platform hosting Anda. File sudah siap pakai — tinggal upload dan website langsung online!
            </motion.p>
          </motion.div>

          {/* Download Cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Vercel Card */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="relative bg-white rounded-3xl border-2 border-red-100 p-6 md:p-8 text-left shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-md">
                  <Cloud className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Vercel</h3>
                  <p className="text-sm text-gray-500">Source Code + Auto Build</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "Deploy otomatis via Git",
                  "SSL gratis & CDN global",
                  "Preview deployment",
                  "Serverless API support",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                <FileArchive className="w-4 h-4" />
                <span>edustar-vercel.zip (3.1 MB)</span>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-xl shadow-lg"
              >
                <a href="/api/download-vercel">
                  <Download className="w-5 h-5 mr-2" />
                  Download untuk Vercel
                </a>
              </Button>
            </motion.div>

            {/* cPanel Card */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl border-2 border-amber-100 p-6 md:p-8 text-left shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">cPanel</h3>
                  <p className="text-sm text-gray-500">Static HTML + Upload</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  "File HTML statis siap pakai",
                  "Upload via File Manager",
                  "Cocok untuk shared hosting",
                  "Tidak perlu Node.js",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                <FileArchive className="w-4 h-4" />
                <span>edustar-cpanel.zip (3.5 MB)</span>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-lg"
              >
                <a href="/api/download-cpanel">
                  <Download className="w-5 h-5 mr-2" />
                  Download untuk cPanel
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deployment Instructions */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Panduan Deployment
            </h2>
            <p className="text-gray-600">Ikuti langkah-langkah berikut untuk men deploy website</p>
          </motion.div>

          <div className="space-y-4">
            {/* Vercel Guide */}
            <AccordionItem title="Deploy ke Vercel" icon={<Cloud className="w-5 h-5" />} defaultOpen>
              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <StepBadge num={1} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Download File Source Code</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Klik tombol <strong>"Download untuk Vercel"</strong> di atas untuk mendapatkan file <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">edustar-vercel.zip</code>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <StepBadge num={2} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Ekstrak & Upload ke GitHub</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Ekstrak file ZIP, lalu upload seluruh folder ke repository GitHub baru.
                    </p>
                    <CodeBlock code={`# Buat folder project baru
mkdir edustar-website
cd edustar-website

# Ekstrak file ZIP ke folder ini
unzip edustar-vercel.zip

# Inisialisasi Git & push ke GitHub
git init
git add .
git commit -m "Initial commit: EduStar website"
git remote add origin https://github.com/USERNAME/edustar-website.git
git push -u origin main`} />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <StepBadge num={3} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Deploy ke Vercel</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">vercel.com</a>, login dengan GitHub, lalu:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 ml-1">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Klik <strong>"Add New Project"</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Pilih repository <strong>edustar-website</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Framework: <strong>Next.js</strong> (auto-detect)
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        Klik <strong>"Deploy"</strong> — tunggu 1-2 menit, selesai!
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <StepBadge num={4} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Custom Domain (Opsional)</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Di dashboard Vercel, masuk ke <strong>Settings → Domains</strong>, tambahkan domain Anda (misal: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">edustar.com</code>), lalu update DNS di registrar domain.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            {/* cPanel Guide */}
            <AccordionItem title="Deploy ke cPanel (Shared Hosting)" icon={<Server className="w-5 h-5" />}>
              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <StepBadge num={1} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Download File Static HTML</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Klik tombol <strong>"Download untuk cPanel"</strong> di atas untuk mendapatkan file <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">edustar-cpanel.zip</code>.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      <strong>⚠️ Catatan:</strong> Versi cPanel adalah static HTML. Semua fitur interaktif (form pendaftaran, dll) tetap berfungsi di browser. Namun, jika ada fitur yang memerlukan server/backend, gunakan versi Vercel.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <StepBadge num={2} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Upload via cPanel File Manager</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Login ke cPanel hosting Anda, lalu:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 ml-1">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        Buka <strong>File Manager</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        Masuk ke folder <strong>public_html</strong> (atau subdomain folder)
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <strong>Hapus</strong> semua file lama (backup dulu jika perlu)
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <strong>Upload</strong> file <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">edustar-cpanel.zip</code>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <strong>Extract/Unzip</strong> file ZIP tersebut
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        Pastikan <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">index.html</code> berada di root folder
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <StepBadge num={3} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Verifikasi & Selesai!</h4>
                    <p className="text-sm text-gray-600">
                      Buka domain Anda di browser. Website EduStar seharusnya sudah tampil dengan sempurna. Jika ada masalah, pastikan file <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">_next/</code> dan <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">images/</code> sudah ter-upload dengan benar.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            {/* Alternative Methods */}
            <AccordionItem title="Metode Alternatif" icon={<Settings className="w-5 h-5" />}>
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-red-600" />
                    Netlify
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Buka <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">app.netlify.com/drop</a>, drag & drop folder hasil extract <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">edustar-cpanel.zip</code>. Selesai dalam 30 detik!
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-red-600" />
                    GitHub Pages
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload hasil extract ke repository GitHub, aktifkan GitHub Pages di Settings → Pages. Gunakan versi cPanel (static HTML).
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-red-600" />
                    VPS / Dedicated Server
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Gunakan versi Vercel (source code). Install Node.js, lalu jalankan:
                  </p>
                  <CodeBlock code={`# Di server VPS Anda
cd /var/www/edustar
unzip edustar-vercel.zip
npm install
npm run build
npm start

# Atau gunakan PM2 untuk process manager
npm install -g pm2
pm2 start npm --name "edustar" -- start`} />
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-3xl p-8 md:p-10 text-center text-white shadow-xl"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3">Butuh Bantuan Deploy?</h3>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Tim kami siap membantu proses deployment website Anda. Hubungi kami via WhatsApp untuk konsultasi gratis!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-6 rounded-2xl shadow-lg"
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Upload className="w-5 h-5 mr-2" />
                Chat WhatsApp untuk Bantuan
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              Edu<span className="text-red-400">Star</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EduStar Bimbingan Belajar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
