export interface QA {
    description: string, 
    options: Options[] 
}

export interface Options{
    id: number,
    description: string,
    is_correct: boolean,
    question_id: number,
    [key: string]: any
}