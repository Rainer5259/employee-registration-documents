import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export interface DocumentsListProps {
  data: QueryDocumentSnapshot<DocumentData, DocumentData>[]
  onPressPromote: () => void
  onPressTerminateContract: () => void
}
