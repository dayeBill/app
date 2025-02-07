import { unInstance } from '@/service'

export default class {
  protected path: string = ''
  protected request = unInstance
  constructor(path: string | null = null) {
    if (this.path !== null) {
      this.path = path
    }
  }

  index(query: object = {}) {
    return this.request.get(this.path, { params: query })
  }

  find(id: string | number) {
    return this.request.get(`${this.path}/${id}`)
  }

  create(data: object = {}) {
    return this.request.post(this.path, data)
  }

  update(id: string | number, data: object = {}) {
    return this.request.put(`${this.path}/${id}`, data)
  }

  destroy(id: string | number) {
    return this.request.delete(`${this.path}/${id}`)
  }

  options() {
    return this.request.get(`${this.path}/options`)
  }
}
