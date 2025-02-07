import { unInstance } from '@/service'

export default class {
  constructor(protected path: string) {

  }

  index(query: object = {}) {
    return unInstance.get(this.path, { params: query })
  }

  find(id: string | number) {
    return unInstance.get(`${this.path}/${id}`)
  }

  create(data: object = {}) {
    return unInstance.post(this.path, data)
  }

  update(id: string | number, data: object = {}) {
    return unInstance.put(`${this.path}/${id}`, data)
  }

  destroy(id: string | number) {
    return unInstance.delete(`${this.path}/${id}`)
  }
}
