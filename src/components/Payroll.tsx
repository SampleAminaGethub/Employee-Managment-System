import { motion } from 'motion/react';
import { DollarSign, Download, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Separator } from './ui/separator';
import { mockPayroll } from '../data/mockData';

export function Payroll() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    totalPayroll: mockPayroll.reduce((sum, p) => sum + p.netSalary, 0),
    paid: mockPayroll.filter(p => p.status === 'paid').length,
    pending: mockPayroll.filter(p => p.status === 'pending').length,
    processing: mockPayroll.filter(p => p.status === 'processing').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Payroll Management</h1>
          <p className="text-slate-600">Manage employee salaries and payment processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Total Payroll</p>
                  <h3 className="text-slate-900">${stats.totalPayroll.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Paid</p>
                  <h3 className="text-slate-900">{stats.paid}</h3>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Processing</p>
                  <h3 className="text-slate-900">{stats.processing}</h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Pending</p>
                  <h3 className="text-slate-900">{stats.pending}</h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payroll Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Payroll Records</CardTitle>
            <CardDescription>Employee salary and payment details for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">Employee</TableHead>
                  <TableHead className="text-slate-600">Period</TableHead>
                  <TableHead className="text-slate-600">Base Salary</TableHead>
                  <TableHead className="text-slate-600">Bonus</TableHead>
                  <TableHead className="text-slate-600">Deductions</TableHead>
                  <TableHead className="text-slate-600">Net Salary</TableHead>
                  <TableHead className="text-slate-600">Status</TableHead>
                  <TableHead className="text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayroll.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-slate-100"
                  >
                    <TableCell className="text-slate-900">{record.employeeName}</TableCell>
                    <TableCell className="text-slate-700">{record.month}</TableCell>
                    <TableCell className="text-slate-700">${record.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">+${record.bonus.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">-${record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-slate-900">${record.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(record.status)} gap-1`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {record.status !== 'paid' && (
                          <Button size="sm" variant="outline" className="h-8 border-slate-200">
                            Process
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4 text-slate-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Breakdown of total payroll expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-slate-700">Total Base Salary</span>
                </div>
                <span className="text-slate-900">${mockPayroll.reduce((sum, p) => sum + p.baseSalary, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-slate-700">Total Bonuses</span>
                </div>
                <span className="text-green-600">+${mockPayroll.reduce((sum, p) => sum + p.bonus, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-slate-700">Total Deductions</span>
                </div>
                <span className="text-red-600">-${mockPayroll.reduce((sum, p) => sum + p.deductions, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                  <span className="text-slate-900">Net Payroll</span>
                </div>
                <span className="text-slate-900">${stats.totalPayroll.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
