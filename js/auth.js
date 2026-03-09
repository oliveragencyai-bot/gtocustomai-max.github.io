// Authentication System for GTO Course Platform

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Listen for auth state changes
        firebaseAuth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.handleAuthStateChange(user);
        });
    }

    handleAuthStateChange(user) {
        if (user) {
            // User is signed in
            this.currentUser = user;
            this.redirectToDashboard();
        } else {
            // User is signed out
            this.currentUser = null;
            this.showLoginForm();
        }
    }

    // Register new user
    async register(email, password, displayName) {
        try {
            const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            
            // Update profile with display name
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Create user document in Firestore
            await this.createUserDocument(userCredential.user, displayName);

            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    // Create user document in Firestore
    async createUserDocument(user, displayName) {
        const userRef = firebaseDb.collection('users').doc(user.uid);
        
        await userRef.set({
            email: user.email,
            displayName: displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            progress: {
                modules: {
                    'module-1': { unlocked: true, completed: false, lessons: {} },
                    'module-2': { unlocked: false, completed: false, lessons: {} },
                    'module-3': { unlocked: false, completed: false, lessons: {} },
                    'module-4': { unlocked: false, completed: false, lessons: {} },
                    'module-5': { unlocked: false, completed: false, lessons: {} },
                    'module-6': { unlocked: false, completed: false, lessons: {} }
                },
                currentModule: 'module-1',
                currentLesson: 'lesson-1'
            },
            quizScores: {},
            hasAccess: false, // Will be set to true after purchase
            purchaseDate: null
        });
    }

    // Login existing user
    async login(email, password) {
        try {
            const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    // Sign out
    async logout() {
        try {
            await firebaseAuth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    // Send password reset email
    async resetPassword(email) {
        try {
            await firebaseAuth.sendPasswordResetEmail(email);
            return { success: true, message: 'Password reset email sent!' };
        } catch (error) {
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    // Check if user has course access
    async checkAccess() {
        if (!this.currentUser) return false;
        
        const userDoc = await firebaseDb.collection('users').doc(this.currentUser.uid).get();
        if (userDoc.exists) {
            return userDoc.data().hasAccess || false;
        }
        return false;
    }

    // Grant course access (called after Stripe payment)
    async grantAccess(userId) {
        try {
            await firebaseDb.collection('users').doc(userId).update({
                hasAccess: true,
                purchaseDate: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error granting access:', error);
            return { success: false, error: error.message };
        }
    }

    // Redirect to dashboard
    redirectToDashboard() {
        if (!window.location.pathname.includes('dashboard')) {
            window.location.href = 'dashboard.html';
        }
    }

    // Show login form (redirect to login page)
    showLoginForm() {
        if (!window.location.pathname.includes('index.html') && 
            !window.location.pathname.includes('login.html') &&
            !window.location.pathname.includes('register.html') &&
            !window.location.pathname.includes('course/')) {
            window.location.href = 'index.html';
        }
    }

    // Get user-friendly error messages
    getErrorMessage(code) {
        const messages = {
            'auth/email-already-in-use': 'This email is already registered. Please log in.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/operation-not-allowed': 'Operation not allowed. Contact support.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/user-disabled': 'This account has been disabled. Contact support.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password. Try again or reset your password.',
            'auth/too-many-requests': 'Too many failed attempts. Try again later.',
            'auth/invalid-credential': 'Invalid email or password.'
        };
        return messages[code] || 'An error occurred. Please try again.';
    }
}

// Progress tracking functions
const ProgressTracker = {
    // Get user's current progress
    async getProgress(userId) {
        const userDoc = await firebaseDb.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data().progress;
        }
        return null;
    },

    // Mark lesson as viewed
    async markLessonViewed(moduleId, lessonId) {
        const userId = firebaseAuth.currentUser?.uid;
        if (!userId) return;

        const progressRef = firebaseDb.collection('users').doc(userId);
        await progressRef.update({
            [`progress.modules.${moduleId}.lessons.${lessonId}`]: {
                viewed: true,
                viewedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        });
    },

    // Complete a lesson
    async completeLesson(moduleId, lessonId) {
        const userId = firebaseAuth.currentUser?.uid;
        if (!userId) return;

        const progressRef = firebaseDb.collection('users').doc(userId);
        await progressRef.update({
            [`progress.modules.${moduleId}.lessons.${lessonId}.completed`]: true,
            [`progress.modules.${moduleId}.lessons.${lessonId}.completedAt`]: firebase.firestore.FieldValue.serverTimestamp()
        });
    },

    // Submit quiz and check if passed
    async submitQuiz(moduleId, lessonId, score, passed) {
        const userId = firebaseAuth.currentUser?.uid;
        if (!userId) return;

        const userRef = firebaseDb.collection('users').doc(userId);
        
        // Record quiz score
        await userRef.update({
            [`quizScores.${moduleId}-${lessonId}`]: {
                score: score,
                passed: passed,
                attemptedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        });

        // If passed, check if module is complete and unlock next
        if (passed) {
            await this.checkAndUnlockNext(moduleId, userId, userRef);
        }

        return passed;
    },

    // Check if module complete and unlock next module
    async checkAndUnlockNext(currentModuleId, userId, userRef) {
        const moduleOrder = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5', 'module-6'];
        const currentIndex = moduleOrder.indexOf(currentModuleId);
        
        if (currentIndex < moduleOrder.length - 1) {
            const nextModule = moduleOrder[currentIndex + 1];
            
            // Get current progress to check if all lessons in module are complete
            const userDoc = await userRef.get();
            const moduleProgress = userDoc.data().progress.modules[currentModuleId];
            
            // Check if all 5 lessons are completed (assuming 5 lessons per module)
            const lessonCount = 5;
            let allLessonsComplete = true;
            
            for (let i = 1; i <= lessonCount; i++) {
                if (!moduleProgress.lessons[`lesson-${i}`]?.completed) {
                    allLessonsComplete = false;
                    break;
                }
            }

            // Also check if module quiz is passed
            const quizPassed = userDoc.data().quizScores[`${currentModuleId}-quiz`]?.passed || false;

            if (allLessonsComplete && quizPassed) {
                // Mark current module complete and unlock next
                await userRef.update({
                    [`progress.modules.${currentModuleId}.completed`]: true,
                    [`progress.modules.${nextModule}.unlocked`]: true
                });
            }
        }
    },

    // Get quiz score
    async getQuizScore(moduleId, lessonId) {
        const userId = firebaseAuth.currentUser?.uid;
        if (!userId) return null;

        const userDoc = await firebaseDb.collection('users').doc(userId).get();
        return userDoc.data()?.quizScores?.[`${moduleId}-${lessonId}`] || null;
    }
};

// Initialize auth system
const authSystem = new AuthSystem();