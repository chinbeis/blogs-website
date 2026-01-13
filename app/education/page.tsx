'use client'

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { PlayCircle, ArrowRight, Video } from "lucide-react"
import Link from "next/link"

export default function EducationPage() {
  const { language } = useLanguage()

  const educationalVideos = [
    {
      id: 'tap-technique',
      titleMn: "TAP (T and Small Protrusion) техник",
      titleEn: "TAP (T and Small Protrusion) Technique",
      descriptionMn: "TAP (T and Small Protrusion) арга нь ялангуяа шулуун стент тавих ажилбар (provisional stenting) хийсний дараа хажуугийн салаанд (side branch SB) заавал стент тавих шаардлага гарсан үед ашиглагддаг, бифуркацийн стентийн хялбаршуулсан-хоёр стенттэй стратеги юм. SB-ийн амсрыг бүрэн хамруулахын зэрэгцээ металлын давхцлыг хамгийн бага байлгаж, төгсгөлийн kissing баллон тэлэлтийг хялбар хийхэд чиглэгдсэн арга юм.",
      descriptionEn: "The TAP (T and small Protrusion) technique is a simplified two-stent strategy used in bifurcation stenting, particularly as a bailout after provisional stenting when the side branch (SB) requires stenting. It is designed to ensure complete coverage of the SB ostium while minimizing metal overlap and facilitating final kissing balloon inflation.",
      videoUrl: "/videos/facebook2.mp4",
      newsId: "a672cf7e-5a83-4902-a02c-b4e179503294"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight uppercase text-white">
            {language === 'mn' ? 'Боловсрол' : 'Education'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium">
            {language === 'mn' 
              ? 'Бид интервеншн кардиологийн чиглэлээр эмч, мэргэжилтнүүдийн мэдлэг чадварыг дээшлүүлэхэд чиглэсэн сургалт, материалуудыг хүргэж байна.' 
              : 'We provide training and materials aimed at improving the knowledge and skills of doctors and specialists in interventional cardiology.'}
          </p>
        </div>
      </section>

      {/* Main Content - Video & Description */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {educationalVideos.map((video) => (
            <div key={video.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-blue-100 group">
                <video 
                  src={video.videoUrl} 
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all duration-500"></div>
              </div>

              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-wider">
                  <Video className="w-4 h-4" />
                  <span>{language === 'mn' ? 'Видео заавар' : 'Video Tutorial'}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                  {language === 'mn' ? video.titleMn : video.titleEn}
                </h2>

                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {language === 'mn' ? video.descriptionMn : video.descriptionEn}
                </p>

                <Link href={`/news/${video.newsId}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-16 rounded-2xl font-black uppercase shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 text-lg">
                    {language === 'mn' ? 'Бүрэн эхээр нь үзэх' : 'Watch Full Tutorial'}
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
            {language === 'mn' ? 'Тасралтгүй сургалт' : 'CME Programs'}
          </h2>
          <p className="text-lg text-slate-600 mb-12 font-medium">
            {language === 'mn' 
              ? 'Манай нийгэмлэгээс зохион байгуулж буй тасралтгүй сургалтуудын талаарх мэдээллийг холбогдож аваарай.' 
              : 'Contact us to learn more about our continuing medical education programs.'}
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 h-16 rounded-2xl font-black uppercase transition-all">
              {language === 'mn' ? 'Холбоо барих' : 'Contact Us'}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
