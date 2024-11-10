export interface ICreateUserRequest{
    name: string
    email: string,
    password: string
}

export interface ICreateUserResponse{
    statusCode: number
    errors?: string[],
    Id?: string
}

export interface ILoginUserRequest{
    email: string
}

export interface ILoginUserResponse{
    statusCode: number
    errors?: string[]
    accesstoken?: string  
}