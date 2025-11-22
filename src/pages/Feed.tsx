import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MobileBottomNav from '../components/MobileBottomNav';
import FeedContent from '../components/FeedContent';
import RightSidebar from '../components/RightSidebar';

const Feed = () => {
    return (
        <div className="_layout _layout_main_wrapper">
            <ThemeSwitcher />

            <div className="_main_layout">
                <Header />

                {/* Main Layout Structure */}
                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            {/* Left Sidebar */}
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <LeftSidebar />
                            </div>

                            {/* Layout Middle - Feed Content */}
                            <FeedContent />

                            {/* Right Sidebar - Placeholder */}
                           
                                <RightSidebar />

                            
                        </div>
                    </div>
                </div>
            </div>

            <MobileBottomNav />
        </div>
    );
};

export default Feed;
