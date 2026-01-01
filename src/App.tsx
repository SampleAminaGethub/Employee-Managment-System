import { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeProfile } from './components/EmployeeProfile';
import { Attendance } from './components/Attendance';
import { LeaveManagement } from './components/LeaveManagement';
import { Payroll } from './components/Payroll';
import { Login } from './components/Login';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Separator } from './components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb';
import { CommandDialog } from './components/CommandPalette';
import type { Employee } from './types';

type View = 'dashboard' | 'employees' | 'attendance' | 'leave' | 'payroll' | 'analytics';

const navigation = [
  { id: 'dashboard' as View, name: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees' as View, name: 'Employees', icon: Users },
  { id: 'attendance' as View, name: 'Attendance', icon: Clock },
  { id: 'leave' as View, name: 'Leave Management', icon: Calendar },
  { id: 'payroll' as View, name: 'Payroll', icon: DollarSign },
  { id: 'analytics' as View, name: 'Analytics', icon: BarChart3 },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setCurrentView('dashboard');
    setSelectedEmployee(null);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const getCurrentTitle = () => {
    if (selectedEmployee) return selectedEmployee.name;
    const current = navigation.find(n => n.id === currentView);
    return current?.name || 'Dashboard';
  };

  const renderContent = () => {
    if (selectedEmployee) {
      return (
        <EmployeeProfile
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeList onSelectEmployee={setSelectedEmployee} />;
      case 'attendance':
        return <Attendance />;
      case 'leave':
        return <LeaveManagement />;
      case 'payroll':
        return <Payroll />;
      case 'analytics':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">EMS Pro</h1>
                <p className="text-xs text-slate-500">Enterprise Edition</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Search */}
          <div className="px-4 py-3">
            <Button
              variant="outline"
              className="w-full justify-start text-slate-500 bg-slate-50 border-slate-200 hover:bg-slate-100"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 text-xs text-slate-500">
                <span>⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id && !selectedEmployee;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSelectedEmployee(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>

          <Separator />

          {/* User Info */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-slate-900">Admin User</p>
                    <p className="text-xs text-slate-500 truncate">{userEmail || 'Administrator'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 backdrop-blur-sm bg-white/95">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" onClick={() => {
                      setCurrentView('dashboard');
                      setSelectedEmployee(null);
                    }}>
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {selectedEmployee ? (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" onClick={() => {
                          setCurrentView('employees');
                          setSelectedEmployee(null);
                        }}>
                          Employees
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedEmployee.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{getCurrentTitle()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-slate-600" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5 text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <motion.div
            key={currentView + (selectedEmployee?.id || '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} onNavigate={setCurrentView} />
    </div>
  );
}
