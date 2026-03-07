import React, { useState, useEffect } from 'react';
import { Student, Teacher, Course, Enrollment } from './types';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TeacherForm from './components/TeacherForm';
import TeacherList from './components/TeacherList';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import EnrollmentForm from './components/EnrollmentForm';
import EnrollmentList from './components/EnrollmentList';

function App() {
  const [activeTab, setActiveTab] = useState<string>('students');
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Editing states
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/students/`, { mode: 'cors' }).then(res => res.json()),
      fetch(`${process.env.REACT_APP_API_URL}/teachers/`, { mode: 'cors' }).then(res => res.json()),
      fetch(`${process.env.REACT_APP_API_URL}/courses/`, { mode: 'cors' }).then(res => res.json()),
      fetch(`${process.env.REACT_APP_API_URL}/enrollments/`, { mode: 'cors' }).then(res => res.json())
    ])
      .then(([studentsData, teachersData, coursesData, enrollmentsData]) => {
        setStudents(studentsData);
        setTeachers(teachersData);
        setCourses(coursesData);
        setEnrollments(enrollmentsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const addStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  const addTeacher = (newTeacher: Teacher) => {
    setTeachers([...teachers, newTeacher]);
  };

  const addCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const addEnrollment = (newEnrollment: Enrollment) => {
    setEnrollments([...enrollments, newEnrollment]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
  };

  const deleteStudent = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/students/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then(() => setStudents(students.filter(s => s.id !== id)))
      .catch(error => console.error('Error deleting student:', error));
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    setEditingTeacher(null);
  };

  const deleteTeacher = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then(() => setTeachers(teachers.filter(t => t.id !== id)))
      .catch(error => console.error('Error deleting teacher:', error));
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setEditingCourse(null);
  };

  const deleteCourse = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then(() => setCourses(courses.filter(c => c.id !== id)))
      .catch(error => console.error('Error deleting course:', error));
  };

  const updateEnrollment = (updatedEnrollment: Enrollment) => {
    setEnrollments(enrollments.map(e => e.id === updatedEnrollment.id ? updatedEnrollment : e));
    setEditingEnrollment(null);
  };

  const deleteEnrollment = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/enrollments/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then(() => setEnrollments(enrollments.filter(e => e.id !== id)))
      .catch(error => console.error('Error deleting enrollment:', error));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <div>
            <StudentForm onAdd={addStudent} onUpdate={updateStudent} editingStudent={editingStudent} />
            <StudentList students={students} loading={loading} onEdit={setEditingStudent} onDelete={deleteStudent} />
          </div>
        );
      case 'teachers':
        return (
          <div>
            <TeacherForm onAdd={addTeacher} onUpdate={updateTeacher} editingTeacher={editingTeacher} />
            <TeacherList teachers={teachers} loading={loading} onEdit={setEditingTeacher} onDelete={deleteTeacher} />
          </div>
        );
      case 'courses':
        return (
          <div>
            <CourseForm onAdd={addCourse} onUpdate={updateCourse} editingCourse={editingCourse} />
            <CourseList courses={courses} loading={loading} onEdit={setEditingCourse} onDelete={deleteCourse} />
          </div>
        );
      case 'enrollments':
        return (
          <div>
            <EnrollmentForm onAdd={addEnrollment} onUpdate={updateEnrollment} editingEnrollment={editingEnrollment} />
            <EnrollmentList enrollments={enrollments} loading={loading} onEdit={setEditingEnrollment} onDelete={deleteEnrollment} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">📚 Student Management System</h1>
          <p className="text-blue-100 mt-2">Manage students, teachers, courses, and enrollments</p>
        </div>
      </header>
      <nav className="bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { key: 'students', icon: '👥', label: 'Students' },
              { key: 'teachers', icon: '🎓', label: 'Teachers' },
              { key: 'courses', icon: '📖', label: 'Courses' },
              { key: 'enrollments', icon: '✏️', label: 'Enrollments' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-6 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {activeTab === 'students' && '👥 Manage Students'}
              {activeTab === 'teachers' && '🎓 Manage Teachers'}
              {activeTab === 'courses' && '📖 Manage Courses'}
              {activeTab === 'enrollments' && '✏️ Manage Enrollments'}
            </h2>
            <p className="text-gray-600 mt-2">Create and view {activeTab} in the system</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
