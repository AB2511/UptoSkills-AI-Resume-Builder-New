import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

const Sidebar = React.memo(
  ({
    setActiveSection,
    handleAIEnhancement,
    handleDownload,
    handleShare,
    branding,
    handleBrandingToggle,
    handleUploadResume,
  }) => {
    return (
      <div className="w-16 md:w-72 bg-white text-gray-800 p-4 md:p-6 rounded-r-3xl shadow-2xl border-r border-gray-200 flex flex-col items-center md:items-start">
        <div className="w-full flex flex-col items-center md:items-start space-y-4 md:space-y-6 z-10">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 hidden md:block">
            Resume Tools
          </h3>

          <button
            className="w-12 h-12 md:w-full md:h-auto bg-blue-500 text-white rounded-full md:rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center md:flex-row md:justify-start md:space-x-2"
            onClick={() => setActiveSection('rearrange')}
          >
            <span className="text-2xl md:text-lg">↕️</span>
            <span className="hidden md:inline">Rearrange</span>
          </button>

          <button
            className="w-12 h-12 md:w-full md:h-auto bg-red-500 text-white rounded-full md:rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center md:flex-row md:justify-start md:space-x-2"
            onClick={handleAIEnhancement}
          >
            <span className="text-2xl md:text-lg">🤖</span>
            <span className="hidden md:inline">AI Assistant</span>
          </button>

          <hr className="border-gray-300 my-2 w-full hidden md:block" />

          <button
            className="w-12 h-12 md:w-full md:h-auto bg-yellow-500 text-white rounded-full md:rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center md:flex-row md:justify-start md:space-x-2"
            onClick={handleDownload}
          >
            <span className="text-2xl md:text-lg">⬇️</span>
            <span className="hidden md:inline">Download</span>
          </button>

          <button
            className="w-12 h-12 md:w-full md:h-auto bg-green-500 text-white rounded-full md:rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center md:flex-row md:justify-start md:space-x-2"
            onClick={handleShare}
          >
            <span className="text-2xl md:text-lg">🔗</span>
            <span className="hidden md:inline">Share</span>
          </button>

          <div className="flex items-center justify-between mt-2 w-full">
            <span className="text-gray-800 font-medium hidden md:block">
              Branding
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={branding}
                onChange={handleBrandingToggle}
                className="sr-only"
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full relative transition-all duration-300">
                <div
                  className="absolute w-5 h-5 bg-gray-600 rounded-full left-0.5 top-0.5 transition-transform duration-300"
                  style={{
                    transform: branding ? 'translateX(24px)' : 'translateX(0)',
                  }}
                />
              </div>
            </label>
          </div>

          <button
            className="w-12 h-12 md:w-full md:h-auto bg-purple-500 text-white rounded-full md:rounded-full p-2 md:p-3 shadow-lg flex items-center justify-center md:flex-row md:justify-start md:space-x-2"
            onClick={handleUploadResume}
          >
            <span className="text-2xl md:text-lg">⬆️</span>
            <span className="hidden md:inline">Upload Resume</span>
          </button>
        </div>
      </div>
    );
  }
);

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState({
    name: 'Aditya Tiwary',
    role: 'Experienced Project Manager | IT | Leadership | Cost Management',
    phone: '+1 541-754-3010',
    email: 'help@aditya.com',
    linkedin: 'linkedin.com',
    location: 'New York, NY, USA',
    summary:
      'With over 12 years of experience in project management, William Davis brings a wealth of expertise in managing complex IT projects, particularly in cloud technology. He has a proven ability to enhance efficiency, having managed a $2M project portfolio, resulting in significant cost reductions. His proficiency in project management software tools and data analysis complements his strong leadership and creative problem-solving skills.',
    experience: [
      {
        title: 'Senior IT Project Manager',
        companyName: 'IBM',
        date: '2018 - 2023',
        companyLocation: 'New York, NY, USA',
        accomplishment:
          '• Oversaw a $2M project portfolio resulting in a 15% reduction in costs through strategic resource allocation.\n' +
          '• Initiated and successfully implemented refined processes leading to a 20% increase in project delivery efficiency.\n' +
          '• Managed a cross-functional team of 15 professionals across diverse areas for effective project execution.',
      },
    ],
    education: [
      {
        degree: 'Master’s Degree in Computer Science',
        institution: 'Massachusetts Institute of Technology',
        duration: '2012 - 2013',
        location: 'Cambridge, MA, USA',
      },
    ],
    achievements: [
      {
        keyAchievements: 'Creative Problem Solving',
        describe:
          'Utilize creative solutions to tackle challenges, evident in the 20% increase in project delivery efficiency at IBM.',
      },
    ],
    languages: [
      { name: 'English', level: 'Native', dots: 5 },
      { name: 'Spanish', level: 'Advanced', dots: 4 },
      { name: 'Arabic', level: 'Beginner', dots: 1 },
    ],
    skills: [
      {
        category: 'Project Management',
        items: ['Project Management', 'Cost Management', 'Cloud Knowledge'],
      },
    ],
    projects: [],
  });

  const [showButtons, setShowButtons] = useState(true);
  const [photo] = useState(null);
  const [branding, setBranding] = useState(true);
  const [sectionSettings, setSectionSettings] = useState({
    header: {
      showTitle: true,
      showPhone: true,
      showLink: true,
      showEmail: true,
      showLocation: true,
      uppercaseName: true,
      showPhoto: true,
    },
    summary: { showSummary: true },
    experience: { showExperience: true },
    education: { showEducation: true },
    achievements: { showAchievements: true },
    languages: { showLanguages: true },
    skills: { showSkills: true },
    projects: { showProjects: true },
  });

  const [activeSection, setActiveSection] = useState(null);
  const [sectionsOrder, setSectionsOrder] = useState([
    'summary',
    'skills',
    'experience',
    'education',
    'achievements',
    'languages',
    'projects',
  ]);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) setResumeData(JSON.parse(savedResume));

    const savedSettings = localStorage.getItem('sectionSettings');
    if (savedSettings) setSectionSettings(JSON.parse(savedSettings));

    const savedBranding = localStorage.getItem('branding');
    if (savedBranding) setBranding(JSON.parse(savedBranding));
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('sectionSettings', JSON.stringify(sectionSettings));
    localStorage.setItem('branding', JSON.stringify(branding));
  }, [resumeData, sectionSettings, branding]);

  const handleInputChange = useCallback(
    (section, field, value, index = null) => {
      if (index !== null) {
        const updatedSection = [...(resumeData[section] || [])];
        updatedSection[index][field] = value;
        setResumeData((prev) => ({ ...prev, [section]: updatedSection }));
      } else {
        setResumeData((prev) => ({ ...prev, [field]: value }));
      }
    },
    [resumeData]
  );

  const handleAddSection = useCallback((section) => {
    const newItem =
      {
        experience: {
          title: 'New Position',
          companyName: 'Company Name',
          date: '2023 - Present',
          companyLocation: 'City, State, Country',
          accomplishment:
            '• Add your accomplishments here\n• Second achievement',
        },
        education: {
          degree: 'Degree Name',
          institution: 'Institution Name',
          duration: 'Year - Year',
          location: 'City, State, Country',
        },
        achievements: {
          keyAchievements: 'New Achievement',
          describe: 'Describe your achievement here',
        },
        languages: {
          name: 'New Language',
          level: 'Beginner',
          dots: 1,
        },
        skills: {
          category: 'New Category',
          items: ['Skill 1', 'Skill 2'],
        },
        projects: {
          title: 'New Project',
          description: 'Project description',
          duration: 'Year - Year',
        },
      }[section] || {};

    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  }, []);

  const handleRemoveSection = useCallback(
    (section, index) => {
      const updatedSection = [...(resumeData[section] || [])];
      updatedSection.splice(index, 1);
      setResumeData((prev) => ({ ...prev, [section]: updatedSection }));
    },
    [resumeData]
  );

  const handleSkillItemChange = useCallback(
    (skillIndex, itemIndex, value) => {
      const updatedSkills = [...resumeData.skills];
      updatedSkills[skillIndex].items[itemIndex] = value;
      setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
    },
    [resumeData]
  );

  const handleAddSkillItem = useCallback(
    (skillIndex) => {
      const updatedSkills = [...resumeData.skills];
      updatedSkills[skillIndex].items.push('New Skill');
      setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
    },
    [resumeData]
  );

  const handleLanguageLevelChange = useCallback(
    (index, level) => {
      const dotsMap = { Native: 5, Advanced: 4, Beginner: 1 };
      const updatedLanguages = [...resumeData.languages];
      updatedLanguages[index].level = level;
      updatedLanguages[index].dots = dotsMap[level];
      setResumeData((prev) => ({ ...prev, languages: updatedLanguages }));
    },
    [resumeData]
  );

  const handleDownload = useCallback(() => {
    setShowButtons(false);
    setActiveSection(null);

    setTimeout(() => {
      const resumeElement = resumeRef.current;
      const scale = 2; // Increase scale for better quality

      // Set the dimensions to A4 in pixels (at 96 DPI, 1mm = 3.78px)
      const a4WidthPx = 210 * 3.78; // 793.8px
      const a4HeightPx = 297 * 3.78; // 1122.66px

      html2canvas(resumeElement, {
        scale: scale,
        useCORS: true,
        logging: false,
        width: a4WidthPx / scale, // Adjust for scale
        height: a4HeightPx / scale, // Adjust for scale
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
          const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

          // Since the canvas is already in A4 proportions, we can directly use the page dimensions
          pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
          pdf.save('resume.pdf');
          setShowButtons(true);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
          alert('Failed to generate PDF. Please try again.');
          setShowButtons(true);
        });
    }, 500);
  }, []);

  const handleShare = useCallback(() => {
    const resumeLink = window.location.href;
    navigator.clipboard
      .writeText(resumeLink)
      .then(() => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 3000);
      })
      .catch(() => alert('Failed to copy link to clipboard.'));
  }, []);

  const handleUploadResume = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file)
        alert('PDF uploaded successfully. Backend logic will be implemented.');
    };
    input.click();
  }, []);

  const handleSettingChange = useCallback((section, setting) => {
    setSectionSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [setting]: !prev[section][setting] },
    }));
  }, []);

  const handleBrandingToggle = useCallback(
    () => setBranding((prev) => !prev),
    []
  );

  const handleSettingsClick = useCallback((section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  const handleMoveSectionUp = useCallback(
    (index) => {
      if (index > 0) {
        const newOrder = [...sectionsOrder];
        [newOrder[index - 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index - 1],
        ];
        setSectionsOrder(newOrder);
      }
    },
    [sectionsOrder]
  );

  const handleMoveSectionDown = useCallback(
    (index) => {
      if (index < sectionsOrder.length - 1) {
        const newOrder = [...sectionsOrder];
        [newOrder[index + 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index + 1],
        ];
        setSectionsOrder(newOrder);
      }
    },
    [sectionsOrder]
  );

  const handleAIEnhancement = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('AI enhancement is not available in offline mode.');
    }, 2000);
  }, []);

  const LoadingScreen = useMemo(
    () => (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">
            Enhancing your resume...
          </p>
        </div>
      </div>
    ),
    []
  );

  const ShareNotification = useMemo(
    () => (
      <motion.div
        className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
      >
        Link copied to clipboard!
      </motion.div>
    ),
    []
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        setActiveSection={setActiveSection}
        handleAIEnhancement={handleAIEnhancement}
        handleDownload={handleDownload}
        handleShare={handleShare}
        branding={branding}
        handleBrandingToggle={handleBrandingToggle}
        handleUploadResume={handleUploadResume}
      />

      <div className="flex-1 p-6 overflow-auto">
        <div
          ref={resumeRef}
          className="w-[210mm] h-[297mm] mx-auto bg-white shadow-md p-6"
          style={{
            width: '210mm',
            height: '297mm',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleInputChange(null, 'name', e.target.innerText)
                }
                className="text-2xl font-bold text-gray-900 uppercase tracking-wide"
              >
                {resumeData.name}
              </h1>
              {sectionSettings.header.showTitle && (
                <p
                  contentEditable
                  onBlur={(e) =>
                    handleInputChange(null, 'role', e.target.textContent)
                  }
                  className="text-xs text-blue-600 mt-1"
                >
                  {resumeData.role}
                </p>
              )}
              <div className="flex flex-col gap-1 mt-1 text-[10px] text-gray-600">
                {sectionSettings.header.showPhone && (
                  <div className="flex items-center">
                    <span className="mr-1">☎</span>
                    <span
                      contentEditable
                      onBlur={(e) =>
                        handleInputChange(null, 'phone', e.target.textContent)
                      }
                    >
                      {resumeData.phone}
                    </span>
                  </div>
                )}
                {sectionSettings.header.showEmail && (
                  <div className="flex items-center">
                    <span className="mr-1">✉</span>
                    <span
                      contentEditable
                      onBlur={(e) =>
                        handleInputChange(null, 'email', e.target.textContent)
                      }
                    >
                      {resumeData.email}
                    </span>
                  </div>
                )}
                {sectionSettings.header.showLink && (
                  <div className="flex items-center">
                    <span className="mr-1">🔗</span>
                    <span
                      contentEditable
                      onBlur={(e) =>
                        handleInputChange(
                          null,
                          'linkedin',
                          e.target.textContent
                        )
                      }
                    >
                      {resumeData.linkedin}
                    </span>
                  </div>
                )}
                {sectionSettings.header.showLocation && (
                  <div className="flex items-center">
                    <span className="mr-1">📍</span>
                    <span
                      contentEditable
                      onBlur={(e) =>
                        handleInputChange(
                          null,
                          'location',
                          e.target.textContent
                        )
                      }
                    >
                      {resumeData.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {sectionSettings.header.showPhoto && photo && (
              <div className="flex-shrink-0">
                <img
                  src={photo}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex">
            <div className="flex-1 pr-3">
              {sectionsOrder.map((section) => {
                if (
                  section === 'summary' &&
                  sectionSettings.summary.showSummary
                ) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>SUMMARY</span>
                        {showButtons && activeSection === 'summary' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('summary')}
                            aria-label="Open summary settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      <p
                        contentEditable
                        onBlur={(e) =>
                          handleInputChange(
                            null,
                            'summary',
                            e.target.textContent
                          )
                        }
                        className="text-[10px] text-gray-700 leading-relaxed"
                      >
                        {resumeData.summary}
                      </p>
                    </div>
                  );
                }
                if (
                  section === 'experience' &&
                  sectionSettings.experience.showExperience
                ) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>EXPERIENCE</span>
                        {showButtons && activeSection === 'experience' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('experience')}
                            aria-label="Open experience settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      {resumeData.experience.map((exp, idx) => (
                        <div key={idx} className="mb-3">
                          <div>
                            <div className="flex justify-between items-center">
                              <h3
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'experience',
                                    'title',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-xs font-bold text-blue-600"
                              >
                                {exp.title}
                              </h3>
                              <div className="flex items-center">
                                <span className="mr-1">📅</span>
                                <p
                                  contentEditable
                                  onBlur={(e) =>
                                    handleInputChange(
                                      'experience',
                                      'date',
                                      e.target.textContent,
                                      idx
                                    )
                                  }
                                  className="text-[10px] text-gray-600 italic"
                                >
                                  {exp.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'experience',
                                    'companyName',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-[10px] text-gray-800"
                              >
                                {exp.companyName}
                              </p>
                              <div className="flex items-center">
                                <span className="mr-1">📍</span>
                                <p
                                  contentEditable
                                  onBlur={(e) =>
                                    handleInputChange(
                                      'experience',
                                      'companyLocation',
                                      e.target.textContent,
                                      idx
                                    )
                                  }
                                  className="text-[10px] text-gray-600"
                                >
                                  {exp.companyLocation}
                                </p>
                              </div>
                            </div>
                            <ul className="list-disc pl-4 mt-1 text-[10px] text-gray-700 leading-relaxed">
                              {exp.accomplishment
                                .split('\n')
                                .filter((line) => line.trim() !== '')
                                .map((bullet, bulletIdx) => (
                                  <li key={bulletIdx}>
                                    <span
                                      contentEditable
                                      onBlur={(e) => {
                                        const updatedBullets =
                                          exp.accomplishment
                                            .split('\n')
                                            .filter(
                                              (line) => line.trim() !== ''
                                            );
                                        updatedBullets[
                                          bulletIdx
                                        ] = `• ${e.target.textContent.trim()}`;
                                        handleInputChange(
                                          'experience',
                                          'accomplishment',
                                          updatedBullets.join('\n'),
                                          idx
                                        );
                                      }}
                                      className="text-[10px] text-gray-700"
                                    >
                                      {bullet.trim().replace(/^•\s*/, '')}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          {showButtons && (
                            <button
                              onClick={() =>
                                handleRemoveSection('experience', idx)
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 mt-1"
                            >
                              Remove Experience
                            </button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection('experience')}
                          className="text-[10px] text-blue-500 hover:text-blue-700 mt-1"
                        >
                          Add Experience
                        </button>
                      )}
                    </div>
                  );
                }
                if (
                  section === 'education' &&
                  sectionSettings.education.showEducation
                ) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>EDUCATION</span>
                        {showButtons && activeSection === 'education' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('education')}
                            aria-label="Open education settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="mb-2">
                          <div>
                            <h3
                              contentEditable
                              onBlur={(e) =>
                                handleInputChange(
                                  'education',
                                  'degree',
                                  e.target.textContent,
                                  idx
                                )
                              }
                              className="text-xs font-bold text-gray-900"
                            >
                              {edu.degree}
                            </h3>
                            <div className="flex justify-between items-center">
                              <p
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'education',
                                    'institution',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-[10px] text-blue-600"
                              >
                                {edu.institution}
                              </p>
                              <div className="flex items-center">
                                <span className="mr-1">📅</span>
                                <p
                                  contentEditable
                                  onBlur={(e) =>
                                    handleInputChange(
                                      'education',
                                      'duration',
                                      e.target.textContent,
                                      idx
                                    )
                                  }
                                  className="text-[10px] text-gray-600 italic"
                                >
                                  {edu.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">📍</span>
                              <p
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'education',
                                    'location',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-[10px] text-gray-600"
                              >
                                {edu.location}
                              </p>
                            </div>
                          </div>
                          {showButtons && (
                            <button
                              onClick={() =>
                                handleRemoveSection('education', idx)
                              }
                              className="text-[10px] text-red-500 hover:text-red-700"
                            >
                              Remove Education
                            </button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection('education')}
                          className="text-[10px] text-blue-500 hover:text-blue-700"
                        >
                          Add Education
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="w-1/3 pl-3">
              {sectionsOrder.map((section) => {
                if (section === 'skills' && sectionSettings.skills.showSkills) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>SKILLS</span>
                        {showButtons && activeSection === 'skills' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('skills')}
                            aria-label="Open skills settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      {resumeData.skills.map((skillCategory, idx) => (
                        <div key={idx} className="mb-2">
                          <p
                            contentEditable
                            onBlur={(e) =>
                              handleInputChange(
                                'skills',
                                'category',
                                e.target.textContent,
                                idx
                              )
                            }
                            className="text-[10px] font-bold text-gray-800"
                          >
                            {skillCategory.category}
                          </p>
                          {skillCategory.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center">
                              <span
                                contentEditable
                                onBlur={(e) =>
                                  handleSkillItemChange(
                                    idx,
                                    itemIdx,
                                    e.target.textContent
                                  )
                                }
                                className="text-[10px] text-gray-600"
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                          {showButtons && (
                            <div className="mt-1">
                              <button
                                onClick={() => handleAddSkillItem(idx)}
                                className="text-[10px] text-blue-500 hover:text-blue-700 mr-2"
                              >
                                Add Skill
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveSection('skills', idx)
                                }
                                className="text-[10px] text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection('skills')}
                          className="text-[10px] text-blue-500 hover:text-blue-700"
                        >
                          Add Skill Category
                        </button>
                      )}
                    </div>
                  );
                }
                if (
                  section === 'achievements' &&
                  sectionSettings.achievements.showAchievements
                ) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>STRENGTHS</span>
                        {showButtons && activeSection === 'achievements' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('achievements')}
                            aria-label="Open achievements settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      {resumeData.achievements.map((achievement, idx) => (
                        <div key={idx} className="mb-2">
                          <div className="flex items-start">
                            <span className="text-gray-600 mr-2">🏆</span>
                            <div>
                              <h3
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'achievements',
                                    'keyAchievements',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-xs font-bold text-gray-900"
                              >
                                {achievement.keyAchievements}
                              </h3>
                              <p
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'achievements',
                                    'describe',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-[10px] text-gray-700"
                              >
                                {achievement.describe}
                              </p>
                            </div>
                          </div>
                          {showButtons && (
                            <button
                              onClick={() =>
                                handleRemoveSection('achievements', idx)
                              }
                              className="text-[10px] text-red-500 hover:text-red-700"
                            >
                              Remove Strength
                            </button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection('achievements')}
                          className="text-[10px] text-blue-500 hover:text-blue-700"
                        >
                          Add Strength
                        </button>
                      )}
                    </div>
                  );
                }
                if (
                  section === 'languages' &&
                  sectionSettings.languages.showLanguages
                ) {
                  return (
                    <div className="mb-4" key={section}>
                      <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-2 flex items-center justify-between">
                        <span>LANGUAGES</span>
                        {showButtons && activeSection === 'languages' && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSettingsClick('languages')}
                            aria-label="Open languages settings"
                          >
                            ⚙
                          </button>
                        )}
                      </h2>
                      {resumeData.languages.map((lang, idx) => (
                        <div key={idx} className="mb-2">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <p
                                contentEditable
                                onBlur={(e) =>
                                  handleInputChange(
                                    'languages',
                                    'name',
                                    e.target.textContent,
                                    idx
                                  )
                                }
                                className="text-xs font-bold text-gray-900"
                              >
                                {lang.name}
                              </p>
                              {showButtons ? (
                                <select
                                  value={lang.level}
                                  onChange={(e) =>
                                    handleLanguageLevelChange(
                                      idx,
                                      e.target.value
                                    )
                                  }
                                  className="text-[10px] text-gray-600 border rounded p-1"
                                >
                                  <option value="Beginner">Beginner</option>
                                  <option value="Advanced">Advanced</option>
                                  <option value="Native">Native</option>
                                </select>
                              ) : (
                                <p className="text-[10px] text-gray-600">
                                  {lang.level}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < lang.dots
                                      ? 'bg-gray-900'
                                      : 'bg-gray-300'
                                  }`}
                                ></span>
                              ))}
                            </div>
                          </div>
                          {showButtons && (
                            <button
                              onClick={() =>
                                handleRemoveSection('languages', idx)
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 mt-1"
                            >
                              Remove Language
                            </button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection('languages')}
                          className="text-[10px] text-blue-500 hover:text-blue-700"
                        >
                          Add Language
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {branding && (
            <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[8px] text-gray-500">
              <span>www.adityatiwary.com</span>
              <span>Made by Aditya Tiwary</span>
            </div>
          )}
        </div>
      </div>

      {activeSection === 'rearrange' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-80 max-w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Rearrange Sections
            </h3>
            {sectionsOrder.map((section, idx) => (
              <div
                key={section}
                className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded"
              >
                <span className="text-sm font-medium text-gray-800">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMoveSectionUp(idx)}
                    className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                    disabled={idx === 0}
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => handleMoveSectionDown(idx)}
                    className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                    disabled={idx === sectionsOrder.length - 1}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setActiveSection(null)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {activeSection && activeSection !== 'rearrange' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-80 max-w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{' '}
              Settings
            </h3>
            <div className="space-y-3">
              {Object.keys(sectionSettings[activeSection]).map((key) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {key
                      .replace('show', '')
                      .replace(/([A-Z])/g, ' $1')
                      .trim()}
                  </span>
                  <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id={`toggle-${key}`}
                      className="sr-only"
                      checked={sectionSettings[activeSection][key]}
                      onChange={() => handleSettingChange(activeSection, key)}
                    />
                    <label
                      htmlFor={`toggle-${key}`}
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        sectionSettings[activeSection][key]
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
                          sectionSettings[activeSection][key]
                            ? 'translate-x-4'
                            : 'translate-x-0'
                        }`}
                      />
                    </label>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setActiveSection(null)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showShareNotification && <ShareNotification />}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default ResumeEditor;
