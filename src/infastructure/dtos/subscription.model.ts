export interface ICreateSubscriptionRequest{
    questionId: string,
    userId: string
}

export interface ICreateSubscriptionResponse{
    statusCode:  number,
    id?: string,
    errors?: string[] 
}

export interface IGetSubscriptionQuestionRequest{
    questionId: string
}

export interface IGetSubscriptionQuestionResponse{
    statusCode: number
    errors?: string[]
    subsriptions?: ISubscriptionModel[]
}

export interface ISubscriptionModel{
    text: string
    email: string
    title: string
}