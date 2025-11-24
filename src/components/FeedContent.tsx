import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useGetAllPostsQuery, useCreatePostMutation} from '../store/api/postApi';
import uploadImage from '../utils/uploadImage';
import { useAppSelector } from '../store/hooks';

const FeedContent = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAppSelector((state) => state.auth);

    const { data: postsData, isLoading: postsLoading } = useGetAllPostsQuery();

    const [createPost] = useCreatePostMutation();

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePostSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!postContent.trim() && !selectedImage) {
            alert('Please add some content or an image');
            return;
        }

        setIsSubmitting(true);

        try {
            let imageUrl = '';

            // Upload image if selected
            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            // Create post
            await createPost({
                content: postContent,
                image: imageUrl || undefined,
                visibility: 'public',
            }).unwrap();

            // Reset form
            setPostContent('');
            setSelectedImage(null);
            setImagePreview('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

  

    // Format time ago
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="_layout_middle_wrap">
                <div className="_layout_middle_inner">
                    {/* Post Creation Area */}
                    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                        <form onSubmit={handlePostSubmit}>
                            <div className="_feed_inner_text_area_box">
                                <div className="_feed_inner_timeline_post_box_image">
                                    <div className="_avatar_letter">
                                        {user?.firstName?.charAt(0)}
                                    </div>
                                </div>
                                <div className="form-floating _feed_inner_text_area_box_form">
                                    <textarea
                                        className="form-control _textarea"
                                        placeholder="Write something ..."
                                        id="floatingTextarea"
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                    <label className="_feed_textarea_label" htmlFor="floatingTextarea">
                                        Write something ...
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                                            <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div style={{ marginTop: '16px', position: 'relative' }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImagePreview('');
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <div className="_feed_inner_text_area_bottom">
                                <div className="_feed_inner_text_area_item">
                                    <div className="_feed_inner_text_area_bottom_photo _feed_common">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="imageUpload"
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="button"
                                            className="_feed_inner_text_area_bottom_photo_link"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isSubmitting}
                                        >
                                            <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" />
                                                </svg>
                                            </span>
                                            Photo
                                        </button>
                                    </div>
                                </div>
                                <div className="_feed_inner_text_area_btn">
                                    <button
                                        type="submit"
                                        className="_feed_inner_text_area_btn_link"
                                        disabled={isSubmitting || (!postContent.trim() && !selectedImage)}
                                    >
                                        <svg className="_mar_img" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
                                            <path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clipRule="evenodd" />
                                        </svg>
                                        <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Posts Feed */}
                    {postsLoading ? (
                        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16" style={{ textAlign: 'center' }}>
                            <p>Loading posts...</p>
                        </div>
                    ) : postsData?.data && postsData.data.length > 0 ? (
                        postsData.data.map((post) => {
                            const isLikedByUser = post.likes.some(
                                (like) => like.userId._id === user?._id
                            );

                            return (
                                <div key={post._id} className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
                                    <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                                        <div className="_feed_inner_timeline_post_top">
                                            <div className="_feed_inner_timeline_post_box">
                                                <div className="_feed_inner_timeline_post_box_image">
                                                    <div className="_avatar_letter">
                                                        {post.userId.firstName?.charAt(0)}
                                                    </div>
                                                </div>

                                                <div className="_feed_inner_timeline_post_box_txt">
                                                    <h4 className="_feed_inner_timeline_post_box_title">
                                                        {post.userId.firstName} {post.userId.lastName}
                                                    </h4>
                                                    <p className="_feed_inner_timeline_post_box_para">
                                                        {formatTimeAgo(post.createdAt)} ·
                                                        <a href="#0">
                                                            {post.visibility === 'public' ? 'Public' : 'Private'}
                                                        </a>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                        {post.content && (
                                            <p className="_feed_inner_timeline_post_title" style={{ whiteSpace: 'pre-wrap' }}>
                                                {post.content}
                                            </p>
                                        )}
                                        {post.image && (
                                            <div className="_feed_inner_timeline_image">
                                                <img src={post.image} alt="" className="_time_img" style={{ width: '100%', borderRadius: '8px' }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                                        <div className="_feed_inner_timeline_total_reacts_image">
                                            {post.likes.length > 0 && (
                                                <>
                                                    <img src="/assets/images/react_img1.png" alt="Like" className="_react_img1" />
                                                    <p className="_feed_inner_timeline_total_reacts_para">{post.likes.length}+</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="_feed_inner_timeline_total_reacts_txt">
                                            <p className="_feed_inner_timeline_total_reacts_para1">
                                                <a href="#0"><span>{post.comments.length}</span> Comment</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="_feed_inner_timeline_reaction">
                                        <button
                                            className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLikedByUser ? '_feed_reaction_active' : ''
                                                }`}
                                        >
                                            <span className="_feed_inner_timeline_reaction_link">
                                                <span>
                                                    {isLikedByUser ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                                            <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
                                                            <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z" />
                                                            <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z" />
                                                            <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeWidth="2" d="M7 22V11M2 13v7a2 2 0 002 2h2.4M14.6 2a2 2 0 012.4 2v4h3a2 2 0 012 2l-1.2 7.2a2 2 0 01-2 1.8H7" />
                                                        </svg>
                                                    )}
                                                    {isLikedByUser ? 'Liked' : 'Like'}
                                                </span>
                                            </span>
                                        </button>
                                        <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
                                            <span className="_feed_inner_timeline_reaction_link">
                                                <span>
                                                    <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                                        <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                                                        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
                                                    </svg>
                                                    Comment
                                                </span>
                                            </span>
                                        </button>
                                        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                                            <span className="_feed_inner_timeline_reaction_link">
                                                <span>
                                                    <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                                        <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
                                                    </svg>
                                                    Share
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16" style={{ textAlign: 'center' }}>
                            <p>No posts yet. Be the first to post!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedContent;