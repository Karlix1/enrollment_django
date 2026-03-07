import React, { useState, useEffect } from 'react';
import { Teacher } from '../types';

interface TeacherFormProps {
  onAdd: (teacher: Teacher) => void;
  onUpdate: (teacher: Teacher) => void;
  editingTeacher: Teacher | null;
}

function TeacherForm({ onAdd, onUpdate, editingTeacher }: TeacherFormProps) {
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    teacher_name: '',
    email: ''
  });

  useEffect(() => {
    if (editingTeacher) {
      setFormData({
        teacher_name: editingTeacher.teacher_name,
        email: editingTeacher.email
      });
    } else {
      setFormData({ teacher_name: '', email: '' });
    }
  }, [editingTeacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = editingTeacher ? 'PUT' : 'POST';
    const url = editingTeacher ? `${process.env.REACT_APP_API_URL}/teachers/${editingTeacher.id}/` : `${process.env.REACT_APP_API_URL}/teachers/`;
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
        if (editingTeacher) {
          onUpdate(data);
        } else {
          onAdd(data);
          setFormData({ teacher_name: '', email: '' });
        }
      })
      .catch(error => console.error('Error saving teacher:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">➕</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h3>
          <p className="text-gray-600 text-sm">{editingTeacher ? 'Update the teacher details' : 'Fill in the details to add a new teacher'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Teacher Name</label>
          <input
            type="text"
            name="teacher_name"
            placeholder="e.g., Dr. Smith"
            value={formData.teacher_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g., smith@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-6 w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-8 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg">
        ✅ {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
      </button>
    </form>
  );
}

export default TeacherForm;