import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { API_BASE_URL } from './authApi';


export interface Like {
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt: string;
}

export interface Reply {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    content: string;
    likes: Like[];
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    content: string;
    likes: Like[];
    replies: Reply[];
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    content: string;
    image?: string;
    visibility: 'public' | 'private';
    likes: Like[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostRequest {
    content: string;
    image?: string;
    visibility?: 'public' | 'private';
}

export interface PostResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Post;
}

export interface PostsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Post[];
}

export interface AddCommentRequest {
    content: string;
}

export interface CommentResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Comment;
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        createPost: builder.mutation<PostResponse, CreatePostRequest>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData,
            }),
            invalidatesTags: ['Post'],
        }),

        getAllPosts: builder.query<PostsResponse, void>({
            query: () => '/posts',
            providesTags: ['Post'],
        }),

        togglePostLike: builder.mutation<PostResponse, string>({
            query: (postId) => ({
                url: `/posts/${postId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),

        addComment: builder.mutation<PostResponse, { postId: string; content: string }>({
            query: ({ postId, content }) => ({
                url: `/posts/${postId}/comments`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: ['Post'],
        }),

        toggleCommentLike: builder.mutation<PostResponse, { postId: string; commentId: string }>({
            query: ({ postId, commentId }) => ({
                url: `/posts/${postId}/comments/${commentId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),

        addReply: builder.mutation<PostResponse, { postId: string; commentId: string; content: string }>({
            query: ({ postId, commentId, content }) => ({
                url: `/posts/${postId}/comments/${commentId}/replies`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: ['Post'],
        }),

        toggleReplyLike: builder.mutation<PostResponse, { postId: string; commentId: string; replyId: string }>({
            query: ({ postId, commentId, replyId }) => ({
                url: `/posts/${postId}/comments/${commentId}/replies/${replyId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),

        getPostLikes: builder.query<{ success: boolean; statusCode: number; message: string; data: Like[] }, string>({
            query: (postId) => `/posts/${postId}/likes`,
            providesTags: ['Post'],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useTogglePostLikeMutation,
    useAddCommentMutation,
    useToggleCommentLikeMutation,
    useAddReplyMutation,
    useToggleReplyLikeMutation,
    useGetPostLikesQuery,
} = postApi;
