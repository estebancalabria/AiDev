import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Course, Enrollment } from '../../types';
import { supabase } from '../../lib/supabase';
import CourseCard from './CourseCard';
import CourseDetail from './CourseDetail';
import Header from '../Layout/Header';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, [user]);

  const fetchCoursesAndEnrollments = async () => {
    if (!user) return;

    try {
      // Get user enrollments
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (enrollmentsData) {
        setEnrollments(enrollmentsData);

        // Get courses for enrolled courses
        const courseIds = enrollmentsData.map(e => e.course_id);
        const { data: coursesData } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds);

        if (coursesData) {
          setCourses(coursesData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
  };

  // Calculate stats
  const totalCourses = courses.length;
  const completedCourses = enrollments.filter(e => e.progress === 100).length;
  const totalHours = courses.reduce((acc, course) => {
    const hours = parseInt(course.duration.match(/\d+/)?.[0] || '0');
    return acc + hours;
  }, 0);
  const averageProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
    : 0;

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        enrollment={enrollments.find(e => e.course_id === selectedCourse.id)!}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.user_metadata?.full_name || 'Estudiante'}!
          </h1>
          <p className="text-gray-600">
            Continúa tu aprendizaje con tus cursos de IAccademy
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-50">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Horas</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Cursos</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const enrollment = enrollments.find(e => e.course_id === course.id);
                if (!enrollment) return null;
                
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrollment={enrollment}
                    onClick={() => handleCourseClick(course)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes cursos inscritos</h3>
              <p className="text-gray-500">Contacta a tu administrador para inscribirte en cursos</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;