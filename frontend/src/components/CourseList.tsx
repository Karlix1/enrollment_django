import React from 'react';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
  loading: boolean;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

function CourseList({ courses, loading, onEdit, onDelete }: CourseListProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (courses.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <p className="text-green-600 font-semibold">No courses yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              {course.course_name.charAt(0)}
            </div>
            <span className="text-xl">📚</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{course.course_name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <span className="text-green-600 mr-2">📊</span>
              <span>{course.units} units</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-green-600 mr-2">👨‍🏫</span>
              <span>{course.teacher_name || 'N/A'}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Available</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(course)}
                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(course.id)}
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

export default CourseList;