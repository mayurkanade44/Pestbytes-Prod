import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/api/user/verify-account",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `/api/user/profile/${id}`,
      }),
      providesTags: ["User"],
    }),
    updateProfilePic: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/user/profile/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/user/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateProfilePicMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userSlice;
