export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  phone: string;
  address: string;
  emergencyContact: string;
  performanceScore: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hoursWorked: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  newHires: number;
  attendanceRate: number;
  pendingLeaves: number;
  payrollPending: number;
  avgPerformance: number;
}
