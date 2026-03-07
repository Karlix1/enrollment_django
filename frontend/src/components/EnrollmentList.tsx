import React from 'react';
import { Enrollment } from '../types';

interface EnrollmentListProps {
  enrollments: Enrollment[];
  loading: boolean;
  onEdit: (enrollment: Enrollment) => void;
  onDelete: (id: number) => void;
}

function EnrollmentList({ enrollments, loading, onEdit, onDelete }: EnrollmentListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (enrollments.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 font-semibold">No enrollments yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrollments.map(enrollment => (
        <div key={enrollment.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="text-xl">✏️</span>
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Student</h3>
          <p className="text-lg font-semibold text-gray-900 mb-4">{enrollment.student_name || 'Student'}</p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-bold text-gray-700 mb-1">Course</h4>
            <p className="text-gray-900">{enrollment.course_name || 'Course'}</p>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-red-600 mr-2">📅</span>
            <span>{new Date(enrollment.enrollment_date).toLocaleDateString()}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Enrolled</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(enrollment)}
                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(enrollment.id)}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EnrollmentList;