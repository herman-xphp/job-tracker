import { useState, useMemo, useCallback } from 'react';
import { LayoutDashboard, Settings, Plus } from 'lucide-react';
import { STATUS_OPTIONS } from './constants';
import type { Job, JobFormData, ConfirmAction, SortOption, TabName, ViewMode, StatusSummary } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';
import { btnPrimary, btnGlow, inputBase } from './styles';
import Sidebar from './components/Sidebar';
import StatsRow from './components/StatsRow';
import EmptyState from './components/EmptyState';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import SettingsPanel from './components/SettingsPanel';
import JobFormModal from './components/JobFormModal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import './index.css';

const viewToggleBtn = 'bg-transparent border-none py-2 px-4 rounded-lg font-semibold cursor-pointer transition-all duration-200';

function App() {
  const { items: jobs, setItems: setJobs, storageError } = useLocalStorage();
  const { toast, showToast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const editingJob = editingId ? jobs.find((j) => j.id === editingId) ?? null : null;

  const summary = useMemo<StatusSummary>(() => {
    return STATUS_OPTIONS.reduce((acc, status) => {
      acc[status] = jobs.filter((j) => j.status === status).length;
      return acc;
    }, {} as StatusSummary);
  }, [jobs]);

  const totalJobs = jobs.length;
  const successRate = totalJobs
    ? Math.round(((summary['Interview'] ?? 0) + (summary['Offer'] ?? 0)) / totalJobs * 100)
    : 0;

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.company?.toLowerCase().includes(q) ||
          j.position?.toLowerCase().includes(q) ||
          j.notes?.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== 'All') {
      result = result.filter((j) => j.status === filterStatus);
    }

    const [field, dir] = sortBy.split('-') as [string, string];
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (field === 'date') cmp = (a.date || '').localeCompare(b.date || '');
      else if (field === 'company') cmp = (a.company || '').localeCompare(b.company || '');
      else if (field === 'position') cmp = (a.position || '').localeCompare(b.position || '');
      return dir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [jobs, search, filterStatus, sortBy]);

  const handleSave = useCallback(
    (formData: JobFormData) => {
      if (editingId) {
        setJobs((prev) => prev.map((job) => (job.id === editingId ? { ...job, ...formData } : job)));
        showToast('Application updated successfully!');
      } else {
        const newJob: Job = { ...formData, id: crypto.randomUUID() };
        setJobs((prev) => [newJob, ...prev]);
        showToast('New application added!');
      }
      setEditingId(null);
      setIsFormOpen(false);
    },
    [editingId, setJobs, showToast]
  );

  const handleEdit = useCallback((job: Job) => {
    setEditingId(job.id);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      const job = jobs.find((j) => j.id === id);
      setConfirmAction({
        title: 'Delete Application',
        message: `Are you sure you want to delete the "${job?.position ?? ''}" application at "${job?.company ?? ''}"?`,
        onConfirm: () => {
          setJobs((prev) => prev.filter((j) => j.id !== id));
          showToast('Application deleted.');
          setConfirmAction(null);
        },
      });
    },
    [jobs, setJobs, showToast]
  );

  const openNewForm = useCallback(() => {
    setEditingId(null);
    setIsFormOpen(true);
  }, []);

  const handleResetConfirm = useCallback(() => {
    setConfirmAction({
      title: 'Reset All Data',
      message: 'WARNING! All application data will be permanently deleted. Continue?',
      onConfirm: () => {
        setJobs([]);
        showToast('Database reset.');
        setConfirmAction(null);
      },
    });
  }, [setJobs, showToast]);

  return (
    <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>

      <div className="glass-panel w-[95vw] h-[90vh] max-w-[1400px] rounded-3xl flex overflow-hidden max-md:w-screen max-md:h-screen max-md:rounded-none max-md:flex-col max-md:border-none">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} successRate={successRate} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="p-8 flex justify-between items-center border-b border-glass-border max-md:p-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{currentTab === 'dashboard' ? 'Overview' : 'Settings'}</h1>
              <p className="text-text-muted text-[0.95rem] mt-1">
                {currentTab === 'dashboard'
                  ? 'Track, evaluate, and land your dream career.'
                  : 'Configure application settings and data.'}
              </p>
            </div>
            {currentTab === 'dashboard' && (
              <div className="flex items-center gap-4">
                <div className="flex bg-black/20 rounded-[10px] p-1 border border-glass-border" role="tablist" aria-label="View mode">
                  <button
                    className={`${viewToggleBtn} ${viewMode === 'list' ? 'bg-glass-bg text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : 'text-text-muted'}`}
                    onClick={() => setViewMode('list')}
                    role="tab"
                    aria-selected={viewMode === 'list'}
                  >
                    List
                  </button>
                  <button
                    className={`${viewToggleBtn} ${viewMode === 'board' ? 'bg-glass-bg text-text-main shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : 'text-text-muted'}`}
                    onClick={() => setViewMode('board')}
                    role="tab"
                    aria-selected={viewMode === 'board'}
                  >
                    Board
                  </button>
                </div>
                <button className={`${btnPrimary} ${btnGlow} hidden md:inline-flex items-center gap-2`} onClick={openNewForm}>
                  <Plus size={16} aria-hidden="true" /> New Application
                </button>
              </div>
            )}
          </header>

          <div className="flex-1 p-8 overflow-y-auto max-md:p-6 max-md:mb-20 content-scroll">
            {currentTab === 'settings' ? (
              <SettingsPanel
                jobs={jobs}
                setJobs={setJobs}
                showToast={showToast}
                onResetConfirm={handleResetConfirm}
              />
            ) : (
              <div className="animate-fade-in">
                <StatsRow summary={summary} totalJobs={totalJobs} />

                {jobs.length > 0 && (
                  <div className="flex gap-3 mb-6 flex-wrap">
                    <input
                      type="search"
                      className={`${inputBase} flex-1 min-w-[200px] py-2.5 text-sm placeholder:text-text-muted`}
                      placeholder="Search company, position, notes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search applications"
                    />
                    <select
                      className="bg-black/20 border border-glass-border text-text-main px-4 py-2.5 rounded-[10px] font-[inherit] text-sm cursor-pointer transition-[border-color] duration-200 focus:outline-none focus:border-primary"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      aria-label="Filter by status"
                    >
                      <option value="All">All Status</option>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <select
                      className="bg-black/20 border border-glass-border text-text-main px-4 py-2.5 rounded-[10px] font-[inherit] text-sm cursor-pointer transition-[border-color] duration-200 focus:outline-none focus:border-primary"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      aria-label="Sort applications"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="company-asc">Company A-Z</option>
                      <option value="company-desc">Company Z-A</option>
                      <option value="position-asc">Position A-Z</option>
                    </select>
                  </div>
                )}

                {jobs.length === 0 ? (
                  <EmptyState onAdd={openNewForm} />
                ) : filteredJobs.length === 0 ? (
                  <div className="glass-card text-center p-8 min-h-[150px] flex items-center justify-center">
                    <p className="text-text-muted">No results match your search or filter.</p>
                  </div>
                ) : viewMode === 'board' ? (
                  <KanbanBoard jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
                ) : (
                  <ListView jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
                )}
              </div>
            )}
          </div>
        </main>

        <nav className="glass-panel fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center border-t border-glass-border rounded-t-3xl z-100 md:hidden" aria-label="Mobile navigation">
          <button
            className={`flex flex-col items-center p-2 text-xs font-semibold cursor-pointer gap-1 border-none ${currentTab === 'dashboard' ? 'text-primary bg-transparent' : 'text-text-muted bg-transparent'}`}
            onClick={() => setCurrentTab('dashboard')}
            aria-current={currentTab === 'dashboard' ? 'page' : undefined}
          >
            <LayoutDashboard size={20} aria-hidden="true" /> <span>Home</span>
          </button>
          <div className="relative w-[60px] h-[60px]">
            <button
              className="absolute -top-[30px] left-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-primary to-purple-500 text-white border-none text-3xl flex items-center justify-center shadow-[0_10px_20px_rgba(99,102,241,0.4)] cursor-pointer"
              onClick={openNewForm}
              aria-label="Add new application"
            >
              <Plus size={28} aria-hidden="true" />
            </button>
          </div>
          <button
            className={`flex flex-col items-center p-2 text-xs font-semibold cursor-pointer gap-1 border-none ${currentTab === 'settings' ? 'text-primary bg-transparent' : 'text-text-muted bg-transparent'}`}
            onClick={() => setCurrentTab('settings')}
            aria-current={currentTab === 'settings' ? 'page' : undefined}
          >
            <Settings size={20} aria-hidden="true" /> <span>Settings</span>
          </button>
        </nav>
      </div>

      <JobFormModal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingId(null); }}
        onSave={handleSave}
        editingJob={editingJob}
      />

      <ConfirmDialog
        isOpen={!!confirmAction}
        title={confirmAction?.title}
        message={confirmAction?.message}
        onConfirm={confirmAction?.onConfirm}
        onCancel={() => setConfirmAction(null)}
      />

      <Toast message={storageError || toast} />
    </div>
  );
}

export default App;
