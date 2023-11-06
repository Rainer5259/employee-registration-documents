import { Employees, EmployeesRegistersDocumentsInterface } from '~/utils/types'
import { Api } from '.'
import { Promotion } from '~/utils/enums/promotion'
import { ContractStatus } from '~/utils/enums/contract'

class FirestoreService extends Api {
  constructor() {
    super('employees')
  }

  async sendDocument(data: EmployeesRegistersDocumentsInterface) {
    const response = await this.sendDocumentToStore(data)
    return response
  }

  /**ERD: Employees Registers Documents*/
  async fetchDocs() {
    const response = await this.fetchAllListERD()
    return response
  }

  async fetchDocsByUserID(uid: string) {
    const response = await this.fetchListERDByUserID(uid)
    return response.map(e => e.doc)
  }

  async fetchDocByDocID(docID: string) {
    const response = await this.fetchERDByDocID(docID)
    return response.data()
  }

  async updateDocumentWithID(
    docID: string,
    data: EmployeesRegistersDocumentsInterface
  ) {
    const response = await this.updateDocument(docID, data)
    return response
  }

  async updateHistoryDocumentWithID(docID: string, data: Employees) {
    const response = await this.updateHistoryDocument(docID, data)
    return response
  }

  async uploadFile(docID: string, data: Uint8Array) {
    const response = await this.uploadFileToStorage(docID, data)
    return response
  }

  async downloadFile(docID: string) {
    const response = await this.getURLFileFromStorage(docID)
    return response
  }

  async promoteEmployeeWithID(docID: string, data: Promotion) {
    const response = await this.promoteEmployee(docID, data)
    return response
  }

  async terminateContractWithID(docID: string) {
    const response = await this.deleteEmployee(docID)
    return response
  }
}

export default new FirestoreService()
