export type TypeOperation = 'COLLECTE' | 'TRANSFERT'

export type StatutTransaction = 'SUCCESS' | 'PENDING' | 'FAILED'

export type Operateur = 'ORANGE_MONEY' | 'WAVE' | 'MTN_MONEY' | 'MOOV_MONEY'

/** Forme brute renvoyée par l'API (à ajuster dès que la doc backend est connue). */
export interface TransactionApiDTO {
  id: string
  externalReference?: string | null
  type: TypeOperation
  amount: number
  phoneNumber: string
  operator: Operateur
  status: StatutTransaction
  createdAt: string
  updatedAt: string
}

/** Modèle domaine utilisé dans l'application (stores, composants). */
export interface Transaction {
  reference: string
  referenceExterne: string | null
  type: TypeOperation
  montant: number
  numero: string
  operateur: Operateur
  statut: StatutTransaction
  creeLe: Date
  misAJourLe: Date
}

export function versTransactionDomaine(dto: TransactionApiDTO): Transaction {
  return {
    reference: dto.id,
    referenceExterne: dto.externalReference ?? null,
    type: dto.type,
    montant: dto.amount,
    numero: dto.phoneNumber,
    operateur: dto.operator,
    statut: dto.status,
    creeLe: new Date(dto.createdAt),
    misAJourLe: new Date(dto.updatedAt),
  }
}
