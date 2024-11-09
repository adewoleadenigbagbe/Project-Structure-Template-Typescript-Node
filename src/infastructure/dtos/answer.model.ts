export interface ICreateAnswerRequest{
    text: string,
    userId : string
    questionId: string
}

export interface ICreateAnswerResponse{
    statusCode: number
    errors? : string[] | null,
    id? : string
}