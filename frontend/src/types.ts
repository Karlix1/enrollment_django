export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

export interface Teacher {
  id: number;
  teacher_name: string;
  email: string;
}

export interface Course {
  id: number;
  course_name: string;
  units: number;
  teacher: number;
  teacher_name?: string;
}

export interface Enrollment {
  id: number;
  student: number;
  course: number;
  enrollment_date: string;
  student_name?: string;
  course_name?: string;
}