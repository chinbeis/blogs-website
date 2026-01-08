'use client'

import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const guidelines = [
  {
    id: 1,
    url: "https://moh.gov.mn/uploads/files/9311eef920163bd55b4c4443490ef4768e699431.pdf",
    titleMn: "Эмчилгээний удирдамж 1",
    titleEn: "Clinical Guideline 1"
  },
  {
    id: 2,
    url: "https://moh.gov.mn/uploads/files/34417ee9f0cca3469e215dcf97b0972068c40464.pdf",
    titleMn: "Эмчилгээний удирдамж 2",
    titleEn: "Clinical Guideline 2"
  },
  {
    id: 3,
    url: "https://moh.gov.mn/uploads/files/fe9d3567c8654a6957fe13b8927c391460b835b2.pdf",
    titleMn: "Эмчилгээний удирдамж 3",
    titleEn: "Clinical Guideline 3"
  },
  {
    id: 4,
    url: "https://moh.gov.mn/uploads/files/9311eef920163bd55b4c4443490ef4768e699431.pdf",
    titleMn: "Эмчилгээний удирдамж 4",
    titleEn: "Clinical Guideline 4"
  }
]

export function ClinicalGuidelinesSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('guidelines.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('guidelines.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guidelines.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 group border border-slate-100"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex-grow">
                  {language === 'mn' ? item.titleMn : item.titleEn}
                </h3>
                
                <div className="flex space-x-3 mt-4 w-full">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 hover:text-blue-700 text-blue-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('common.view')}
                    </Button>
                  </a>
                  <a 
                    href={item.url} 
                    download
                    className="flex-1"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      {t('guidelines.download')}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
