import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  DollarSign,
  BarChart3,
  Search,
} from 'lucide-react';
import {
  CommandDialog as Dialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (view: string) => void;
}

export function CommandDialog({ open, onOpenChange, onNavigate }: CommandDialogProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (value: string) => {
    onNavigate(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleSelect('dashboard')}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('employees')}>
            <Users className="w-4 h-4 mr-2" />
            <span>Employees</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('attendance')}>
            <Clock className="w-4 h-4 mr-2" />
            <span>Attendance</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('leave')}>
            <Calendar className="w-4 h-4 mr-2" />
            <span>Leave Management</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('payroll')}>
            <DollarSign className="w-4 h-4 mr-2" />
            <span>Payroll</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('analytics')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            <span>Analytics</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Dialog>
  );
}
