export function formaterMontant(montant: number, devise = 'FCFA'): string {
  return `${new Intl.NumberFormat('fr-FR').format(montant)} ${devise}`
}

export function formaterDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

export function masquerNumero(numero: string): string {
  if (numero.length <= 4) return numero
  return `${numero.slice(0, 2)}••••${numero.slice(-2)}`
}
