import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Shield, Download, Clock, Users, Smartphone, Database, ArrowRight, Star, Zap, Lock, Globe, Award } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import EmailModal from './EmailModal';
import { FadeIn, CardReveal, SlideIn, Collapsible, StaggeredGrid, StaggeredItem } from './AnimatedComponents';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const features = [
    { icon: Clock, text: t('features.items.0'), color: 'from-blue-500 to-cyan-500' },
    { icon: Download, text: t('features.items.1'), color: 'from-purple-500 to-pink-500' },
    { icon: Shield, text: t('features.items.2'), color: 'from-green-500 to-emerald-500' },
    { icon: Download, text: t('features.items.3'), color: 'from-orange-500 to-red-500' },
    { icon: Clock, text: t('features.items.4'), color: 'from-indigo-500 to-purple-500' },
    { icon: Database, text: t('features.items.5'), color: 'from-teal-500 to-blue-500' },
    { icon: Users, text: t('features.items.6'), color: 'from-pink-500 to-rose-500' },
    { icon: Smartphone, text: t('features.items.7'), color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ShiftEnd
              </span>
            </motion.div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative w-full">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm text-white/90">Wettelijk goedgekeurd voor Belgische horeca</span>
              </div>
            </motion.div>

            <FadeIn delay={0.2}>
              <h1
                className="relative block text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-10 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-[1.1] break-words text-balance descender-fix"
              >
                {t('hero.title')}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    Start gratis proefperiode
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 border border-white/20 rounded-xl text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bekijk demo
                </motion.button>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn delay={0.8}>
              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">256-bit encryptie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">EU-gebaseerd</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">FOD-compliant</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('problem.title')}
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Stop met handmatige administratie en juridische risico's
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(t('problem.issues', { returnObjects: true }) as string[]).map((issue: string, index: number) => (
                <CardReveal key={index} delay={index * 0.1}>
                  <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-red-400 text-xl">✕</span>
                      </div>
                      <div>
                        <p className="text-white text-lg">{issue}</p>
                        <div className="mt-3 w-16 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('features.title')}
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Alles wat u nodig heeft voor wettelijke compliance
                </p>
              </div>
            </FadeIn>
            
            <StaggeredGrid>
              {features.map((feature, index) => (
                <StaggeredItem key={index}>
                  <motion.div
                    className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white text-base leading-relaxed">{feature.text}</p>
                    </div>
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </motion.div>
                </StaggeredItem>
              ))}
            </StaggeredGrid>
          </div>
        </section>

        {/* Legal Compliance Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('legal.title')}
                </h2>
                <p className="text-xl text-gray-400">
                  Volledig compliant met Belgische wetgeving
                </p>
              </div>
            </FadeIn>
            
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Collapsible
                title={t('legal.title')}
                isOpen={legalOpen}
                onToggle={() => setLegalOpen(!legalOpen)}
              >
                <ul className="space-y-4">
                  {(t('legal.requirements', { returnObjects: true }) as string[]).map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-white leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('pricing.title')}
                </h2>
                <p className="text-xl text-gray-400">
                  Eenvoudige prijzen, geen verrassingen
                </p>
              </div>
            </FadeIn>
            
            <CardReveal>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 max-w-md mx-auto overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="text-6xl font-bold text-white mb-2">
                  {t('pricing.price')}
                </div>
                <p className="text-gray-300 mb-8 text-lg">
                  {t('pricing.description')}
                </p>
                <motion.button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start gratis proefperiode
                </motion.button>
                
                <div className="mt-6 text-sm text-gray-400">
                  Geen setup • Geen verborgen kosten • 30 dagen gratis proefperiode
                </div>
              </div>
            </CardReveal>
          </div>
        </section>

        {/* FOD Validation Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SlideIn direction="up">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {t('validation.title')}
                    </h3>
                    <p className="text-green-300">
                      {t('validation.description')}
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    {t('cta.title')}
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Begin vandaag nog met wettelijke compliance
                  </p>
                  <motion.button
                    onClick={() => setIsEmailModalOpen(true)}
                    className="bg-gradient-to-r from-white to-gray-100 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:from-gray-100 hover:to-white transition-all duration-300 shadow-2xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('cta.button')}
                  </motion.button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                {t('footer.madeIn')}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <LanguageSwitcher />
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.contact')}
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage; 