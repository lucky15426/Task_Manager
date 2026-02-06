import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            {/* Cinematic Background Image */}
            <div className="loading-background">
                <div className="background-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
                    alt="Abstract Digital Background"
                    className="bg-image"
                />
            </div>

            <div className="loading-content">
                <div className="loading-logo">
                    <div className="logo-icon-wrapper">
                        <span className="logo-icon">📋</span>
                    </div>
                    <h1 className="logo-text">Task Manager</h1>
                </div>

                <div className="loading-progress-container">
                    <div className="loading-progress-bar"></div>
                    <div className="loading-progress-glow"></div>
                </div>

                <div className="loading-details">
                    <p className="loading-status">Synchronizing Workspace</p>
                    <div className="loading-steps">
                        <span className="step">Fetching Tasks...</span>
                        <span className="step">Connecting to Atlas Database...</span>
                        <span className="step">Optimizing UI...</span>
                    </div>
                </div>
            </div>

            {/* Decorative glass elements */}
            <div className="glass-card-decoration dc-1"></div>
            <div className="glass-card-decoration dc-2"></div>
        </div>
    );
};

export default LoadingScreen;
