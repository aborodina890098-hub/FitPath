import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { 
  Dumbbell, 
  Brain, 
  Zap, 
  LineChart, 
  Utensils, 
  ChevronDown, 
  MessageCircle, 
  Star,
  CheckCircle2,
  Menu,
  X,
  Languages
} from 'lucide-react';
import { Scene } from './components/HeroScene';
import { SignUpForm } from './components/SignUpForm';
import { cn } from './lib/utils';
import { Language, translations } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'how-it-works' | 'info'>('home');
  const [activeInfoKey, setActiveInfoKey] = useState<keyof typeof t.infoPages | null>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const scrollToForm = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInfoPage = (key: keyof typeof t.infoPages) => {
    setActiveInfoKey(key);
    setCurrentView('info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const benefits = [
    {
      key: 'features' as const,
      title: t.benefits.items[0].title,
      description: t.benefits.items[0].description,
      icon: Dumbbell,
      color: "text-brand-primary"
    },
    {
      key: 'coach' as const,
      title: t.benefits.items[1].title,
      description: t.benefits.items[1].description,
      icon: Brain,
      color: "text-brand-secondary"
    },
    {
      key: 'nutrition' as const,
      title: t.benefits.items[2].title,
      description: t.benefits.items[2].description,
      icon: Utensils,
      color: "text-brand-accent"
    }
  ];

  const differentiators = [
    {
      key: 'features' as const,
      title: t.features.items[0].title,
      description: t.features.items[0].description,
      icon: Zap
    },
    {
      key: 'features' as const,
      title: t.features.items[1].title,
      description: t.features.items[1].description,
      icon: LineChart
    },
    {
      key: 'features' as const,
      title: t.features.items[2].title,
      description: t.features.items[2].description,
      icon: CheckCircle2
    }
  ];

  const testimonialList = [
    {
      name: t.testimonials.items[0].name,
      role: t.testimonials.items[0].role,
      content: t.testimonials.items[0].content,
      rating: 5
    },
    {
      name: t.testimonials.items[1].name,
      role: t.testimonials.items[1].role,
      content: t.testimonials.items[1].content,
      rating: 5
    },
    {
      name: t.testimonials.items[2].name,
      role: t.testimonials.items[2].role,
      content: t.testimonials.items[2].content,
      rating: 5
    }
  ];

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/10 to-transparent opacity-50" />
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter"
          >
            {t.hero.title} <br />
            <span className="text-gradient">{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={scrollToForm} className="btn-primary w-full sm:w-auto">{t.hero.ctaPrimary}</button>
            <button onClick={() => setCurrentView('how-it-works')} className="btn-secondary w-full sm:w-auto">{t.hero.ctaSecondary}</button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.benefits.title}</h2>
            <p className="text-white/60">{t.benefits.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl group hover:border-brand-primary/50 transition-colors cursor-pointer"
                onClick={() => handleInfoPage(benefit.key)}
              >
                <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", benefit.color)}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Differentiators */}
      <section id="features" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">{t.features.title} <span className="text-brand-secondary">{t.features.titleAccent}</span></h2>
            <div className="space-y-8">
              {differentiators.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 cursor-pointer group"
                  onClick={() => handleInfoPage(item.key)}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                    <item.icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-secondary/20 blur-3xl rounded-full" />
            <div className="glass aspect-square rounded-3xl flex items-center justify-center p-12 relative overflow-hidden">
              <div className="text-center">
                <div className="text-6xl font-display font-bold text-brand-primary mb-2">{t.features.statValue}</div>
                <div className="text-white/60 uppercase tracking-widest text-xs font-bold">{t.features.statLabel}</div>
                <div className="mt-8 space-y-4">
                  <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      className="h-full bg-brand-secondary" 
                    />
                  </div>
                  <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      className="h-full bg-brand-primary" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.testimonials.title}</h2>
            <p className="text-white/60">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialList.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                <p className="text-lg italic mb-8 text-white/80">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center font-bold text-brand-secondary">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="signup" className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {t.signup.title} <span className="text-gradient">{t.signup.titleAccent}</span> {t.signup.titleEnd}
            </h2>
            <p className="text-xl text-white/60 mb-8">{t.signup.subtitle}</p>
            <ul className="space-y-4">
              {t.signup.points.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="text-brand-primary w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <SignUpForm lang={lang} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">{t.faq.title}</h2>
          <div className="space-y-4">
            {t.faq.items.map((faq, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold">{faq.q}</span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", activeFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-white/60 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderHowItWorks = () => (
    <section className="pt-32 pb-20 px-6 md:px-12 min-h-screen max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">{t.howItWorks.title}</h2>
        <p className="text-xl text-white/60">{t.howItWorks.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {t.howItWorks.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="text-8xl font-display font-bold text-white/5 absolute -top-4 -right-4">{i + 1}</div>
            <h3 className="text-xl font-bold mb-4 relative z-10">{step.title}</h3>
            <p className="text-white/60 relative z-10">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[40px] border-brand-primary/20 bg-brand-primary/5 mb-12"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-24 h-24 rounded-3xl bg-brand-primary flex items-center justify-center flex-shrink-0">
            <Brain className="w-12 h-12 text-black" />
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold mb-4">{t.howItWorks.aiRole.title}</h3>
            <p className="text-lg text-white/70 leading-relaxed">{t.howItWorks.aiRole.desc}</p>
          </div>
        </div>
      </motion.div>

      <div className="text-center">
        <button onClick={() => setCurrentView('home')} className="btn-secondary">{t.howItWorks.back}</button>
      </div>
    </section>
  );

  const renderInfoPage = () => {
    if (!activeInfoKey) return null;
    const info = t.infoPages[activeInfoKey];

    return (
      <section className="pt-32 pb-20 px-6 md:px-12 min-h-screen max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">{info.title}</h2>
          <div className="glass p-8 md:p-12 rounded-3xl space-y-6 text-white/70 leading-relaxed">
            <p>{info.content}</p>
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-white font-bold mb-4">
                {lang === 'en' ? 'Why choose FitPath?' : 'لماذا تختار فيت باث؟'}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  <span>{lang === 'en' ? 'Adaptive AI Technology' : 'تقنية الذكاء الاصطناعي التكيفية'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  <span>{lang === 'en' ? 'Science-backed methodology' : 'منهجية مدعومة بالعلم'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  <span>{lang === 'en' ? '24/7 Support and Guidance' : 'دعم وإرشاد على مدار الساعة'}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => setCurrentView('home')} className="btn-secondary">{t.howItWorks.back}</button>
          </div>
        </motion.div>
      </section>
    );
  };

  return (
    <div className={cn("relative min-h-screen overflow-x-hidden", lang === 'ar' && "font-sans")}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter">FitPath</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand-primary transition-colors">{t.nav.benefits}</button>
          <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand-primary transition-colors">{t.nav.features}</button>
          <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-brand-primary transition-colors">{t.nav.testimonials}</button>
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 hover:text-brand-primary transition-colors px-3 py-1 rounded-full border border-white/10"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button onClick={scrollToForm} className="btn-primary py-2 px-6 text-sm">{t.nav.cta}</button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 text-white/70 hover:text-brand-primary transition-colors px-2 py-1 rounded-full border border-white/10 text-xs"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 flex flex-col gap-6"
          >
            <button onClick={() => { setIsMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-2xl font-display text-left">{t.nav.benefits}</button>
            <button onClick={() => { setIsMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-2xl font-display text-left">{t.nav.features}</button>
            <button onClick={() => { setIsMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-2xl font-display text-left">{t.nav.testimonials}</button>
            <button onClick={() => { setIsMenuOpen(false); scrollToForm(); }} className="btn-primary w-full">{t.nav.cta}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {currentView === 'home' && renderHome()}
        {currentView === 'how-it-works' && renderHowItWorks()}
        {currentView === 'info' && renderInfoPage()}
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Zap className="text-black w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">FitPath</span>
            </div>
            <p className="text-white/40 max-w-sm mb-6">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4">
              <a href={`https://wa.me/${t.footer.phone}`} className="flex items-center gap-2 text-brand-primary hover:underline">
                <MessageCircle className="w-5 h-5" />
                <span>{t.footer.phone}</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t.footer.product}</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => handleInfoPage('features')} className="hover:text-white transition-colors">{t.footer.links.features}</button></li>
              <li><button onClick={() => handleInfoPage('pricing')} className="hover:text-white transition-colors">{t.footer.links.pricing}</button></li>
              <li><button onClick={() => handleInfoPage('coach')} className="hover:text-white transition-colors">{t.footer.links.coach}</button></li>
              <li><button onClick={() => handleInfoPage('nutrition')} className="hover:text-white transition-colors">{t.footer.links.nutrition}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t.footer.company}</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><button onClick={() => handleInfoPage('about')} className="hover:text-white transition-colors">{t.footer.links.about}</button></li>
              <li><button onClick={() => handleInfoPage('privacy')} className="hover:text-white transition-colors">{t.footer.links.privacy}</button></li>
              <li><button onClick={() => handleInfoPage('terms')} className="hover:text-white transition-colors">{t.footer.links.terms}</button></li>
              <li><button onClick={() => handleInfoPage('contact')} className="hover:text-white transition-colors">{t.footer.links.contact}</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center text-xs text-white/20">
          © {new Date().getFullYear()} FitPath AI. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
