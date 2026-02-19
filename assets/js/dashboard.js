/* =====================================================
   DASHBOARD FUNCTIONALITY
   Sidebar toggle, stats, and UI interactions
   ===================================================== */

// ==================== SIDEBAR TOGGLE ====================
function initDashboardSidebar() {
  const sidebarToggle = document.querySelector('[data-testid="sidebar-toggle"]');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const main = document.querySelector('.dashboard-main');
  
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }
    
  if (sidebarToggle && sidebar && main) {
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        // Prevent body scroll when sidebar is open on mobile
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
      } else {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('expanded');
      }
      
      // Save state for desktop view
      const isCollapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 991 && 
          sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && 
          !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Load saved state (only applies to desktop collapsed state)
  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState === 'true' && window.innerWidth > 991) {
    sidebar.classList.add('collapsed');
    if (main) main.classList.add('expanded');
  }
}

// ==================== DASHBOARD STATS ====================
const dashboardStats = {
  totalMatch: 248,
  activePlayers: 1542,
  liveStreams: 12,
  totalRevenue: 125000
};

const MatchData = [
  {
    id: 1,
    team1: 'Phoenix Rising',
    team2: 'Cyber Wolves',
    game: 'Valorant',
    date: '2026-02-15',
    time: '18:00',
    status: 'Upcoming'
  },
  {
    id: 2,
    team1: 'Storm Raiders',
    team2: 'Digital Titans',
    game: 'CS2',
    date: '2026-02-16',
    time: '20:00',
    status: 'Upcoming'
  },
  {
    id: 3,
    team1: 'Viper Squad',
    team2: 'Elite Force',
    game: 'League of Legends',
    date: '2026-02-14',
    time: '19:00',
    status: 'Completed'
  },
  {
    id: 4,
    team1: 'Apex Legends',
    team2: 'Shadow Assassins',
    game: 'Apex Legends',
    date: '2026-02-17',
    time: '21:00',
    status: 'Upcoming'
  },
  {
    id: 5,
    team1: 'Neon Knights',
    team2: 'Quantum Gaming',
    game: 'Valorant',
    date: '2026-02-13',
    time: '17:00',
    status: 'Completed'
  }
];

const playersData = [
  {
    id: 1,
    name: 'ProGamer_X',
    game: 'Valorant',
    rank: 'Radiant',
    winRate: '78%',
    Match: 342
  },
  {
    id: 2,
    name: 'ShadowSniper',
    game: 'CS2',
    rank: 'Global Elite',
    winRate: '72%',
    Match: 521
  },
  {
    id: 3,
    name: 'CyberNinja',
    game: 'League of Legends',
    rank: 'Challenger',
    winRate: '81%',
    Match: 689
  },
  {
    id: 4,
    name: 'ApexHunter',
    game: 'Apex Legends',
    rank: 'Predator',
    winRate: '76%',
    Match: 412
  }
];

// ==================== RENDER DASHBOARD DATA ====================
function renderDashboardStats() {
  // Render stat cards
  const statsContainer = document.querySelector('[data-dashboard-stats]');
  if (statsContainer) {
    document.querySelector('[data-stat="total-Match"]').textContent = dashboardStats.totalMatch;
    document.querySelector('[data-stat="active-players"]').textContent = dashboardStats.activePlayers.toLocaleString();
    document.querySelector('[data-stat="live-streams"]').textContent = dashboardStats.liveStreams;
    document.querySelector('[data-stat="total-revenue"]').textContent = `$${(dashboardStats.totalRevenue / 1000).toFixed(0)}K`;
  }
}

function renderMatchTable() {
  const tableBody = document.querySelector('[data-Match-table]');
  if (!tableBody) return;
  
  tableBody.innerHTML = MatchData.map(match => `
    <tr>
      <td data-label="ID" style="font-weight: 600; color: var(--color-text);">#${match.id}</td>
      <td data-label="Match">${match.team1} vs ${match.team2}</td>
      <td data-label="Game"><span class="badge badge-secondary">${match.game}</span></td>
      <td data-label="Date">${match.date}</td>
      <td data-label="Time">${match.time}</td>
      <td data-label="Status"><span class="badge ${match.status === 'Upcoming' ? 'badge-primary' : 'badge-success'}">${match.status}</span></td>
      <td data-label="Action">
        <button class="btn-ghost" style="padding: 0.5rem 1rem; font-size: 0.8rem;" data-testid="view-match-${match.id}">View</button>
      </td>
    </tr>
  `).join('');
}

function renderPlayersCards() {
  const playersContainer = document.querySelector('[data-players-cards]');
  if (!playersContainer) return;
  
  playersContainer.innerHTML = playersData.map(player => `
    <div class="card" data-testid="player-card-${player.id}">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-md);">
        <div>
          <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${player.name}</h4>
          <p style="font-size: 0.875rem; margin: 0;">${player.game}</p>
        </div>
        <span class="badge badge-primary">${player.rank}</span>
      </div>
      <div style="display: flex; gap: var(--space-lg); margin-top: var(--space-md);">
        <div>
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${player.winRate}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">Win Rate</div>
        </div>
        <div>
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-secondary);">${player.Match}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">Match</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== INITIALIZE DASHBOARD ====================
function initDashboard() {
  initDashboardSidebar();
  renderDashboardStats();
  renderMatchTable();
  renderPlayersCards();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}