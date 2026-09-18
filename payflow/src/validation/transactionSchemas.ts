import { z } from 'zod'

const MONTANT_MIN = 100
const MONTANT_MAX = 2_000_000

export const schemaMontant = z
  .number({ message: 'Le montant doit être un nombre.' })
  .min(MONTANT_MIN, `Le montant minimum est de ${MONTANT_MIN} FCFA.`)
  .max(MONTANT_MAX, `Le montant maximum est de ${MONTANT_MAX} FCFA.`)

export const schemaNumeroMobileMoney = z
  .string()
  .regex(/^0[157][0-9]{8}$/, 'Le numéro doit être un numéro Mobile Money valide (ex. 07XXXXXXXX).')

export const schemaOperateur = z.enum(['ORANGE_MONEY', 'WAVE', 'MTN_MONEY', 'MOOV_MONEY'], {
  message: 'Veuillez sélectionner un opérateur.',
})

export const schemaCollecte = z.object({
  montant: schemaMontant,
  numero: schemaNumeroMobileMoney,
  operateur: schemaOperateur,
})

export const schemaTransfert = z.object({
  montant: schemaMontant,
  numero: schemaNumeroMobileMoney,
  operateur: schemaOperateur,
})

export type ValeursCollecte = z.infer<typeof schemaCollecte>
export type ValeursTransfert = z.infer<typeof schemaTransfert>
