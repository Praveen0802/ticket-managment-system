import React from 'react';

const StatusBadge = ({ status }) => {
  // Normalize status to lowercase for consistent comparison
  const statusLower = status?.toLowerCase();
  
  // Determine styling based on status
  const getStatusStyles = () => {
    switch (statusLower) {
      case 'paid':
      case 'approved':
        return {
          textColor: 'text-[#03BA8A]',
          bgColor: 'bg-[#E6F9F4]',
          borderColor: 'border-[#03BA8A]'
        };
      case 'pending':
        return {
          textColor: 'text-[#F5A623]',
          bgColor: 'bg-[#FFF8EC]',
          borderColor: 'border-[#F5A623]'
        };
      case 'rejected':
        return {
          textColor: 'text-[#FF3B30]',
          bgColor: 'bg-[#FFEFED]',
          borderColor: 'border-[#FF3B30]'
        };
      default:
        return {
          textColor: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-300'
        };
    }
  };
  
  const { textColor, bgColor, borderColor } = getStatusStyles();
  
  return (
    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-[4px] ${bgColor}`}>
      <span className={`text-[12px] font-nomral ${textColor}`}>
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;