import React, { useState, useEffect } from 'react';
import { Enrollment, Student, Course } from '../types';

interface EnrollmentFormProps {
  onAdd: (enrollment: Enrollment) => void;
  onUpdate: (enrollment: Enrollment) => void;
  editingEnrollment: Enrollment | null;
}

function EnrollmentForm({ onAdd, onUpdate, editingEnrollment }: EnrollmentFormProps) {
  const [formData, setFormData] = useState<Omit<Enrollment, 'id' | 'enrollment_date' | 'student_name' | 'course_name'>>({
    student: 0,
    course: 0
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/students/`, { mode: 'cors' }).then(res => res.json()),
      fetch(`${process.env.REACT_APP_API_URL}/courses/`, { mode: 'cors' }).then(res => res.json())
    ])
      .then(([studentsData, coursesData]) => {
        setStudents(studentsData);
        setCourses(coursesData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (editingEnrollment) {
      setFormData({
        student: editingEnrollment.student,
        course: editingEnrollment.course
      });
    } else {
      setFormData({ student: 0, course: 0 });
    }
  }, [editingEnrollment]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = editingEnrollment ? 'PUT' : 'POST';
    const url = editingEnrollment ? `${process.env.REACT_APP_API_URL}/enrollments/${editingEnrollment.id}/` : `${process.env.REACT_APP_API_URL}/enrollments/`;
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
        if (editingEnrollment) {
          onUpdate(data);
        } else {
          onAdd(data);
          setFormData({ student: 0, course: 0 });
        }
      })
      .catch(error => console.error('Error saving enrollment:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">➕</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{editingEnrollment ? 'Edit Enrollment' : 'Add New Enrollment'}</h3>
          <p className="text-gray-600 text-sm">{editingEnrollment ? 'Update the enrollment details' : 'Enroll a student in a course'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Student</label>
          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.first_name} {student.last_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg">
        ✅ {editingEnrollment ? 'Update Enrollment' : 'Add Enrollment'}
      </button>
    </form>
  );
}

export default EnrollmentForm;