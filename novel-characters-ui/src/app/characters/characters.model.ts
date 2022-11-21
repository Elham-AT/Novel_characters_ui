import { Novel } from "../novels/novel.model";

export interface Character {
    id: number,
    name: string,
    gender: string,
    age: number,
    novel: Novel
}