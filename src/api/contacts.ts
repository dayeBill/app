import resource from './resource'

export class Contacts extends resource {
  protected path: string = '/api/bill/contacts'

  public name: string = 'contacts'
}
