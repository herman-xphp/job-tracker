import { useState, useEffect } from 'react';
import './index.css';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected', 'No Response'];

const DEFAULT_FORM = {
  date: new Date().toISOString().split('T')[0],
  position: '',
  company: '',
  link: '',
  status: 'Applied',
  followUp: '',
  notes: ''
};

function App() {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('job-tracker-data');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'board'
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('job-tracker-data', JSON.stringify(jobs));
  }, [jobs]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setJobs(prev => prev.map(job => job.id === editingId ? { ...job, ...formData } : job));
      showToast('Lamaran berhasil diperbarui! 🎉');
    } else {
      const newJob = { ...formData, id: Date.now() };
      setJobs(prev => [newJob, ...prev]);
      showToast('Lamaran baru ditambahkan! 🚀');
    }
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setIsFormOpen(false);
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEditingId(job.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      setJobs(prev => prev.filter(job => job.id !== id));
      showToast('Data dihapus. 🗑️');
    }
  };

  const summary = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = jobs.filter(j => j.status === status).length;
    return acc;
  }, {});
  const totalJobs = jobs.length;
  
  const successRate = totalJobs ? Math.round(((summary['Interview'] + summary['Offer']) / totalJobs) * 100) : 0;

  return (
    <div className="app-root">
      <div className="mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>

      <div className="dashboard-layout glass-panel">
        <aside className="sidebar desktop-only">
          <div className="brand">
            <div className="brand-icon">✨</div>
            <h2>JobTracker</h2>
          </div>
          <nav className="nav-menu">
            <button className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
              <i className="icon">📊</i> <span>Overview</span>
            </button>
            <button className={`nav-btn ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
              <i className="icon">⚙️</i> <span>Settings</span>
            </button>
          </nav>
          
          <div className="sidebar-bottom">
            <div className="mini-stat">
              <span className="stat-value">{successRate}%</span>
              <span className="stat-label">Success Rate</span>
              <div className="progress-bar"><div className="progress-fill" style={{width: `${successRate}%`}}></div></div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div className="header-text">
              <h1>{currentTab === 'dashboard' ? 'Overview' : 'Settings'}</h1>
              <p>{currentTab === 'dashboard' ? 'Lacak, evaluasi, dan raih karir impianmu.' : 'Konfigurasi aplikasi dan data.'}</p>
            </div>
            {currentTab === 'dashboard' && (
              <div className="header-actions">
                <div className="view-toggle">
                  <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>List</button>
                  <button className={viewMode === 'board' ? 'active' : ''} onClick={() => setViewMode('board')}>Board</button>
                </div>
                <button className="btn btn-primary btn-glow desktop-only" onClick={() => { setEditingId(null); setFormData(DEFAULT_FORM); setIsFormOpen(true); }}>
                  + New Application
                </button>
              </div>
            )}
          </header>

          <div className="content-scroll">
            {currentTab === 'settings' ? (
              <div className="settings-panel fade-in">
                <div className="glass-card" style={{padding: '2rem'}}>
                  <h3 style={{marginBottom: '0.5rem'}}>Data Management</h3>
                  <p className="text-muted">Backup data lamaranmu ke format JSON atau reset ulang database lokal.</p>
                  <div className="btn-group mt-4">
                    <button className="btn btn-secondary" onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jobs));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = "job-tracker-backup.json";
                      a.click();
                    }}>⬇️ Export JSON Backup</button>
                    <button className="btn btn-danger" onClick={() => {
                      if(window.confirm('PERINGATAN KERAS! Seluruh data lamaran akan musnah. Lanjutkan?')) {
                        setJobs([]);
                        showToast('Database di-reset. 💥');
                      }
                    }}>⚠️ Delete All Data</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dashboard-view fade-in">
                <div className="stats-row">
                  <div className="stat-card glass-card">
                    <div className="stat-header"><span className="dot dot-total"></span> Total</div>
                    <div className="stat-number">{totalJobs}</div>
                  </div>
                  {STATUS_OPTIONS.map(status => (
                    <div key={status} className="stat-card glass-card">
                      <div className="stat-header">
                        <span className={`dot dot-${status.toLowerCase().replace(' ', '-')}`}></span> 
                        {status}
                      </div>
                      <div className="stat-number">{summary[status]}</div>
                    </div>
                  ))}
                </div>

                {jobs.length === 0 ? (
                  <div className="empty-state glass-card">
                    <div className="empty-icon">🚀</div>
                    <h3>Belum ada lamaran</h3>
                    <p className="text-muted" style={{marginTop: '0.5rem'}}>Mulai perjalanan karirmu dengan menambahkan lamaran pertama.</p>
                    <button className="btn btn-primary btn-glow mt-4" onClick={() => setIsFormOpen(true)}>+ Tambah Sekarang</button>
                  </div>
                ) : viewMode === 'board' ? (
                  <div className="kanban-board fade-in">
                    {STATUS_OPTIONS.map(status => (
                      <div key={status} className="kanban-column">
                        <div className="column-header">
                          <span className={`dot dot-${status.toLowerCase().replace(' ', '-')}`}></span>
                          {status} <span className="count-badge">{summary[status]}</span>
                        </div>
                        <div className="column-body">
                          {jobs.filter(j => j.status === status).map(job => (
                            <div key={job.id} className="job-card glass-card compact">
                              <div className="job-company-name">{job.company || 'Unknown Company'}</div>
                              <div className="job-title-name">{job.position || 'Unknown Position'}</div>
                              <div className="job-meta">{job.date}</div>
                              <div className="job-card-footer-actions">
                                <button className="icon-btn" onClick={() => handleEdit(job)}>✏️</button>
                                <button className="icon-btn text-danger" style={{color: 'var(--danger)'}} onClick={() => handleDelete(job.id)}>🗑️</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="list-view fade-in">
                    <div className="list-header">
                      <div>Perusahaan & Posisi</div>
                      <div>Tanggal Apply</div>
                      <div>Status</div>
                      <div>Aksi</div>
                    </div>
                    <div className="list-body">
                      {jobs.map(job => (
                        <div key={job.id} className="job-row glass-card">
                          <div className="job-info">
                            <div className="company-avatar">{job.company?.charAt(0)?.toUpperCase() || '?'}</div>
                            <div>
                              <div className="job-title-name">{job.position || 'Unknown Position'}</div>
                              <div className="job-company-name">{job.link ? <a style={{color: 'var(--text-muted)'}} href={job.link} target="_blank" rel="noopener noreferrer">{job.company || 'Unknown Company'}</a> : (job.company || 'Unknown Company')}</div>
                            </div>
                          </div>
                          <div className="job-date">{job.date}</div>
                          <div className="job-status">
                            <span className={`status-pill pill-${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span>
                          </div>
                          <div className="job-actions">
                            <button className="icon-btn" onClick={() => handleEdit(job)}>✏️</button>
                            <button className="icon-btn text-danger" style={{color: 'var(--danger)'}} onClick={() => handleDelete(job.id)}>🗑️</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <nav className="bottom-nav glass-panel mobile-only">
          <button className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
            <div style={{fontSize: '1.25rem'}}>📊</div> <span>Home</span>
          </button>
          <div className="fab-container">
            <button className="fab-btn btn-glow" onClick={() => { setEditingId(null); setFormData(DEFAULT_FORM); setIsFormOpen(true); }}>
              +
            </button>
          </div>
          <button className={`nav-btn ${currentTab === 'settings' ? 'active' : ''}`} onClick={() => setCurrentTab('settings')}>
            <div style={{fontSize: '1.25rem'}}>⚙️</div> <span>Settings</span>
          </button>
        </nav>
      </div>

      {isFormOpen && (
        <div className="modal-backdrop fade-in" onClick={(e) => { if(e.target === e.currentTarget) setIsFormOpen(false) }}>
          <div className="modal-dialog slide-up glass-card">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Application' : 'New Application'}</h2>
              <button className="close-btn" type="button" onClick={() => setIsFormOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="input-group">
                <label>Perusahaan *</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Google, Gojek, dll" />
              </div>
              <div className="input-group">
                <label>Posisi / Jabatan *</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} required placeholder="Frontend Engineer" />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Tanggal Apply *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    {STATUS_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Link Lowongan (Opsional)</label>
                <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="input-group">
                <label>Catatan Tambahan</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Catatan proses rekrutmen..."></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setIsFormOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary btn-glow">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-notification slide-up-toast">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
