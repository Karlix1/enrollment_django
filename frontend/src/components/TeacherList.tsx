import React from 'react';
import { Teacher } from '../types';

interface TeacherListProps {
  teachers: Teacher[];
  loading: boolean;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: number) => void;
}

function TeacherList({ teachers, loading, onEdit, onDelete }: TeacherListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 text-center">
        <p className="text-purple-600 font-semibold">No teachers yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map(teacher => (
        <div key={teacher.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {teacher.teacher_name.charAt(0)}
            </div>
            <span className="text-xl">🎓</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{teacher.teacher_name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <span className="text-purple-600 mr-2">📧</span>
              <span>{teacher.email}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Instructor</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(teacher)}
                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(teacher.id)}
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

export default TeacherList;