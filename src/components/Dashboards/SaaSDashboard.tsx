import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  Search,
  LogOut,
  DollarSign,
} from 'lucide-react';

// --- Mock Data ---
const STATS = [
  { label: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: 'text-emerald-500' },
  { label: 'Active Users', value: '2,340', change: '+3.2%', icon: Users, color: 'text-blue-500' },
  { label: 'System Load', value: '24%', change: '-2.1%', icon: BarChart3, color: 'text-indigo-500' },
  { label: 'Security Alerts', value: '0', change: 'Stable', icon: ShieldCheck, color: 'text-slate-500' },
];

const ADMIN_USERS = [
  { id: 1, name: 'Alex Rivera', email: 'alex@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Sarah Chen', email: 'schen@company.io', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Mike Ross', email: 'mross@legal.com', role: 'User', status: 'Pending' },
];

// --- Components ---

const StatCard = ({ stat }: { stat: any }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
        <stat.icon size={24} />
      </div>
      <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'}`}>
        {stat.change}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const SaaSDashboard = () => {
  const [view, setView] = useState('user'); // 'user' or 'admin'
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-full bg-slate-50 flex flex-1 overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 sm:w-20 overflow-hidden'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0 absolute sm:relative z-50 h-full sm:h-auto`}>
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex-shrink-0 cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)} />
          {isSidebarOpen && <span className="font-bold text-xl text-slate-800">Nexus.ai</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={true} />
          <SidebarItem icon={Users} label={view === 'admin' ? "Manage Users" : "My Team"} onClick={() => {}} />
          <SidebarItem icon={BarChart3} label="Analytics" onClick={() => {}} />
          {view === 'admin' && (
            <SidebarItem icon={ShieldCheck} label="Security" onClick={() => {}} />
          )}
          <SidebarItem icon={Settings} label="Settings" onClick={() => {}} />
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0">
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {isSidebarOpen && <div className="absolute inset-0 bg-slate-900/20 z-40 sm:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
        {/* Top Header */}
        <header className="h-auto min-h-[64px] bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-8 shrink-0 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isSidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="sm:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <LayoutDashboard size={20} />
              </button>
            )}

          </div>
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md w-full sm:w-96 max-w-full sm:max-w-[40%]">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none focus:ring-0 text-sm ml-2 w-full text-slate-900" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <button 
              onClick={() => setView(view === 'user' ? 'admin' : 'user')}
              className="text-xs font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-700 transition-colors"
            >
              Switch to {view === 'user' ? 'Admin' : 'User'} View
            </button>
            <Bell size={20} className="text-slate-500 cursor-pointer hover:text-slate-800 transition-colors" />
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                JD
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">John Doe</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {view === 'admin' ? 'Administrator Control Panel' : 'Welcome back, John'}
              </h1>
              <p className="text-slate-500 mt-1">Here is what's happening with your platform today.</p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-all whitespace-nowrap shrink-0">
              + Generate Report
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {STATS.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>

          {/* Main Section: Data Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">
                {view === 'admin' ? 'System User Registry' : 'Recent Activity'}
              </h2>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Role</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ADMIN_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
