import React from 'react';
import { Clock, User, BookOpen, ChevronRight } from 'lucide-react';
import { Course, Enrollment } from '../../types';

interface CourseCardProps {
  course: Course;
  enrollment: Enrollment;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrollment, onClick }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-700';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-700';
      case 'Avanzado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center`;
          }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center space-x-1 text-sm text-gray-700">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm text-blue-600 font-medium">{enrollment.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <BookOpen className="h-4 w-4" />
            <span>Continuar curso</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;