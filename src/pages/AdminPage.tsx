import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { Lock, Upload, LogOut, Plus, AlertTriangle, Loader2 } from 'lucide-react';
import { HerbForm } from '../components/admin/HerbForm';
import { HerbList } from '../components/admin/HerbList';
import { BulkUpload } from '../components/admin/BulkUpload';
import { getHerbs, deleteHerb } from '../lib/api/herbs';
import type { Herb } from '../types/herb';
import { toast } from 'react-hot-toast';

export function AdminPage() {
  const { isAuthenticated, login, logout } = useAuthStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadHerbs();
    }
  }, [isAuthenticated]);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      const data = await getHerbs();
      setHerbs(data);
      setError('');
    } catch (err) {
      setError('Failed to load herbs');
      toast.error('Failed to load herbs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const success = login(password);
      if (!success) {
        setError('Invalid password');
        toast.error('Invalid password. Please try again.');
      } else {
        setError('');
        toast.success('Successfully logged in!');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (herb: Herb) => {
    setSelectedHerb(herb);
    setShowForm(true);
  };

  const handleDelete = async (herb: Herb) => {
    if (window.confirm(`Are you sure you want to delete ${herb.common_name}?`)) {
      setActionLoading(true);
      try {
        await deleteHerb(herb.id);
        await loadHerbs();
        toast.success(`Successfully deleted ${herb.common_name}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to delete herb: ${errorMessage}`);
        toast.error(`Failed to delete ${herb.common_name}. ${errorMessage}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    setActionLoading(true);
    try {
      await loadHerbs();
      setShowForm(false);
      setSelectedHerb(null);
      toast.success('Successfully saved herb!');
    } catch (err) {
      toast.error('Failed to refresh herb list. Please reload the page.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <Lock className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                placeholder="Enter admin password"
                disabled={actionLoading}
              />
            </div>
            {error && (
              <div className="flex items-center text-sm text-red-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={actionLoading}
              className="w-full rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Herb Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setSelectedHerb(null);
              setShowForm(true);
            }}
            disabled={actionLoading}
            className="flex items-center rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Herb
          </button>
          <button
            onClick={handleLogout}
            disabled={actionLoading}
            className="flex items-center rounded-md bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center rounded-md bg-red-50 p-4 text-red-800">
          <AlertTriangle className="mr-2 h-5 w-5" />
          {error}
        </div>
      )}

      {showForm ? (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {selectedHerb ? 'Edit Herb' : 'Add New Herb'}
          </h2>
          <HerbForm
            herb={selectedHerb || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedHerb(null);
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Bulk Upload</h2>
            <BulkUpload onSuccess={loadHerbs} />
          </div>

          <div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                <span className="ml-2 text-gray-600">Loading herbs...</span>
              </div>
            ) : (
              <HerbList
                herbs={herbs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={actionLoading}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}