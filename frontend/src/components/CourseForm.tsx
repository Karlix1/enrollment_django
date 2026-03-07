import React, { useState, useEffect } from 'react';
import { Course, Teacher } from '../types';

interface CourseFormProps {
  onAdd: (course: Course) => void;
  onUpdate: (course: Course) => void;
  editingCourse: Course | null;
}

function CourseForm({ onAdd, onUpdate, editingCourse }: CourseFormProps) {
  const [formData, setFormData] = useState<Omit<Course, 'id' | 'teacher_name'>>({
    course_name: '',
    units: 0,
    teacher: 0
  });
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers/`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        course_name: editingCourse.course_name,
        units: editingCourse.units,
        teacher: editingCourse.teacher
      });
    } else {
      setFormData({ course_name: '', units: 0, teacher: 0 });
    }
  }, [editingCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'units' || name === 'teacher' ? parseInt(value) || 0 : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = editingCourse ? 'PUT' : 'POST';
    const url = editingCourse ? `${process.env.REACT_APP_API_URL}/courses/${editingCourse.id}/` : `${process.env.REACT_APP_API_URL}/courses/`;
    fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (editingCourse) {
          onUpdate(data);
        } else {
          onAdd(data);
          setFormData({ course_name: '', units: 0, teacher: 0 });
        }
      })
      .catch(error => console.error('Error saving course:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">➕</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
          <p className="text-gray-600 text-sm">{editingCourse ? 'Update the course details' : 'Fill in the details to add a new course'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
          <input
            type="text"
            name="course_name"
            placeholder="e.g., Mathematics 101"
            value={formData.course_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Units</label>
          <input
            type="number"
            name="units"
            placeholder="e.g., 3"
            value={formData.units}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor</label>
          <select
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.teacher_name}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg">
        ✅ {editingCourse ? 'Update Course' : 'Add Course'}
      </button>
    </form>
  );
}

export default CourseForm;