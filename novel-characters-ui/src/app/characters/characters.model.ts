import { Novel } from "../novels/novel.model";

export interface Character {
    id: number,
    name: string,
    gender: string,
    age: number,
    novel: Novel
}

export interface AddCharacterReq {
    name: string,
    gender: string,
    age: number,
    novelId: number
}

export interface EditCharacterReq {
    characterId: number,
    name: string,
    gender: string,
    age: number,
    novelId: number
}