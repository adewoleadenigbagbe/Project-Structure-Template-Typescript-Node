export interface ICreateQuestionRequest{
    title : string
    tags? : string[] | null,
    text?: string,
    userId : string
}

export interface ICreateQuestionResponse{
    statusCode : number
    errors? : string[] | null,
    id?: string
}


export interface IVoteQuestionResponse{
    statusCode : number
    errors? : string[] | null
}


