export interface Utilisateur {
  id: string
  nom: string
  email: string
  telephone: string
}

export interface UtilisateurApiDTO {
  id: string
  fullName: string
  email: string
  phoneNumber: string
}

export function versUtilisateurDomaine(dto: UtilisateurApiDTO): Utilisateur {
  return {
    id: dto.id,
    nom: dto.fullName,
    email: dto.email,
    telephone: dto.phoneNumber,
  }
}
