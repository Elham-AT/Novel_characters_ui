export interface Novel {
    id: number,
    novelName: string,
    novelGenre: string
}
export interface AddNovelReq {
    novelName: string,
    novelGenre: string
}

export interface EditNovelReq {
    novelId: number,
    novelName: string,
    novelGenre: string
}