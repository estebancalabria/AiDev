import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, FileText, Download, Clock, CheckCircle } from 'lucide-react';
import { Course, Enrollment, Class, Material } from '../../types';
import { supabase } from '../../lib/supabase';
import Header from '../Layout/Header';

interface CourseDetailProps {
  course: Course;
  enrollment: Enrollment;
  onBack: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, enrollment, onBack }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseContent();
  }, [course.id]);

  const fetchCourseContent = async () => {
    try {
      // Fetch classes
      const { data: classesData } = await supabase
        .from('classes')
        .select('*')
        .eq('course_id', course.id)
        .order('order');

      if (classesData) {
        setClasses(classesData);
        if (classesData.length > 0 && !selectedClass) {
          setSelectedClass(classesData[0]);
        }
      }

      // Fetch materials for all classes
      const classIds = classesData?.map(c => c.id) || [];
      if (classIds.length > 0) {
        const { data: materialsData } = await supabase
          .from('materials')
          .select('*')
          .in('class_id', classIds);

        if (materialsData) {
          setMaterials(materialsData);
        }
      }
    } catch (error) {
      console.error('Error fetching course content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getClassMaterials = (classId: string) => {
    return materials.filter(m => m.class_id === classId);
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Volver al Dashboard</span>
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <span>•</span>
                <span>Instructor: {course.instructor}</span>
                <span>•</span>
                <span>Nivel: {course.level}</span>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center min-w-[200px]">
                <div className="text-2xl font-bold text-blue-600 mb-1">{enrollment.progress}%</div>
                <div className="text-sm text-blue-600 mb-3">Progreso del curso</div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classes List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Clases del Curso</h2>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {classes.map((cls, index) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedClass?.id === cls.id
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-transparent bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{cls.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{cls.duration}</span>
                          </div>
                        </div>
                        <Play className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Class Content */}
          <div className="lg:col-span-2">
            {selectedClass ? (
              <div className="space-y-6">
                {/* Video Player */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="aspect-video bg-gray-900 relative">
                    {selectedClass.video_url ? (
                      <video
                        className="w-full h-full"
                        controls
                        poster={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&crop=center`}
                      >
                        <source src={selectedClass.video_url} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p>Video no disponible</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedClass.title}</h2>
                    <p className="text-gray-600">{selectedClass.description}</p>
                  </div>
                </div>

                {/* Class Materials */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Materiales de la Clase</h3>
                  {getClassMaterials(selectedClass.id).length > 0 ? (
                    <div className="space-y-3">
                      {getClassMaterials(selectedClass.id).map((material) => (
                        <a
                          key={material.id}
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg">
                            {getMaterialIcon(material.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{material.title}</h4>
                            <p className="text-sm text-gray-500 capitalize">{material.type}</p>
                          </div>
                          <Download className="h-4 w-4 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No hay materiales disponibles para esta clase</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una clase</h3>
                <p className="text-gray-500">Elige una clase de la lista para ver su contenido</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;