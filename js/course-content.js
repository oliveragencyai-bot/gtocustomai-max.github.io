// Course Content Data - All modules, lessons, quizzes, worksheets

const COURSE_CONTENT = {
    'module-1': {
        title: 'Foundations',
        description: 'What AI automation is, why it matters, and setting up your first system',
        lessons: [
            {
                id: 'lesson-1',
                title: 'What is AI Automation & Why It Matters',
                videoUrl: null, // Will be set when video is uploaded
                videoScript: 'module-1-video-script.md',
                content: 'modules/module-1-lesson-1.md',
                worksheet: 'worksheets/module-1-lesson-1-worksheet.md',
                quiz: 'quizzes/module-1-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'The Zero-Cost Tech Stack',
                videoUrl: null,
                videoScript: 'module-1-video-script.md',
                content: 'modules/module-1-lesson-2.md',
                worksheet: null,
                quiz: 'quizzes/module-1-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Your First AI Conversation',
                videoUrl: null,
                videoScript: 'module-1-video-script.md',
                content: 'modules/module-1-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-1-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Memory & Context Systems',
                videoUrl: null,
                videoScript: 'module-1-video-script.md',
                content: 'modules/module-1-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-1-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Module 1 Project: Your First Automation',
                videoUrl: null,
                videoScript: 'module-1-video-script.md',
                content: 'modules/module-1-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-1-lesson-5-quiz.md'
            }
        ],
        slides: 'slides/module-1-slides.md'
    },
    'module-2': {
        title: 'Setup',
        description: 'Installing, configuring, and optimizing your AI platform',
        lessons: [
            {
                id: 'lesson-1',
                title: 'AI Platform Installation',
                videoUrl: null,
                content: 'modules/module-2-lesson-1.md',
                worksheet: 'worksheets/module-2-lesson-1-worksheet.md',
                quiz: 'quizzes/module-2-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'Configuration Essentials',
                videoUrl: null,
                content: 'modules/module-2-lesson-2.md',
                worksheet: null,
                quiz: 'quizzes/module-2-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Memory Systems Setup',
                videoUrl: null,
                content: 'modules/module-2-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-2-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Tool Connections',
                videoUrl: null,
                content: 'modules/module-2-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-2-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Module 2 Project: Complete Setup',
                videoUrl: null,
                content: 'modules/module-2-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-2-lesson-5-quiz.md'
            }
        ],
        slides: 'slides/module-2-slides.md'
    },
    'module-3': {
        title: 'Core Workflows',
        description: 'Email management, calendar intelligence, and task automation',
        lessons: [
            {
                id: 'lesson-1',
                title: 'Email Management Automation',
                videoUrl: null,
                content: 'modules/module-3-lesson-1.md',
                worksheet: null,
                quiz: 'quizzes/module-3-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'Calendar Intelligence',
                videoUrl: null,
                content: 'modules/module-3-lesson-2.md',
                worksheet: 'worksheets/module-3-lesson-2-worksheet.md',
                quiz: 'quizzes/module-3-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Task Automation',
                videoUrl: null,
                content: 'modules/module-3-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-3-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Daily Briefings',
                videoUrl: null,
                content: 'modules/module-3-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-3-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Module 3 Project: Core Workflow System',
                videoUrl: null,
                content: 'modules/module-3-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-3-lesson-5-quiz.md'
            }
        ],
        slides: 'slides/module-3-slides.md'
    },
    'module-4': {
        title: 'Advanced Workflows',
        description: 'Content pipelines, client communication, and decision trees',
        lessons: [
            {
                id: 'lesson-1',
                title: 'Content Creation Pipelines',
                videoUrl: null,
                content: 'modules/module-4-lesson-1.md',
                worksheet: null,
                quiz: 'quizzes/module-4-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'Client Communication Automation',
                videoUrl: null,
                content: 'modules/module-4-lesson-2.md',
                worksheet: null,
                quiz: 'quizzes/module-4-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Decision Trees & Logic',
                videoUrl: null,
                content: 'modules/module-4-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-4-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Multi-Channel Workflows',
                videoUrl: null,
                content: 'modules/module-4-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-4-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Module 4 Project: Content System',
                videoUrl: null,
                content: 'modules/module-4-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-4-lesson-5-quiz.md'
            },
            {
                id: 'lesson-6',
                title: 'Bonus: Advanced Templates',
                videoUrl: null,
                content: 'modules/module-4-lesson-6.md',
                worksheet: 'worksheets/module-4-lesson-6-worksheet.md',
                quiz: 'quizzes/module-4-lesson-6-quiz.md'
            }
        ],
        slides: 'slides/module-4-slides.md'
    },
    'module-5': {
        title: 'Multi-Agent Systems',
        description: 'Building specialized agents that work together',
        lessons: [
            {
                id: 'lesson-1',
                title: 'Specialized Agent Design',
                videoUrl: null,
                content: 'modules/module-5-lesson-1.md',
                worksheet: null,
                quiz: 'quizzes/module-5-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'Agent Coordination',
                videoUrl: null,
                content: 'modules/module-5-lesson-2.md',
                worksheet: 'worksheets/module-5-lesson-2-worksheet.md',
                quiz: 'quizzes/module-5-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Real Architecture Examples',
                videoUrl: null,
                content: 'modules/module-5-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-5-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Scaling Multi-Agent Systems',
                videoUrl: null,
                content: 'modules/module-5-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-5-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Module 5 Project: Multi-Agent System',
                videoUrl: null,
                content: 'modules/module-5-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-5-lesson-5-quiz.md'
            }
        ],
        slides: 'slides/module-5-slides.md'
    },
    'module-6': {
        title: 'Business Applications',
        description: 'Monetizing skills, client delivery, and scaling your automation business',
        lessons: [
            {
                id: 'lesson-1',
                title: 'Monetizing Your Skills',
                videoUrl: null,
                content: 'modules/module-6-lesson-1.md',
                worksheet: 'worksheets/module-6-lesson-1-worksheet.md',
                quiz: 'quizzes/module-6-lesson-1-quiz.md'
            },
            {
                id: 'lesson-2',
                title: 'Client Delivery Systems',
                videoUrl: null,
                content: 'modules/module-6-lesson-2.md',
                worksheet: null,
                quiz: 'quizzes/module-6-lesson-2-quiz.md'
            },
            {
                id: 'lesson-3',
                title: 'Scaling Operations',
                videoUrl: null,
                content: 'modules/module-6-lesson-3.md',
                worksheet: null,
                quiz: 'quizzes/module-6-lesson-3-quiz.md'
            },
            {
                id: 'lesson-4',
                title: 'Building Your Portfolio',
                videoUrl: null,
                content: 'modules/module-6-lesson-4.md',
                worksheet: null,
                quiz: 'quizzes/module-6-lesson-4-quiz.md'
            },
            {
                id: 'lesson-5',
                title: 'Capstone Project: Complete Business Automation',
                videoUrl: null,
                content: 'modules/module-6-lesson-5.md',
                worksheet: null,
                quiz: 'quizzes/module-6-lesson-5-quiz.md'
            }
        ],
        slides: 'slides/module-6-slides.md'
    }
};

// Export for use
window.COURSE_CONTENT = COURSE_CONTENT;