export interface IBreedsResponse {
  message: { [key: string]: string[] };
  status: string;
}

export interface IBreed {
  name: string;
  subBreeds: string[];
}