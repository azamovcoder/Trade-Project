import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: (params) => ({
        url: "/get/customers",
        params,
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: build.query({
      query: (id) => ({
        url: `get/customer/${id}`,
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (body) => ({
        url: "create/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, body }) => ({
        url: `delete/customer/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
} = productApi;
