import resource from './resource'

export class Bills extends resource {
  protected path: string = '/api/bill/bills'

  public name: string = 'bills'

  summary(query: object = {}) {
    return this.request.get(`${this.path}/summary`, { params: query })
  }
}
