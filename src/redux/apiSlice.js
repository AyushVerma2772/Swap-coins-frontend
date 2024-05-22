import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["AllAds"],
    endpoints: (builder) => ({
        getAllAds: builder.query({
            query: (page) => `ads?page=${page}`,
            providesTags: ["AllAds"]
        }),

        getAd: builder.query({
            query: (adId) => `ads/${adId}`,
        }),

        getUserInfo: builder.query({
            query: (userId) => `userinfo/${userId}`,
        }),

        createAd: builder.mutation({
            query: (ad) => ({
                url: "/createad",
                method: "POST",
                body: ad
            }),
            invalidatesTags: ["AllAds"]
        })
    }),
});

export const { useGetAllAdsQuery, useGetAdQuery, useGetUserInfoQuery, useCreateAdMutation } = api;
