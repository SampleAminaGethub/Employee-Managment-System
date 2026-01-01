import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, TrendingUp, Award, Edit, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import type { Employee } from '../types';

interface EmployeeProfileProps {
  employee: Employee;
  onBack: () => void;
}

export function EmployeeProfile({ employee, onBack }: EmployeeProfileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'on-leave':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} size="icon" className="h-9 w-9">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-slate-900">Employee Profile</h1>
          <p className="text-slate-600">View and manage employee information</p>
        </div>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-blue-50 text-blue-700 text-2xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-slate-900 mb-1">{employee.name}</h2>
                    <p className="text-slate-600 mb-2">{employee.position}</p>
                    <Badge variant="outline" className={getStatusColor(employee.status)}>{employee.status}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-200">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{employee.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Annual Salary</p>
                  <p className="text-slate-900">${employee.salary.toLocaleString()}</p>
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
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Performance</p>
                  <p className="text-slate-900">{employee.performanceScore}%</p>
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
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Department</p>
                  <p className="text-slate-900">{employee.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Tenure</p>
                  <p className="text-slate-900">
                    {Math.floor((new Date().getTime() - new Date(employee.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="border-slate-200 shadow-sm">
          <Tabs defaultValue="overview" className="p-6">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div>
                <h3 className="text-slate-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Employee ID</p>
                    <p className="text-slate-900">{employee.id}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Department</p>
                    <p className="text-slate-900">{employee.department}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Position</p>
                    <p className="text-slate-900">{employee.position}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Join Date</p>
                    <p className="text-slate-900">{new Date(employee.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Emergency Contact</p>
                    <p className="text-slate-900">{employee.emergencyContact}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Employment Status</p>
                    <Badge variant="outline" className={getStatusColor(employee.status)}>{employee.status}</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4 mt-6">
              <div>
                <h3 className="text-slate-900 mb-4">Attendance Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">This Month</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">95%</Badge>
                    </div>
                    <Progress value={95} className="h-2 bg-slate-100" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Last Month</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">92%</Badge>
                    </div>
                    <Progress value={92} className="h-2 bg-slate-100" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Year to Date</span>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">93%</Badge>
                    </div>
                    <Progress value={93} className="h-2 bg-slate-100" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-6">
              <div>
                <h3 className="text-slate-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Overall Score</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{employee.performanceScore}%</Badge>
                    </div>
                    <Progress value={employee.performanceScore} className="h-2 bg-slate-100" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Quality of Work</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">94%</Badge>
                    </div>
                    <Progress value={94} className="h-2 bg-slate-100" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Team Collaboration</span>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">88%</Badge>
                    </div>
                    <Progress value={88} className="h-2 bg-slate-100" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Innovation</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">91%</Badge>
                    </div>
                    <Progress value={91} className="h-2 bg-slate-100" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <div>
                <h3 className="text-slate-900 mb-4">Employee Documents</h3>
                <div className="space-y-2">
                  <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-slate-900 mb-1">Employment Contract.pdf</p>
                    <p className="text-sm text-slate-500">Uploaded on {new Date(employee.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-slate-900 mb-1">Tax Forms.pdf</p>
                    <p className="text-sm text-slate-500">Uploaded on {new Date(employee.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <p className="text-slate-900 mb-1">Performance Reviews.pdf</p>
                    <p className="text-sm text-slate-500">Last updated 2 months ago</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}
