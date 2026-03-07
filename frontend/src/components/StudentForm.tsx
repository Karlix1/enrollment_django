import React, { useState, useEffect } from 'react';
import { Student } from '../types';

interface StudentFormProps {
  onAdd: (student: Student) => void;
  onUpdate: (student: Student) => void;
  editingStudent: Student | null;
}

function StudentForm({ onAdd, onUpdate, editingStudent }: StudentFormProps) {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    age: 0
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        first_name: editingStudent.first_name,
        last_name: editingStudent.last_name,
        email: editingStudent.email,
        age: editingStudent.age
      });
    } else {
      setFormData({ first_name: '', last_name: '', email: '', age: 0 });
    }
  }, [editingStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'age' ? parseInt(value) || 0 : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = editingStudent ? 'PUT' : 'POST';
    const url = editingStudent ? `${process.env.REACT_APP_API_URL}/students/${editingStudent.id}/` : `${process.env.REACT_APP_API_URL}/students/`;
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
        if (editingStudent) {
          onUpdate(data);
        } else {
          onAdd(data);
          setFormData({ first_name: '', last_name: '', email: '', age: 0 });
        }
      })
      .catch(error => console.error('Error saving student:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">➕</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
          <p className="text-gray-600 text-sm">{editingStudent ? 'Update the student details' : 'Fill in the details to add a new student'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="e.g., John"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="e.g., Doe"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g., john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            placeholder="e.g., 20"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-6 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
        ✅ {editingStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}

export default StudentForm;