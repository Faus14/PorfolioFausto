// @flow strict
import { educations } from "@/utils/data/educations";
import { FaGraduationCap } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";

function Education() {
  // Filtrar educación formal y cursos
  const formalEducation = educations.filter(edu => edu.id === 1);
  const courses = educations.filter(edu => edu.id > 1);

  return (
    <div id="education" className="relative z-50 border-t my-8 lg:my-16 border-[#25213b]">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Sección Educación Formal */}
      <SectionTitle title="formal education" />
      <EducationList educations={formalEducation} />

      {/* Sección Cursos */}
      {courses.length > 0 && (
        <>
          <SectionTitle title="Courses" />
          <EducationList educations={courses} />
        </>
      )}
    </div>
  );
}

// Componente para mostrar los títulos de sección
const SectionTitle = ({ title }) => (
  <div className="flex justify-center my-5 lg:py-6">
    <div className="flex items-center">
      <span className="w-24 h-[2px] bg-[#1a1443]"></span>
      <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">{title}</span>
      <span className="w-24 h-[2px] bg-[#1a1443]"></span>
    </div>
  </div>
);

// Componente para mostrar la lista de educación/cursos
const EducationList = ({ educations }) => (
  <div className="py-6 max-w-3xl mx-auto">
    <div className="relative border-l-2 border-violet-500 ml-6 pl-8 pb-6">
      {educations.map((education) => (
        <div key={education.id} className="mb-8">
          {/* Timeline dot */}
          <div className="absolute w-6 h-6 bg-violet-500 rounded-full -left-[13px] mt-1.5 flex items-center justify-center shadow-lg">
            <FaGraduationCap size={14} className="text-white" />
          </div>

          {/* Contenido */}
          <div className="bg-[#1a1443]/50 p-4 rounded-lg border-l-2 border-violet-500 shadow-lg">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base sm:text-lg font-medium bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                {education.title}
              </h3>
              <span className="text-xs bg-violet-900/70 px-2 py-1 rounded-full text-[#16f2b3]">
                {education.duration}
              </span>
            </div>

            <div className="flex items-center text-sm mb-2">
              <BsBuildingsFill className="text-[#16f2b3] mr-2" size={12} />
              <span className="text-white font-medium">Institution:</span>
              <span className="ml-2 text-[#16f2b3]">{education.institution}</span>
            </div>

            {education.description && (
              <p className="text-xs text-violet-200 leading-relaxed">{education.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Education;
