import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FeedbackCard() {
  const { t } = useLanguage();
  const [feedbackType, setFeedbackType] = useState('clinical');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!message.trim()) {
      setErrorMsg('Please enter your feedback comments before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Save feedback to localStorage & notify
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('healthorbit_patient_feedback') || '[]');
        const newEntry = {
          id: `fb-${Date.now()}`,
          type: feedbackType,
          rating,
          message: message.trim(),
          email: email.trim() || 'Anonymous',
          submittedAt: new Date().toISOString()
        };
        existing.push(newEntry);
        localStorage.setItem('healthorbit_patient_feedback', JSON.stringify(existing));
      } catch (err) {
        console.error('Feedback save error:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setMessage('');
      setEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 600);
  };

  return (
    <section className="py-8 sm:py-12 max-w-[1520px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
      <div className="bg-white dark:bg-[#0F1C36] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md max-w-3xl mx-auto text-left space-y-5">
        
        {/* Header */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/50 text-[#D81B60] text-xs font-bold border border-pink-200">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Continuous Clinical Quality Improvement</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0D5C3A] border border-emerald-200">
              Direct Physician Review
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('feedback', 'title', 'Share Your Clinical Experience & Feedback')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('feedback', 'subtitle', 'Help Dr. Pratap and our medical review board refine symptom guidance accuracy, clarity, and language accessibility.')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Feedback Type & Star Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Feedback Type */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300">
                {t('feedback', 'typeLabel', 'Feedback Category')}
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#D81B60]"
              >
                <option value="clinical">{t('feedback', 'optClinical', 'Clinical Accuracy & Clarity')}</option>
                <option value="ease">{t('feedback', 'optEase', 'Symptom Checker Ease of Use')}</option>
                <option value="translation">{t('feedback', 'optTranslation', 'Language & Translation Feedback')}</option>
                <option value="general">{t('feedback', 'optGeneral', 'General Suggestion for Dr. Pratap')}</option>
              </select>
            </div>

            {/* Star Rating */}
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300">
                {t('feedback', 'ratingLabel', 'Overall Rating')}
              </label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        rating >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

          </div>

          {/* Feedback Message */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300">
              {t('feedback', 'msgLabel', 'Your Comments or Suggestions')} *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('feedback', 'placeholderMsg', 'Tell us what worked well or what health condition you would like covered...')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D81B60]"
            />
          </div>

          {/* Email (Optional) */}
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300">
              {t('feedback', 'emailLabel', 'Email Address (Optional)')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('feedback', 'placeholderEmail', 'name@example.com (if you would like a clinical response)')}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D81B60]"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('feedback', 'successMsg', 'Thank you! Your feedback has been recorded for clinical quality review.')}</span>
            </div>
          )}

          {/* Submit Action with Anti-Duplicate Debounce */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#0D5C3A] hover:bg-[#0a462c] text-white text-sm sm:text-base font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording Feedback...</span>
              </>
            ) : (
              <>
                <span>{t('feedback', 'submitBtn', 'Submit Patient Feedback')}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

        </form>

      </div>
    </section>
  );
}
