import React, { useState, useEffect } from 'react';
import { X, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import { userPortalStorage } from '../../services/userPortalStorage';
import { useLanguage } from '../../context/LanguageContext';

export default function ProfileSettingsModal({ user, onClose, onLogout }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const [profile, setProfile] = useState(() => userPortalStorage.getProfile(user?.email));
  const [name, setName] = useState(profile.fullName || 'Clinical Patient');
  const [phone, setPhone] = useState(profile.emergencyContact || '+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...profile, fullName: name, emergencyContact: phone };
    setProfile(updated);
    userPortalStorage.saveProfile(user?.email, updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (currentPass !== '12345678') {
      setPassMsg('Current password must match demo credentials (12345678).');
      return;
    }
    if (newPass.length < 6) {
      setPassMsg('New password must be at least 6 characters.');
      return;
    }
    setPassMsg('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#0F1C36] text-slate-800 dark:text-slate-100 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-bold border border-slate-200 dark:border-slate-700">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('profileModal', 'title') || 'Profile & Settings'}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{user?.email || 'user@gmail.com'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('profileModal', 'savedSuccess') || 'Profile saved successfully.'}</span>
          </div>
        )}

        {/* Basic Details Form */}
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              {t('profileModal', 'fullName') || 'Full Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              {t('profileModal', 'emergencyContact') || 'Emergency Contact Number'}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          <div className="pt-1 flex justify-end">
            <button
              type="submit"
              className="py-1.5 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              {t('profileModal', 'saveBtn') || 'Save Profile'}
            </button>
          </div>
        </form>

        {/* Change Password */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('profileModal', 'securityTitle') || 'Security (Demo)'}</span>
          </div>

          {passMsg && (
            <div className={`p-2 rounded-lg text-xs font-medium ${passMsg.includes('success') ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300'}`}>
              {passMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-2 text-xs">
            <input
              type="password"
              placeholder={t('profileModal', 'currentPassPlaceholder') || 'Current Password (Demo: 12345678)'}
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <input
              type="password"
              placeholder={t('profileModal', 'newPassPlaceholder') || 'New Password'}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
            >
              {t('profileModal', 'updatePassBtn') || 'Update Password'}
            </button>
          </form>
        </div>

        {/* Sign Out Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('profileModal', 'signOutBtn') || 'Sign Out of GlobalHealthAI'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
