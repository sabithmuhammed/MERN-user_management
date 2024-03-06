import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        getUsers: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/users`,
                method: "GET",
            }),
        }),
        getOneUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/getUser/${data}`,
                method: "GET",
            }),
        }),
        adminUpdateUser: builder.mutation({
            query: ({ name, email, image, _id }) => {
                const formData = new FormData();
                formData.append("_id", _id);
                formData.append("name", name);
                formData.append("email", email);
                formData.append("image", image);
                return {
                    url: `${USERS_URL}/update`,
                    method: "PUT",
                    body: formData,
                };
            },
        }),
        adminAddUser: builder.mutation({
            query: (data) => {
                const { name, email, password, image } = data;
                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("image", image);
                return {
                    url: `${USERS_URL}/add-user`,
                    method: "POST",
                    body: formData,
                };
            },
        }),
        adminDeleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/delete-user/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useGetUsersMutation,
    useGetOneUserMutation,
    useAdminUpdateUserMutation,
    useAdminAddUserMutation,
    useAdminDeleteUserMutation
} = adminApiSlice;
