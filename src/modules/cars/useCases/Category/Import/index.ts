import { CategoryImportService } from './CategoryImportService'
import { CategoryImportController } from './CategoryImportController'

const categoryImportService = new CategoryImportService()
const categoryImportController = new CategoryImportController(categoryImportService)

export { categoryImportController }
