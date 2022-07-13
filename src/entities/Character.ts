import { CharacterDto } from "./CharacterDto";

export class Character implements CharacterDto {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public isFavorite: boolean
  ) { }
}