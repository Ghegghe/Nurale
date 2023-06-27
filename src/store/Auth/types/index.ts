export interface UserLogin {
    stsTokenManager: {
        accessToken: string
        refreshToken: string
    }
}

export interface initialStateAuth {
    data: any[]
    loading: boolean
    error: string | null
}