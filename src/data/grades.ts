export interface Subject {
    code: string;
    name: string;
    credits: number;
    grade: string;
    points: number;
    marks: number;
}

export interface Semester {
    id: number;
    sgpa: number;
    credits: number; // This will be an estimate as source didn't provide per-subject credits
    subjects: Subject[];
}

export const gradesData = {
    cgpa: 8.72,
    totalCredits: 179,
    semesters: [
        {
            id: 1,
            sgpa: 9.16,
            credits: 27.5,
            subjects: [
                { code: "MGT151", name: "Introduction to Business", credits: 4.5, grade: "A", points: 8, marks: 90 },
                { code: "HUM126", name: "Critical and Creative Thinking Skills", credits: 4.5, grade: "A", points: 8, marks: 78 },
                { code: "SCI131", name: "Environmental Science: Corporate Sustainability", credits: 4.5, grade: "O", points: 10, marks: 93 },
                { code: "PCC012", name: "Skills for Life Long Learning", credits: 0.5, grade: "A", points: 9, marks: 85 },
                { code: "ENG103", name: "Intermediate 1: Everyday Communication", credits: 4.5, grade: "A", points: 9, marks: 81 },
                { code: "PRG211", name: "Python Programming powered by IBM", credits: 4.5, grade: "O", points: 10, marks: 95 },
                { code: "PSY308", name: "Positive Psychology", credits: 4.5, grade: "A", points: 9, marks: 84 }
            ]
        },
        {
            id: 2,
            sgpa: 9.08,
            credits: 31.5,
            subjects: [
                { code: "COM301", name: "Business Communication", credits: 4.5, grade: "A", points: 8, marks: 78 },
                { code: "PHL201", name: "Indian Ethos and Mindful Leadership", credits: 4.5, grade: "A+", points: 9, marks: 81 },
                { code: "MTH391", name: "Business Mathematics", credits: 4.5, grade: "O", points: 10, marks: 94 },
                { code: "CST101", name: "Database Management Systems", credits: 4.5, grade: "O", points: 10, marks: 95 },
                { code: "MTH393", name: "Discrete Mathematics", credits: 4.5, grade: "A+", points: 9, marks: 86 },
                { code: "PRG102", name: "Data Structures and Algorithms using Java", credits: 4.5, grade: "A+", points: 9, marks: 87 },
                { code: "ENG105", name: "Intermediate 2: Everyday Communication", credits: 4.5, grade: "A", points: 8, marks: 80 }
            ]
        },
        {
            id: 3,
            sgpa: 9.00,
            credits: 22.5,
            subjects: [
                { code: "MGT203", name: "Design Thinking", credits: 4.5, grade: "A", points: 8, marks: 79 },
                { code: "CST102", name: "Introduction to Operation Systems", credits: 4.5, grade: "A+", points: 9, marks: 84 },
                { code: "CYB301", name: "Information Security Fundamentals", credits: 4.5, grade: "A+", points: 9, marks: 87 },
                { code: "AIM301", name: "Introduction to AI & Machine Learning", credits: 4.5, grade: "A+", points: 9, marks: 87 },
                { code: "QNT201", name: "Quantitative Methods for Decision Making", credits: 4.5, grade: "O", points: 10, marks: 94 }
            ]
        },
        {
            id: 4,
            sgpa: 7.80,
            credits: 23,
            subjects: [
                { code: "PRG104", name: "Software Engineering and Web Development", credits: 4.5, grade: "A", points: 9, marks: 82 },
                { code: "PRG103", name: "Object Oriented Programming using Java", credits: 4.5, grade: "A", points: 8, marks: 80 },
                { code: "CYB401", name: "Physical & IT System Security", credits: 4.5, grade: "A", points: 8, marks: 79 },
                { code: "CST103", name: "Computer Science Fundamentals", credits: 4.5, grade: "A", points: 8, marks: 77 },
                { code: "RES201", name: "Research Methods", credits: 4.5, grade: "B", points: 6, marks: 59 },
                { code: "PCT103", name: "Certificate in Artificial Intelligence", credits: 0.5, grade: "A", points: 8, marks: 78 }
            ]
        },
        {
            id: 5,
            sgpa: 7.43,
            credits: 20,
            subjects: [
                { code: "INT300", name: "Internship (Co-op)", credits: 4.5, grade: "B", points: 7, marks: 70 },
                { code: "CST204", name: "Data Communication and Computer Networks", credits: 4.5, grade: "B", points: 7, marks: 62 },
                { code: "CLD301", name: "IT Infrastructure Landscape powered by IBM", credits: 4.5, grade: "A", points: 8, marks: 75 },
                { code: "CLD302", name: "Cloud Computing Fundamentals powered by IBM", credits: 4.5, grade: "B", points: 7, marks: 61 },
                { code: "PCT104", name: "Certificate in IoT", credits: 2, grade: "A+", points: 9, marks: 82 }
            ]
        },
        {
            id: 6,
            sgpa: 8.83,
            credits: 23,
            subjects: [
                { code: "PCC103", name: "Harvard Certification - Ethics at Work", credits: 0.5, grade: "O", points: 10, marks: 100 },
                { code: "CST202", name: "Computer Architecture", credits: 4.5, grade: "A+", points: 9, marks: 86 },
                { code: "MTH203", name: "Calculus and Algebra", credits: 4.5, grade: "O", points: 10, marks: 91 },
                { code: "DAL302", name: "Predictive Analytics", credits: 4.5, grade: "B", points: 7, marks: 70 },
                { code: "CST203", name: "Wireless Communication", credits: 4.5, grade: "A+", points: 9, marks: 86 },
                { code: "AIM401", name: "Machine Learning", credits: 4.5, grade: "A+", points: 9, marks: 87 }
            ]
        },
        {
            id: 7,
            sgpa: 10.00,
            credits: 4.5,
            subjects: [
                { code: "INT301", name: "Internship II", credits: 4.5, grade: "O", points: 10, marks: 95 }
            ]
        },
        {
            id: 8,
            sgpa: 9.33,
            credits: 27,
            subjects: [
                { code: "AIM402", "name": "Deep Learning", credits: 4.5, grade: "A", points: 9, marks: 81 },
                { code: "CST201", "name": "Embedded Systems powered by ARM", credits: 4.5, grade: "A+", points: 10, marks: 89 },
                { code: "AIM404", "name": "Pattern and Anomaly Detection", credits: 4.5, grade: "A", points: 9, marks: 84 },
                { code: "AIM403", "name": "Computational Linguistics and Natural Language Processing", credits: 4.5, grade: "A", points: 9, marks: 85 },
                { code: "CAP405", "name": "Application of Machine Learning in Industries", credits: 4.5, grade: "O", points: 10, marks: 92 },
                { code: "CAP400", "name": "Capstone Project", credits: 4.5, grade: "O", points: 10, marks: 92 }
            ]
        }
    ]
};
