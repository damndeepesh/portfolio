export type CourseResult = {
  code: string;
  name: string;
  maxMarks: number;
  marksObtained: number;
  grade: string;
  credits: number;
  gradePoints: number;
  creditPoints: number;
};

export type SemesterResult = {
  id: string;
  label: string;
  examSession: string;
  sgpa: number;
  cgpa?: number;
  totalMarks: number;
  marksObtained: number;
  credits: number;
  creditPoints: number;
  courses: CourseResult[];
};

export const resultProfile = {
  studentName: "Mr. Deepesh Gupta",
  universityId: "20211200001",
  programmeName: "Bachelor of Technology in Computer Science & Engineering",
  batch: "YEAR 2021-2025",
  overallCgpa: 8.75,
  grandTotalMarks: 3581,
  grandTotalOutOf: 4300,
  totalCreditsTaken: 179,
  totalCreditsTransfer: 0,
  overallCredits: 179,
  result: "Pass",
};

export const semesterResults: SemesterResult[] = [
  {
    id: "sem-1",
    label: "Semester I",
    examSession: "March 2022",
    sgpa: 9.16,
    totalMarks: 700,
    marksObtained: 606,
    credits: 27.5,
    creditPoints: 252,
    courses: [
      { code: "MGT151", name: "Introduction to Business", maxMarks: 100, marksObtained: 90, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "HUM126", name: "Critical and Creative Thinking Skills", maxMarks: 100, marksObtained: 78, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "SCI131", name: "Environmental Science: Corporate Sustainability", maxMarks: 100, marksObtained: 93, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "PCC012", name: "Skills for Life long Learning", maxMarks: 100, marksObtained: 85, grade: "A+", credits: 0.5, gradePoints: 9, creditPoints: 4.5 },
      { code: "ENG103", name: "Intermediate 1: Everyday Communication", maxMarks: 100, marksObtained: 81, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "PRG211", name: "Python Programming powered by IBM", maxMarks: 100, marksObtained: 95, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "PSY308", name: "Positive Psychology: The Science of Happiness", maxMarks: 100, marksObtained: 84, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
    ],
  },
  {
    id: "sem-2",
    label: "Semester II",
    examSession: "August 2022",
    sgpa: 9.0,
    cgpa: 9.08,
    totalMarks: 700,
    marksObtained: 601,
    credits: 31.5,
    creditPoints: 283.5,
    courses: [
      { code: "COM301", name: "Business Communication", maxMarks: 100, marksObtained: 78, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "PHL201", name: "Indian Ethos and Mindful Leadership", maxMarks: 100, marksObtained: 81, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "MTH391", name: "Business Mathematics", maxMarks: 100, marksObtained: 94, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "CST101", name: "Database Management Systems", maxMarks: 100, marksObtained: 95, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "MTH393", name: "Discrete Mathematics", maxMarks: 100, marksObtained: 86, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "PRG102", name: "Data Structures and Algorithms using Java", maxMarks: 100, marksObtained: 87, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "ENG105", name: "Intermediate 2: Everyday Communication", maxMarks: 100, marksObtained: 80, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
    ],
  },
  {
    id: "sem-3",
    label: "Semester III",
    examSession: "February 2023",
    sgpa: 9.0,
    cgpa: 9.06,
    totalMarks: 500,
    marksObtained: 431,
    credits: 22.5,
    creditPoints: 202.5,
    courses: [
      { code: "MGT203", name: "Design Thinking", maxMarks: 100, marksObtained: 79, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "CST102", name: "Introduction to Operation Systems", maxMarks: 100, marksObtained: 84, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "CYB301", name: "Information Security Fundamentals powered by IBM", maxMarks: 100, marksObtained: 87, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "AIM301", name: "Introduction to Artificial Intelligence & Machine Learning Powered by IBM", maxMarks: 100, marksObtained: 87, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "QNT201", name: "Quantitative Methods for Decision Making", maxMarks: 100, marksObtained: 94, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
    ],
  },
  {
    id: "sem-4",
    label: "Semester IV",
    examSession: "August 2023",
    sgpa: 7.8,
    cgpa: 8.78,
    totalMarks: 600,
    marksObtained: 455,
    credits: 23,
    creditPoints: 179.5,
    courses: [
      { code: "PRG104", name: "Software Engineering and Web Development", maxMarks: 100, marksObtained: 82, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "PRG103", name: "Object Oriented Programming using C++", maxMarks: 100, marksObtained: 80, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "CYB401", name: "Physical & IT System Security", maxMarks: 100, marksObtained: 79, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "CST103", name: "Computer Science Fundamentals", maxMarks: 100, marksObtained: 77, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "RES201", name: "Research Methods", maxMarks: 100, marksObtained: 59, grade: "B", credits: 4.5, gradePoints: 6, creditPoints: 27 },
      { code: "PCT103", name: "Certificate in Artificial Intelligence", maxMarks: 100, marksObtained: 78, grade: "A", credits: 0.5, gradePoints: 8, creditPoints: 4 },
    ],
  },
  {
    id: "sem-5",
    label: "Semester V",
    examSession: "January 2024",
    sgpa: 7.43,
    cgpa: 8.56,
    totalMarks: 500,
    marksObtained: 350,
    credits: 20,
    creditPoints: 148.5,
    courses: [
      { code: "INT300", name: "Internship (Co-op)", maxMarks: 100, marksObtained: 70, grade: "B+", credits: 4.5, gradePoints: 7, creditPoints: 31.5 },
      { code: "CST204", name: "Data Communication and Computer Networks", maxMarks: 100, marksObtained: 62, grade: "B+", credits: 4.5, gradePoints: 7, creditPoints: 31.5 },
      { code: "CLD301", name: "IT Infrastructure Landscape powered by IBM", maxMarks: 100, marksObtained: 75, grade: "A", credits: 4.5, gradePoints: 8, creditPoints: 36 },
      { code: "CLD302", name: "Cloud Computing Fundamentals powered by IBM", maxMarks: 100, marksObtained: 61, grade: "B+", credits: 4.5, gradePoints: 7, creditPoints: 31.5 },
      { code: "PCT104", name: "Certificate in IOT", maxMarks: 100, marksObtained: 82, grade: "A+", credits: 2, gradePoints: 9, creditPoints: 18 },
    ],
  },
  {
    id: "sem-6",
    label: "Semester VI",
    examSession: "July 2024",
    sgpa: 8.83,
    cgpa: 8.6,
    totalMarks: 600,
    marksObtained: 520,
    credits: 23,
    creditPoints: 203,
    courses: [
      { code: "PCC103", name: "Harvard Certification - Ethics at Work", maxMarks: 100, marksObtained: 100, grade: "O", credits: 0.5, gradePoints: 10, creditPoints: 5 },
      { code: "CST202", name: "Computer Architecture", maxMarks: 100, marksObtained: 86, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "MTH203", name: "Calculus and Algebra", maxMarks: 100, marksObtained: 91, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "DAL302", name: "Predictive Analytics", maxMarks: 100, marksObtained: 70, grade: "B+", credits: 4.5, gradePoints: 7, creditPoints: 31.5 },
      { code: "CST203", name: "Wireless Communication", maxMarks: 100, marksObtained: 86, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "AIM401", name: "Machine Learning", maxMarks: 100, marksObtained: 87, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
    ],
  },
  {
    id: "sem-7",
    label: "Semester VII",
    examSession: "December 2024",
    sgpa: 10,
    cgpa: 8.64,
    totalMarks: 100,
    marksObtained: 95,
    credits: 4.5,
    creditPoints: 45,
    courses: [
      { code: "INT301", name: "Internship II", maxMarks: 100, marksObtained: 95, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
    ],
  },
  {
    id: "sem-8",
    label: "Semester VIII",
    examSession: "June 2025",
    sgpa: 9.33,
    cgpa: 8.75,
    totalMarks: 600,
    marksObtained: 523,
    credits: 27,
    creditPoints: 252,
    courses: [
      { code: "AIM402", name: "Deep Learning", maxMarks: 100, marksObtained: 81, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "CST201", name: "Embedded Systems powered by ARM", maxMarks: 100, marksObtained: 89, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "AIM404", name: "Pattern and Anomaly Detection", maxMarks: 100, marksObtained: 84, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "AIM403", name: "Computational Linguistics and Natural Language Processing", maxMarks: 100, marksObtained: 85, grade: "A+", credits: 4.5, gradePoints: 9, creditPoints: 40.5 },
      { code: "AIM405", name: "Application of Machine Learning in Industries", maxMarks: 100, marksObtained: 92, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
      { code: "CAP400", name: "Capstone", maxMarks: 100, marksObtained: 92, grade: "O", credits: 4.5, gradePoints: 10, creditPoints: 45 },
    ],
  },
];
