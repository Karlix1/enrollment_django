import React from 'react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

function StudentList({ students, loading, onEdit, onDelete }: StudentListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (students.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <p className="text-blue-600 font-semibold">No students yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map(student => (
        <div key={student.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
            </div>
            <span className="text-xl">👤</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{student.first_name} {student.last_name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <span className="text-blue-600 mr-2">📧</span>
              <span>{student.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-blue-600 mr-2">🎂</span>
              <span>{student.age} years old</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Active</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(student)}
                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(student.id)}
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

export default StudentList;