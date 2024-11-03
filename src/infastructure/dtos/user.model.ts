
export interface IGetUserResponse{
    statusCode : number
    errors? : string[] | null,
    user?: IUserModel
}

export interface IUserModel{
    id: string,
    name: string
    email: string
}