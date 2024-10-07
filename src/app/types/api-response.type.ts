// Interface para a informação da API
interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

// Interface para a origem de um personagem
interface IOrigin {
  name: string;
  url: string;
}

// Interface para a localização de um personagem
interface ILocation {
  name: string;
  url: string;
}

// Interface para os detalhes de um personagem
interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string; // Data de criação do personagem
}

// Interface principal para a resposta da API
interface IApiResponse<T> {
  info: IInfo;
  results: T[];
}

export type { IApiResponse, ICharacter, IInfo, IOrigin, ILocation };
