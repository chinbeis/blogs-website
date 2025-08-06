'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'mn' | 'en'

type TranslationKey = 
  | 'header.about' | 'header.education' | 'header.events' | 'header.news' | 'header.login' | 'header.dashboard'
  | 'hero.title' | 'hero.subtitle' | 'hero.joinSociety' | 'hero.learnMore' | 'hero.members' | 'hero.events' | 'hero.publications' | 'hero.years'
  | 'footer.quickLinks' | 'footer.resources' | 'footer.about' | 'footer.membership' | 'footer.education' | 'footer.research' | 'footer.guidelines' | 'footer.cme' | 'footer.caseReports' | 'footer.publications' | 'footer.events' | 'footer.contact' | 'footer.copyright' | 'footer.description' | 'footer.socialMedia'
  | 'news.title' | 'news.subtitle' | 'news.search' | 'news.backToNews' | 'news.browseMore' | 'news.contact' | 'news.share' | 'news.noArticles' | 'news.clearSearch' | 'news.loading' | 'news.readMore' | 'news.backToHome'
  | 'contact.title' | 'contact.subtitle' | 'contact.backToHome' | 'contact.getInTouch' | 'contact.description' | 'contact.name' | 'contact.email' | 'contact.subject' | 'contact.message' | 'contact.send' | 'contact.address' | 'contact.phone' | 'contact.hours' | 'contact.businessHours' | 'contact.thankYou' | 'contact.available'
  | 'contactSection.title' | 'contactSection.description' | 'contactSection.address' | 'contactSection.phone' | 'contactSection.email' | 'contactSection.hours' | 'contactSection.available' | 'contactSection.sendMessage'
  | 'events.title' | 'events.description' | 'events.expertSpeakers' | 'events.expertSpeakersDesc' | 'events.workshops' | 'events.workshopsDesc' | 'events.networking' | 'events.networkingDesc' | 'events.education' | 'events.educationDesc'
  | 'featured.title' | 'featured.subtitle' | 'featured.guidelines' | 'featured.guidelinesDesc' | 'featured.cme' | 'featured.cmeDesc' | 'featured.cases' | 'featured.casesDesc' | 'featured.viewAll' | 'featured.learnMore'
  | 'common.loading' | 'common.error' | 'common.retry' | 'common.close' | 'common.save' | 'common.cancel' | 'common.edit' | 'common.delete' | 'common.view'

type Translations = Record<TranslationKey, string>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const translations: Record<Language, Translations> = {
  mn: {
    // Header
    'header.about': 'Бидний тухай',
    'header.education': 'Боловсрол',
    'header.events': 'Арга хэмжээ',
    'header.news': 'Мэдээ',
    'header.login': 'Нэвтрэх',
    'header.dashboard': 'Удирдлагын самбар',
    
    // Hero Section
    'hero.title': 'Монголын зүрх, судсан дотуурх мэс заслын эмч нарын нийгэмлэг',
    'hero.subtitle': 'Монголын зүрх, судсан дотуурх мэс заслын эмч нарын нийгэмлэг нь дэвшилтэт судалгаа, боловсрол, эмнэлзүйн шилдэг ажиллагаагаар зүрхний судасны эрүүл мэндийг сайжруулахад зориулагдсан.',
    'hero.joinSociety': 'Нийгэмлэгт нэгдэх',
    'hero.learnMore': 'Дэлгэрэнгүй',
    'hero.members': 'Гишүүд',
    'hero.events': 'Арга хэмжээ',
    'hero.publications': 'Нийтлэл',
    'hero.years': 'Жилийн туршлага',
    
    // Footer
    'footer.quickLinks': 'Шуурхай холбоос',
    'footer.resources': 'Нөөц',
    'footer.about': 'MSIC-ийн тухай',
    'footer.membership': 'Гишүүнчлэл',
    'footer.education': 'Боловсрол',
    'footer.research': 'Судалгаа',
    'footer.guidelines': 'Удирдамж',
    'footer.cme': 'CME хөтөлбөр',
    'footer.caseReports': 'Тохиолдлын тайлан',
    'footer.publications': 'Нийтлэл',
    'footer.events': 'Арга хэмжээ',
    'footer.contact': 'Холбоо барих',
    'footer.copyright': '© 2024 Монголын зүрх, судсан дотуурх мэс заслын эмч нарын нийгэмлэг. Бүх эрх хуулиар хамгаалагдсан.',
    'footer.description': 'Боловсрол, судалгаа, эмнэлзүйн шилдэг ажиллагаагаар зүрхний судасны эмчилгээг дэвшүүлэхэд зориулагдсан. Монгол болон түүнээс цааш зүрхний судасны эрүүл мэндийг сайжруулах.',
    'footer.socialMedia': 'Нийгмийн сүлжээ',
    
    // News
    'news.title': 'Мэдээ ба мэдээлэл',
    'news.subtitle': 'Зүрхний судасны эмчилгээний салбарын хамгийн сүүлийн үеийн мэдээ, судалгаа, арга хэмжээний талаар мэдээлэл авах',
    'news.search': 'Мэдээ хайх...',
    'news.backToNews': 'Мэдээ рүү буцах',
    'news.browseMore': 'Илүү олон мэдээ үзэх',
    'news.contact': 'Холбоо барих',
    'news.share': 'Хуваалцах',
    'news.noArticles': 'Мэдээ олдсонгүй',
    'news.clearSearch': 'Хайлтыг цэвэрлэх',
    'news.loading': 'Ачааллаж байна...',
    'news.readMore': 'Дэлгэрэнгүй унших',
    'news.backToHome': 'Нүүр хуудас руу буцах',
    
    // Contact
    'contact.title': 'Холбоо барих',
    'contact.subtitle': 'Бидэнтэй холбогдох',
    'contact.backToHome': 'Нүүр хуудас руу буцах',
    'contact.getInTouch': 'Бидэнтэй холбогдоорой',
    'contact.description': 'Асуулт, санал хүсэлт эсвэл хамтын ажиллагааны талаар бидэнтэй холбогдоход таатай байна. Бид танд хариулахыг хүсч байна.',
    'contact.name': 'Нэр',
    'contact.email': 'И-мэйл',
    'contact.subject': 'Сэдэв',
    'contact.message': 'Мессеж',
    'contact.send': 'Илгээх',
    'contact.address': 'Хаяг',
    'contact.phone': 'Утас',
    'contact.hours': 'Ажлын цаг',
    'contact.businessHours': 'Даваа - Баасан: 9:00 - 17:00',
    'contact.thankYou': 'Таны мессежинд баярлалаа! Бид удахгүй хариулах болно.',
    'contact.available': 'Боломжтой',
    
    // Contact Section
    'contactSection.title': 'Холбоо барих',
    'contactSection.description': 'Асуулт, санал хүсэлт эсвэл хамтын ажиллагааны талаар бидэнтэй холбогдоорой',
    'contactSection.address': 'Хаяг',
    'contactSection.phone': 'Утас',
    'contactSection.email': 'И-мэйл',
    'contactSection.hours': 'Ажлын цаг',
    'contactSection.available': 'Боломжтой',
    'contactSection.sendMessage': 'Мессеж илгээх',
    
    // Events
    'events.title': 'Удахгүй болох арга хэмжээ',
    'events.description': 'Зүрхний судасны эмчилгээний хамгийн сүүлийн үеийн хурал, семинар, боловсролын арга хэмжээнүүдэд оролцоорой. Манай арга хэмжээнүүд тэргүүлэх шинжээчид, судлаачид, практик эмч нарыг нэгтгэж мэдлэг солилцож салбарыг хөгжүүлдэг.',
    'events.expertSpeakers': 'Шинжээч илтгэгчид',
    'events.expertSpeakersDesc': 'Нэр хүндтэй зүрхний эмч, салбарын удирдагч нараас суралцаарай',
    'events.workshops': 'Практик семинар',
    'events.workshopsDesc': 'Хамгийн сүүлийн үеийн техникийн практик сургалтын хичээл',
    'events.networking': 'Сүлжээний боломж',
    'events.networkingDesc': 'Мэргэжлийн хамтрагчидтай танилцаж мэргэжлийн харилцаа бий болгоорой',
    'events.education': 'Үргэлжилсэн боловсрол',
    'events.educationDesc': 'Дэвшлийн талаар мэдээлэл авч CME кредит олж аваарай',
    
    // Featured Content
    'featured.title': 'Онцлох контент',
    'featured.subtitle': 'Зүрхний судасны эмчилгээний мэдлэгээ дээшлүүлэхэд зориулсан боловсролын нөөц, тохиолдлын судалгаа, удахгүй болох арга хэмжээнүүдийг судлаарай.',
    'featured.guidelines': 'Эмчилгээний удирдамж',
    'featured.guidelinesDesc': 'Зүрхний судасны эмчилгээний хамгийн сүүлийн үеийн удирдамж, протокол',
    'featured.cme': 'CME хөтөлбөр',
    'featured.cmeDesc': 'Үргэлжилсэн эмнэлзүйн боловсролын хөтөлбөр, сургалт',
    'featured.cases': 'Тохиолдлын судалгаа',
    'featured.casesDesc': 'Бодит тохиолдлын дэлгэрэнгүй шинжилгээ, сургамж',
    'featured.viewAll': 'Бүгдийг үзэх',
    'featured.learnMore': 'Дэлгэрэнгүй',
    
    // Common
    'common.loading': 'Ачааллаж байна...',
    'common.error': 'Алдаа гарлаа',
    'common.retry': 'Дахин оролдох',
    'common.close': 'Хаах',
    'common.save': 'Хадгалах',
    'common.cancel': 'Цуцлах',
    'common.edit': 'Засах',
    'common.delete': 'Устгах',
    'common.view': 'Үзэх'
  },
  en: {
    // Header
    'header.about': 'About',
    'header.education': 'Education',
    'header.events': 'Events',
    'header.news': 'News',
    'header.login': 'Login',
    'header.dashboard': 'Dashboard',
    
    // Hero Section
    'hero.title': 'Mongolian Society of Interventional Cardiology',
    'hero.subtitle': 'The Mongolian Society of Interventional Cardiology is dedicated to improving cardiovascular health through cutting-edge research, education, and clinical excellence.',
    'hero.joinSociety': 'Join Our Society',
    'hero.learnMore': 'Learn More',
    'hero.members': 'Members',
    'hero.events': 'Events',
    'hero.publications': 'Publications',
    'hero.years': 'Years of Excellence',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.about': 'About MSIC',
    'footer.membership': 'Membership',
    'footer.education': 'Education',
    'footer.research': 'Research',
    'footer.guidelines': 'Guidelines',
    'footer.cme': 'CME Programs',
    'footer.caseReports': 'Case Reports',
    'footer.publications': 'Publications',
    'footer.events': 'Events',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 Mongolian Society of Interventional Cardiology. All rights reserved.',
    'footer.description': 'Dedicated to advancing interventional cardiology through education, research, and clinical excellence. Improving cardiovascular health across Mongolia and beyond.',
    'footer.socialMedia': 'Follow Us',
    
    // News
    'news.title': 'News & Updates',
    'news.subtitle': 'Stay informed about the latest developments, research, and events in interventional cardiology',
    'news.search': 'Search news...',
    'news.backToNews': 'Back to News',
    'news.browseMore': 'Browse More News',
    'news.contact': 'Contact Us',
    'news.share': 'Share',
    'news.noArticles': 'No articles found',
    'news.clearSearch': 'Clear Search',
    'news.loading': 'Loading...',
    'news.readMore': 'Read More',
    'news.backToHome': 'Back to Home',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in Touch',
    'contact.backToHome': 'Back to Home',
    'contact.getInTouch': 'Get in Touch',
    'contact.description': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.hours': 'Office Hours',
    'contact.businessHours': 'Monday - Friday: 9:00 AM - 5:00 PM',
    'contact.thankYou': 'Thank you for your message! We will get back to you soon.',
    'contact.available': 'Available',
    
    // Contact Section
    'contactSection.title': 'Contact Us',
    'contactSection.description': 'Get in touch with us for any questions, suggestions, or collaboration opportunities',
    'contactSection.address': 'Address',
    'contactSection.phone': 'Phone',
    'contactSection.email': 'Email',
    'contactSection.hours': 'Office Hours',
    'contactSection.available': 'Available',
    'contactSection.sendMessage': 'Send Message',
    
    // Events
    'events.title': 'Upcoming Events',
    'events.description': 'Join us for our latest conferences, workshops, and educational events in interventional cardiology. Our events bring together leading experts, researchers, and practitioners to share knowledge and advance the field.',
    'events.expertSpeakers': 'Expert Speakers',
    'events.expertSpeakersDesc': 'Learn from renowned cardiologists and industry leaders',
    'events.workshops': 'Hands-on Workshops',
    'events.workshopsDesc': 'Practical training sessions with latest techniques',
    'events.networking': 'Networking Opportunities',
    'events.networkingDesc': 'Connect with peers and build professional relationships',
    'events.education': 'Continuing Education',
    'events.educationDesc': 'Earn CME credits while staying current with advances',
    
    // Featured Content
    'featured.title': 'Featured Content',
    'featured.subtitle': 'Explore our educational resources, case studies, and upcoming events designed to advance your knowledge in interventional cardiology.',
    'featured.guidelines': 'Clinical Guidelines',
    'featured.guidelinesDesc': 'Latest evidence-based guidelines and protocols for interventional cardiology',
    'featured.cme': 'CME Programs',
    'featured.cmeDesc': 'Continuing medical education programs and accredited courses',
    'featured.cases': 'Case Studies',
    'featured.casesDesc': 'Real-world case analyses and learning opportunities',
    'featured.viewAll': 'View All',
    'featured.learnMore': 'Learn More',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('mn') // Mongolian as primary
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}