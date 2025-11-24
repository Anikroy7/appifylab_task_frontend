import { useGetPostLikesQuery } from '../store/api/postApi';

interface WhoLikedModalProps {
    postId: string;
    isOpen: boolean;
    onClose: () => void;
}

const WhoLikedModal = ({ postId, isOpen, onClose }: WhoLikedModalProps) => {
    const { data: likesData, isLoading } = useGetPostLikesQuery(postId, {
        skip: !isOpen,
    });

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Modal */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '600px',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid #e4e6eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#050505' }}>
                            People who liked this
                        </h3>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f2f2f2')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15.898 4.045c-.271-.272-.709-.272-.98 0l-4.71 4.711-4.702-4.702a.693.693 0 1 0-.98.98l4.702 4.702-4.702 4.702a.693.693 0 1 0 .98.98l4.702-4.702 4.71 4.711a.693.693 0 1 0 .98-.98l-4.71-4.711 4.71-4.71c.272-.272.272-.709 0-.981z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '8px 0',
                        }}
                    >
                        {isLoading ? (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#65676b' }}>
                                Loading...
                            </div>
                        ) : likesData?.data && likesData.data.length > 0 ? (
                            <div>
                                {likesData.data.map((like, index) => (
                                    <div
                                        key={`${like.userId._id}-${index}`}
                                        style={{
                                            padding: '8px 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'background-color 0.2s',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f2f3f5')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        {/* Avatar */}
                                        <div
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '20px',
                                                fontWeight: 600,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {like.userId.firstName?.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Name */}
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: 600,
                                                    color: '#050505',
                                                    lineHeight: '20px',
                                                }}
                                            >
                                                {like.userId.firstName} {like.userId.lastName}
                                            </div>
                                        </div>

                                        {/* Like Icon */}
                                        <div
                                            style={{
                                                color: '#3b82f6',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M2 21h4c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1zm20-11h-6.31l.95-4.57c.03-.14.05-.28.05-.43 0-.55-.22-1.05-.59-1.41L15.17 2 8.59 8.59C8.22 8.95 8 9.45 8 10v9c0 1.1.9 2 2 2h8c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#65676b' }}>
                                No likes yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhoLikedModal;
