import {Artista} from "./artista";

export interface Festival {
  id: string;
  nombre: string;
  lugar: string;
  fecha: string;
  artistas: Artista[];
}
