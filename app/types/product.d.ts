export interface Product {
  id?: string,
  name: string,
  productOwner: string,
  developers: string[],
  scrumMaster: string,
  startDate: string,
  methodology: string,
  repoURL: string
}