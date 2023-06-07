import { apiSlice } from "./apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adImageRequest: builder.mutation({
      query: (data) => ({
        url: "/api/admin/adImageRequest",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAdImageRequestMutation } = adminSlice;
