import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Product = {
  id: number
  price: number
}

type purchasePayload = {
  products: Product[]
  billing: {
    name: string
    email: string
    document: string
  }
  delivery: {
    email: string
  }
  payment: {
    card: {
      active: boolean
      owner?: {
        name: string
        document: string
      }
      name?: string
      number?: string
      expires?: {
        month: number
        year: number
      }
      code?: number
    }
    installments: number
  }
}

type PurchaseResponse = {
  orderId: string
}

const api = createApi({
  //de onde vamos puxar os dados
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apisalvus.onrender.com/api/'
  }),
  //chamadas
  endpoints: (builder) => ({
    getFeaturedGame: builder.query<Game, void>({
      query: () => 'products/destaque'
    }),
    getOnSale: builder.query<Game[], void>({
      query: () => 'products/promocoes'
    }),
    getSoon: builder.query<Game[], void>({
      query: () => 'products/em-breve'
    }),
    getActionGames: builder.query<Game[], void>({
      query: () => 'products/acao'
    }),
    getSportGames: builder.query<Game[], void>({
      query: () => 'products/esportes'
    }),
    getSimulationGames: builder.query<Game[], void>({
      query: () => 'products/simulacao'
    }),
    getFightGames: builder.query<Game[], void>({
      query: () => 'products/luta'
    }),
    getRpgGames: builder.query<Game[], void>({
      query: () => 'products/rpg'
    }),
    getGame: builder.query<Game, string>({
      query: (id) => `product/${id}`
    }),
    purchase: builder.mutation<PurchaseResponse, purchasePayload>({
      query: (body) => ({
        url: 'https://fake-api-tau.vercel.app/api/eplay/checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetFeaturedGameQuery,
  useGetSoonQuery,
  useGetOnSaleQuery,
  useGetActionGamesQuery,
  useGetSportGamesQuery,
  useGetSimulationGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery,
  useGetGameQuery,
  usePurchaseMutation
} = api

export default api
