import { Category } from '~/types/category.type'
import http from '~/utils/http'
const URL_CATEGORIES = '/api_category.php'
const categoryApi = {
  getCategories() {
    return http.get<Category>(URL_CATEGORIES)
  }
}

export default categoryApi
