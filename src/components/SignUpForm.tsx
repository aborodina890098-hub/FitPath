import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';

const formSchema = z.object({
  firstName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  goal: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  lang: Language;
}

export function SignUpForm({ lang }: SignUpFormProps) {
  const t = translations[lang].signup.form;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    alert(t.success);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-8 rounded-3xl max-w-md w-full mx-auto"
    >
      <h3 className="text-2xl font-display font-bold mb-2">{t.title}</h3>
      <p className="text-white/60 mb-6">{t.desc}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">{t.firstName}</label>
          <input
            {...register('firstName')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors"
            placeholder={t.placeholderName}
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">{t.email}</label>
          <input
            {...register('email')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors"
            placeholder={t.placeholderEmail}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">{t.goal}</label>
          <select
            {...register('goal')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors appearance-none"
          >
            <option value="Lose Weight" className="bg-[#050505]">{t.goals.lose}</option>
            <option value="Build Muscle" className="bg-[#050505]">{t.goals.muscle}</option>
            <option value="Stay Fit" className="bg-[#050505]">{t.goals.fit}</option>
            <option value="Improve Energy" className="bg-[#050505]">{t.goals.energy}</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? t.processing : t.cta}
          <ArrowRight className={cn("w-5 h-5", lang === 'ar' && "rotate-180")} />
        </button>
      </form>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
          <span>{t.noCard}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
          <span>{t.cancel}</span>
        </div>
      </div>
    </motion.div>
  );
}
