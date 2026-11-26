import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Key,
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Mail,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { useLanguage } from '../../context/LanguageContext';

export default function UserManagementScreen({ navigateTo, showToast }) {
  const { users, addUser, updateUser, deleteUser, toggleUserStatus, resetUserPassword } = useAdminStore();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [passwordResetUser, setPasswordResetUser] = useState(null);

  // Form State for Add User
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    role: 'User', // STRICTLY: 'Admin' or 'User' only!
    password: ''
  });

  // User Statistics calculation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const recentlyRegistered = users.filter(u => {
    // Registered in last 30 days
    const reg = new Date(u.registeredDate);
    const diffDays = (new Date() - reg) / (1000 * 60 * 60 * 24);
    return diffDays <= 45;
  }).length;

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        searchQuery === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.email.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    addUser({
      name: addForm.name,
      email: addForm.email,
      role: addForm.role
    });
    setShowAddModal(false);
    setAddForm({ name: '', email: '', role: 'User', password: '' });
    showToast('New user successfully added.');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role
    });
    setEditingUser(null);
    showToast('User profile updated successfully.');
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id);
    setUserToDelete(null);
    showToast('User account removed.');
  };

  const handleConfirmPasswordReset = () => {
    if (!passwordResetUser) return;
    resetUserPassword(passwordResetUser.id);
    setPasswordResetUser(null);
    showToast(`Password reset link dispatched to ${passwordResetUser.email}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-[#D6E6FA] dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1677E8]" />
            <span>{t('admin', 'userMgmtTitle', 'User Management & Access Control')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            {t('admin', 'userMgmtSubtitle', 'Manage authenticated users. System strictly enforces two roles: Admin and User.')}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-black text-xs transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4 stroke-[2.2]" />
          <span>{t('admin', 'addNewUser', 'Add New User')}</span>
        </button>
      </div>

      {/* USER STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-[#D6E6FA] dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {t('admin', 'totalUsers', 'Total Users')}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B] dark:text-white">{totalUsers}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {t('admin', 'registeredAccounts', 'Registered accounts')}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-[#D6E6FA] dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {t('admin', 'activeUsers', 'Active Users')}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{activeUsers}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {t('admin', 'eligibleToSignIn', 'Eligible to sign in')}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-[#D6E6FA] dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {t('admin', 'inactiveUsers', 'Inactive Users')}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-400">{inactiveUsers}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {t('admin', 'accessSuspended', 'Access suspended')}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-[#D6E6FA] dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            {t('admin', 'recentlyRegistered', 'Recently Registered')}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#F04B0A]">{recentlyRegistered}</div>
          <div className="text-[11px] text-[#F04B0A] font-semibold mt-1">
            {t('admin', 'last45Days', 'Last 45 days')}
          </div>
        </div>
      </div>

      {/* SEARCH & ROLE FILTER BAR */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-[#D6E6FA] dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('admin', 'searchUserPlaceholder', 'Search users by full name or email address...')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0F1C36] text-slate-800 dark:text-white focus:border-[#1677E8] outline-none text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 text-xs">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0F1C36] outline-none"
          >
            <option value="All">{t('admin', 'allRoles', 'All Roles')}</option>
            <option value="Admin">{t('admin', 'adminRole', 'Admin')}</option>
            <option value="User">{t('admin', 'userRole', 'User')}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0F1C36] outline-none"
          >
            <option value="All">{t('admin', 'allUserStatuses', 'All Statuses')}</option>
            <option value="Active">{t('admin', 'activeStatus', 'Active')}</option>
            <option value="Inactive">{t('admin', 'inactiveStatus', 'Inactive')}</option>
          </select>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl border border-[#D6E6FA] dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F2F7FF] dark:bg-[#0F1C36] border-b border-[#D6E6FA] dark:border-slate-800 text-[11px] font-black text-[#08165B] dark:text-slate-200 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">{t('admin', 'colUserName', 'User Name')}</th>
                <th className="py-3.5 px-4">{t('admin', 'colEmail', 'Email')}</th>
                <th className="py-3.5 px-3">{t('admin', 'colRole', 'Role')}</th>
                <th className="py-3.5 px-3">{t('admin', 'colStatus', 'Status')}</th>
                <th className="py-3.5 px-4">{t('admin', 'colRegisteredDate', 'Registered Date')}</th>
                <th className="py-3.5 px-4">{t('admin', 'colLastLogin', 'Last Login')}</th>
                <th className="py-3.5 px-4 text-right">{t('admin', 'colActions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    {t('admin', 'noUsersMatch', 'No users match your filter criteria.')}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/40 transition-colors">
                    
                    {/* User Name + Avatar */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                          user.role === 'Admin' ? 'bg-[#08165B] text-white' : 'bg-blue-100 text-[#1677E8]'
                        }`}>
                          {user.avatar}
                        </div>
                        <div className="font-bold text-[#08165B] truncate">{user.name}</div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {user.email}
                    </td>

                    {/* Role: Strictly Admin or User */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}>
                        {user.role === 'Admin' ? t('admin', 'adminRole', 'Admin') : t('admin', 'userRole', 'User')}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          user.status === 'Active'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                        title={t('admin', 'toggleStatusTip', 'Click to toggle account status')}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        <span>{user.status === 'Active' ? t('admin', 'activeStatus', 'Active') : t('admin', 'inactiveStatus', 'Inactive')}</span>
                      </button>
                    </td>

                    {/* Registered Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {user.registeredDate}
                    </td>

                    {/* Last Login */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {user.lastLogin}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingUser(user)}
                          title={t('admin', 'editUserTip', 'Edit User')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1677E8] hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setPasswordResetUser(user)}
                          title={t('admin', 'resetPasswordTip', 'Reset Password')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Key className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setUserToDelete(user)}
                          title={t('admin', 'deleteUserTip', 'Delete User')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD USER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#D6E6FA] dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-[#08165B] dark:text-white">
                {t('admin', 'addUserModalTitle', 'Create New User Account')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'fullNameLabel', 'Full Name')} *
                </label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder={t('admin', 'doctorNamePlaceholder', 'e.g. Dr. Emily Watson')}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'emailLabel', 'Email Address')} *
                </label>
                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder={t('admin', 'emailPlaceholder', 'e.g. emily.watson@hospital.org')}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'roleLabel', 'System Role')} *
                </label>
                <select
                  value={addForm.role}
                  onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0B132B] outline-none text-xs"
                >
                  <option value="User" className="dark:bg-[#0B132B] dark:text-white">{t('admin', 'userRole', 'User')}</option>
                  <option value="Admin" className="dark:bg-[#0B132B] dark:text-white">{t('admin', 'adminRole', 'Admin')}</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  {t('admin', 'cancelBtn', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1677E8] text-white font-bold hover:bg-[#08165B] dark:hover:bg-blue-600 cursor-pointer"
                >
                  {t('admin', 'saveUserBtn', 'Save User Account')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#D6E6FA] dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-[#08165B] dark:text-white">
                {t('admin', 'editUserModalTitle', 'Edit User Details')}
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'fullNameLabel', 'Full Name')}
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'emailLabel', 'Email Address')}
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">
                  {t('admin', 'roleLabel', 'System Role')}
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0B132B] outline-none text-xs"
                >
                  <option value="User" className="dark:bg-[#0B132B] dark:text-white">{t('admin', 'userRole', 'User')}</option>
                  <option value="Admin" className="dark:bg-[#0B132B] dark:text-white">{t('admin', 'adminRole', 'Admin')}</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  {t('admin', 'cancelBtn', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1677E8] text-white font-bold hover:bg-[#08165B] dark:hover:bg-blue-600 cursor-pointer"
                >
                  {t('admin', 'saveUserBtn', 'Save User Account')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE USER CONFIRMATION */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/60 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#08165B] dark:text-white">
                {t('admin', 'deleteUserConfirmTitle', 'Remove User Account?')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                {t('admin', 'deleteUserConfirmDesc', 'Are you sure you want to delete this user? This action cannot be undone.')}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold text-xs cursor-pointer"
              >
                {t('admin', 'cancelBtn', 'Cancel')}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-md shadow-rose-600/30 cursor-pointer"
              >
                {t('admin', 'deleteBtn', 'Delete User')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PASSWORD RESET CONFIRMATION */}
      {passwordResetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-blue-200 dark:border-blue-900/60 space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#1677E8] dark:text-blue-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#08165B] dark:text-white">
                {t('admin', 'resetPasswordTitle', 'Reset User Password?')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                {t('admin', 'resetPasswordDesc', 'A secure password reset link will be dispatched to their registered email.')}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPasswordResetUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold text-xs cursor-pointer"
              >
                {t('admin', 'cancelBtn', 'Cancel')}
              </button>
              <button
                onClick={handleConfirmPasswordReset}
                className="px-4 py-2 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B] dark:hover:bg-blue-600 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {t('admin', 'sendResetLinkBtn', 'Send Reset Link')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
