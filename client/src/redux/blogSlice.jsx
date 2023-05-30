import { apiSlice } from "./apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/api/blog/singleBlog/${id}`,
      }),
      providesTags: ["Blog"],
    }),
    addComment: builder.mutation({
      query: ({ data, blogId }) => ({
        url: `/api/blog/comment/${blogId}`,
        method: "POST",
        body: data,
      }),
    }),
    editComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/blog/comment/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/blog/comment/${id}`,
        method: "DELETE",
      }),
    }),
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/singleBlog/like/${id}`,
        method: "PATCH",
      }),
    }),
    allBlogs: builder.query({
      query: () => ({
        url: "/api/blog",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),

    allCategories: builder.query({
      query: () => ({
        url: "/api/admin/category",
      }),
    }),
    searchBlogs: builder.query({
      query: ({ search, category, page }) => ({
        url: "/api/blog/search",
        params: { search, category, page },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/api/blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/blog/singleBlog/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/singleBlog/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSingleBlogQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useLikeBlogMutation,
  useAllBlogsQuery,
  useAllCategoriesQuery,
  useSearchBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogSlice;
