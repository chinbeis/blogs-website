'use client'

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, ArrowLeft, Search, BookOpen, Heart, Activity, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const guidelines = [
  {
    id: 1,
    url: "https://moh.gov.mn/uploads/files/9311eef920163bd55b4c4443490ef4768e699431.pdf",
    titleMn: "Эмчилгээний удирдамж 1",
    subtitleMn: "Зүрхний архаг ишеми өвчин",
    titleEn: "Clinical Guideline 1",
    subtitleEn: "Chronic Ischemic Heart Disease",
    icon: <Activity className="w-8 h-8" />,
    color: "blue"
  },
  {
    id: 2,
    url: "https://moh.gov.mn/uploads/files/34417ee9f0cca3469e215dcf97b0972068c40464.pdf",
    titleMn: "Эмчилгээний удирдамж 2",
    subtitleMn: "Зүрхний шигдээс",
    titleEn: "Clinical Guideline 2",
    subtitleEn: "Myocardial Infarction",
    icon: <Heart className="w-8 h-8" />,
    color: "red"
  },
  {
    id: 3,
    url: "https://moh.gov.mn/uploads/files/fe9d3567c8654a6957fe13b8927c391460b835b2.pdf",
    titleMn: "Эмчилгээний удирдамж 3",
    subtitleMn: "Дислипидеми",
    titleEn: "Clinical Guideline 3",
    subtitleEn: "Dyslipidemia",
    icon: <Activity className="w-8 h-8" />,
    color: "emerald"
  }
]

export default function GuidelinesPage() {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGuidelines = guidelines.filter(item => {
    const title = language === 'mn' ? item.titleMn : item.titleEn
    const subtitle = language === 'mn' ? item.subtitleMn : item.subtitleEn
    return title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>{language === 'mn' ? 'Эмнэлгийн зааварчилгаа' : 'Clinical Standards'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
            {t('guidelines.title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('guidelines.subtitle')}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-blue-50/50 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'mn' ? "Удирдамж хайх..." : "Search clinical guidelines..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-blue-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGuidelines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuidelines.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-5 transition-transform duration-700 group-hover:scale-150 ${
                    item.color === 'blue' ? 'bg-blue-600' :
                    item.color === 'red' ? 'bg-red-600' :
                    'bg-emerald-600'
                  }`}></div>

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${
                    item.color === 'blue' ? 'bg-blue-600 text-white shadow-blue-600/30' :
                    item.color === 'red' ? 'bg-red-600 text-white shadow-red-600/30' :
                    'bg-emerald-600 text-white shadow-emerald-600/30'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {language === 'mn' ? item.titleMn : item.titleEn}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                      {language === 'mn' ? item.subtitleMn : item.subtitleEn}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 h-12 font-bold transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('common.view')}
                      </Button>
                    </a>
                    <a 
                      href={item.url} 
                      download
                      className="block"
                    >
                      <Button className="w-full rounded-xl bg-slate-900 hover:bg-black text-white h-12 font-bold shadow-lg transition-all">
                        <Download className="w-4 h-4 mr-2" />
                        {t('guidelines.download')}
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6">
                <BookOpen className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Удирдамж олдсонгүй</h3>
              <p className="text-slate-500 text-lg">Таны хайсан түлхүүр үгэнд тохирох удирдамж байхгүй байна.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-24 bg-blue-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-500/10 rounded-full -ml-30 -mb-30 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Асууж тодруулах зүйл байна уу?</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
                Эмчилгээний удирдамжтай холбоотой болон бусад асуудлаар бидэнтэй холбогдоно уу.
              </p>
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-7 rounded-2xl text-xl font-extrabold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Холбоо барих
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
