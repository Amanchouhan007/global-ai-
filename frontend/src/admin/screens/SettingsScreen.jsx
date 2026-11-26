import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
  Globe,
  Save,
  RotateCcw,
  AlertTriangle,
  Upload,
  Clock,
  Database
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { useLanguage } from '../../context/LanguageContext';

export default function SettingsScreen({ navigateTo, showToast }) {
  const { t } = useLanguage();
  const { settings, updateSettings, resetToDefaultDemo } = useAdminStore();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'profile' | 'security' | 'notifications' | 'system'

  // Forms
  const [generalForm, setGeneralForm] = useState({ ...settings.general });
  const [profileForm, setProfileForm] = useState({ ...settings.profile });
  const [securityForm, setSecurityForm] = useState({ ...settings.security });
  const [notifForm, setNotifForm] = useState({ ...settings.notifications });
  const [systemForm, setSystemForm] = useState({ ...settings.systemLimits });

  // Password Change
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    updateSettings('general', generalForm);
    showToast('General platform settings updated.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSettings('profile', profileForm);
    showToast('Admin Profile updated successfully.');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.newPass) {
      alert('Please fill out all password fields.');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert('New password and confirm password do not match.');
      return;
    }
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    showToast('Admin password changed successfully. Secure session refreshed.');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    updateSettings('security', securityForm);
    showToast('Security policies & session limits updated.');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    updateSettings('notifications', notifForm);
    showToast('Notification preferences saved.');
  };

  const handleSaveSystem = (e) => {
    e.preventDefault();
    updateSettings('systemLimits', systemForm);
    showToast('System configuration & indexing limits saved.');
  };

  const handleResetDemo = () => {
    const confirm = window.confirm('Reset all demo documents, settings and users to factory baseline?');
    if (confirm) {
      resetToDefaultDemo();
      showToast('Knowledge Base reset to initial clinical baseline.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0F1C36] rounded-2xl p-6 border border-emerald-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0D5C3A] dark:text-emerald-400" />
            <span>{t('admin', 'settingsTitle', 'Platform Settings & Administration')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium mt-1">
            {t('admin', 'settingsSubtitle', 'Configure enterprise healthcare parameters, administrator profile, session security, and indexing thresholds.')}
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* INTERNAL TABS: EXACTLY 5 TABS */}
      <div className="bg-white dark:bg-[#0F1C36] rounded-2xl border border-emerald-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-emerald-200/80 dark:border-slate-800 overflow-x-auto bg-[#F4F9F6]/60 dark:bg-[#080D1A] text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'border-[#0D5C3A] text-[#0D5C3A] dark:text-emerald-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{t('admin', 'tabGeneral', 'General Settings')}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#0D5C3A] text-[#0D5C3A] dark:text-emerald-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('admin', 'tabProfile', 'Admin Profile')}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#0D5C3A] text-[#0D5C3A] dark:text-emerald-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t('admin', 'tabSecurity', 'Security & Session')}</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'border-[#0D5C3A] text-[#0D5C3A] dark:text-emerald-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{t('admin', 'tabNotifications', 'Notifications')}</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'system'
                ? 'border-[#0D5C3A] text-[#0D5C3A] dark:text-emerald-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#0A4D30] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{t('admin', 'tabSystem', 'System Limits')}</span>
          </button>
        </div>

        {/* TAB 1: GENERAL SETTINGS */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneral} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('admin', 'brandingTitle', 'Branding & Internationalization')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                {t('admin', 'brandingSubtitle', 'Application identity and clinical default localization.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'appNameLabel', 'Application Name')}
                </label>
                <input
                  type="text"
                  value={generalForm.appName}
                  onChange={(e) => setGeneralForm({ ...generalForm, appName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'clinicalTaglineLabel', 'Clinical Tagline')}
                </label>
                <input
                  type="text"
                  value={generalForm.tagline}
                  onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'defaultLangLabel', 'Default Clinical Language')}
                </label>
                <select
                  value={generalForm.defaultLanguage}
                  onChange={(e) => setGeneralForm({ ...generalForm, defaultLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium"
                >
                  <option value="English" className="dark:bg-[#0B132B] dark:text-white">English</option>
                  <option value="Hindi" className="dark:bg-[#0B132B] dark:text-white">Hindi (हिंदी)</option>
                  <option value="Marathi" className="dark:bg-[#0B132B] dark:text-white">Marathi (मराठी)</option>
                  <option value="Spanish" className="dark:bg-[#0B132B] dark:text-white">Spanish (Español)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'platformTimezoneLabel', 'Platform Timezone')}
                </label>
                <input
                  type="text"
                  value={generalForm.timezone}
                  onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A4D30] dark:hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-900/15"
              >
                {t('admin', 'saveGeneralBtn', 'Save General Settings')}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: ADMIN PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 sm:p-8 space-y-8 text-xs sm:text-sm">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {t('admin', 'adminCredsTitle', 'Administrator Credentials')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                  {t('admin', 'adminCredsSubtitle', 'Personal profile and verified clinical contact.')}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0D5C3A] dark:bg-emerald-700 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  {profileForm.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{profileForm.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300 font-medium">{profileForm.role}</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">● {t('admin', 'verifiedAdminBadge', 'Verified Administrator')}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                    {t('admin', 'colUserName', 'Full Name')}
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                    {t('admin', 'colEmail', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none font-medium focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A4D30] dark:hover:bg-emerald-700 shadow-sm shadow-emerald-900/15"
                >
                  {t('admin', 'updateProfileBtn', 'Update Profile')}
                </button>
              </div>
            </form>

            {/* Change Password Sub-form */}
            <form onSubmit={handleChangePassword} className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="font-black text-slate-900 dark:text-white text-sm">
                {t('admin', 'changePasswordTitle', 'Change Admin Password')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1.5">
                    {t('admin', 'currentPasswordLabel', 'Current Password')}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1.5">
                    {t('admin', 'newPasswordLabel', 'New Password')}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1.5">
                    {t('admin', 'confirmPasswordLabel', 'Confirm New Password')}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs hover:bg-black dark:hover:bg-slate-600 transition-colors"
                >
                  {t('admin', 'changePasswordBtn', 'Change Password')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SECURITY & SESSION */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('admin', 'securityPoliciesTitle', 'Security, 2FA & Session Policies')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                {t('admin', 'securityPoliciesSubtitle', 'Protect administrative access and patient confidentiality.')}
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F9F6] dark:bg-[#0B132B] border border-emerald-200/70 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityForm.twoFactorAuth}
                  onChange={(e) => setSecurityForm({ ...securityForm, twoFactorAuth: e.target.checked })}
                  className="w-4 h-4 accent-[#0D5C3A] mt-0.5"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {t('admin', 'twoFactorAuthLabel', 'Two-Factor Authentication (2FA) for Admins')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-300">
                    {t('admin', 'twoFactorAuthDesc', 'Requires authenticator app code on every admin login.')}
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F9F6] dark:bg-[#0B132B] border border-emerald-200/70 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityForm.enforceStrongPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, enforceStrongPassword: e.target.checked })}
                  className="w-4 h-4 accent-[#0D5C3A] mt-0.5"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {t('admin', 'enforcePasswordStandard', 'Enforce Complex Password Standard')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-300">
                    {t('admin', 'enforcePasswordDesc', 'Requires 12+ characters, symbols, numbers, and mixed case.')}
                  </div>
                </div>
              </label>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1.5">
                    {t('admin', 'sessionTimeoutLabel', 'Session Idle Timeout (Minutes)')}
                  </label>
                  <input
                    type="number"
                    value={securityForm.sessionTimeoutMins}
                    onChange={(e) => setSecurityForm({ ...securityForm, sessionTimeoutMins: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#080D1A] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1.5">
                    {t('admin', 'passwordExpLabel', 'Password Expiration (Days)')}
                  </label>
                  <input
                    type="number"
                    value={securityForm.passwordExpirationDays}
                    onChange={(e) => setSecurityForm({ ...securityForm, passwordExpirationDays: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#080D1A] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A4D30] dark:hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-900/15"
              >
                {t('admin', 'saveSecurityPoliciesBtn', 'Save Security Policies')}
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSaveNotifications} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('admin', 'alertsTitle', 'Alerts & System Notifications')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                {t('admin', 'alertsSubtitle', 'Control notifications for vector indexing, error alerts, and signups.')}
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {t('admin', 'docProcessingAlerts', 'Document Processing & Indexing Alerts')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-300">
                    {t('admin', 'docProcessingAlertsDesc', 'Notifies when document chunking and vector indexing complete.')}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.documentProcessingAlerts}
                  onChange={(e) => setNotifForm({ ...notifForm, documentProcessingAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#0D5C3A]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {t('admin', 'systemHealthAlerts', 'System Health & Latency Warnings')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-300">
                    {t('admin', 'systemHealthAlertsDesc', 'Alerts when LLM latency exceeds 500 ms or connection degrades.')}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.aiLatencySpikes}
                  onChange={(e) => setNotifForm({ ...notifForm, aiLatencySpikes: e.target.checked })}
                  className="w-4 h-4 accent-[#0D5C3A]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {t('admin', 'userRegAlerts', 'User Registration Alerts')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-300">
                    {t('admin', 'userRegAlertsDesc', 'Notifies when new consumer or practitioner accounts register.')}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.newUserRegistrations}
                  onChange={(e) => setNotifForm({ ...notifForm, newUserRegistrations: e.target.checked })}
                  className="w-4 h-4 accent-[#0D5C3A]"
                />
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A4D30] dark:hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-900/15"
              >
                {t('admin', 'saveNotificationsBtn', 'Save Notifications')}
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: SYSTEM LIMITS */}
        {activeTab === 'system' && (
          <form onSubmit={handleSaveSystem} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('admin', 'systemLimitsTitle', 'System Limits & Processing Preferences')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                {t('admin', 'systemLimitsSubtitle', 'Fine-tune chunk boundaries and upload file constraints.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'maxFileSizeLabel', 'Max Document File Size (MB)')}
                </label>
                <input
                  type="number"
                  value={systemForm.maxFileSizeMB}
                  onChange={(e) => setSystemForm({ ...systemForm, maxFileSizeMB: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'chunkSizeLabel', 'Chunk Size (Tokens)')}
                </label>
                <input
                  type="number"
                  value={systemForm.chunkSizeTokens}
                  onChange={(e) => setSystemForm({ ...systemForm, chunkSizeTokens: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'chunkOverlapLabel', 'Chunk Overlap (Tokens)')}
                </label>
                <input
                  type="number"
                  value={systemForm.chunkOverlapTokens}
                  onChange={(e) => setSystemForm({ ...systemForm, chunkOverlapTokens: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none focus:border-[#0D5C3A] dark:focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-2">
                  {t('admin', 'maintenanceModeLabel', 'Maintenance Mode')}
                </label>
                <select
                  value={systemForm.maintenanceMode ? 'true' : 'false'}
                  onChange={(e) => setSystemForm({ ...systemForm, maintenanceMode: e.target.value === 'true' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200/80 dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none"
                >
                  <option value="false" className="dark:bg-[#0B132B] dark:text-white">
                    {t('admin', 'maintDisabled', 'Disabled (Normal Operations)')}
                  </option>
                  <option value="true" className="dark:bg-[#0B132B] dark:text-white">
                    {t('admin', 'maintEnabled', 'Enabled (Read-Only Mode)')}
                  </option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A4D30] dark:hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-900/15"
              >
                {t('admin', 'saveSystemLimitsBtn', 'Save System Limits')}
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
