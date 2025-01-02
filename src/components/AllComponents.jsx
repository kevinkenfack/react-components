import React from 'react';
import { AlertTriangle, ArrowUpRight, Check, X, Clock } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    const configs = {
      pending: {
        icon: AlertTriangle,
        text: 'Pending',
        className: 'bg-orange-50 text-orange-600 border-orange-200',
        iconColor: 'text-orange-600'
      },
      submitted: {
        icon: ArrowUpRight,
        text: 'Submitted',
        className: 'bg-blue-50 text-blue-600 border-blue-200',
        iconColor: 'text-blue-600'
      },
      success: {
        icon: Check,
        text: 'Success',
        className: 'bg-green-50 text-green-600 border-green-200',
        iconColor: 'text-green-600'
      },
      failed: {
        icon: X,
        text: 'Failed',
        className: 'bg-red-50 text-red-600 border-red-200',
        iconColor: 'text-red-600'
      },
      expired: {
        icon: Clock,
        text: 'Expired',
        className: 'bg-gray-50 text-gray-600 border-gray-200',
        iconColor: 'text-gray-600'
      }
    };
    
    return configs[status] || configs.pending;
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border ${config.className}`}>
      <Icon className={`w-4 h-4 mr-2 ${config.iconColor}`} />
      <span className="text-sm font-medium">{config.text}</span>
    </span>
  );
};

const StatusBadgesDemo = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <StatusBadge status="pending" />
      <StatusBadge status="submitted" />
      <StatusBadge status="success" />
      <StatusBadge status="failed" />
      <StatusBadge status="expired" />
    </div>
  );
};

export default StatusBadgesDemo;