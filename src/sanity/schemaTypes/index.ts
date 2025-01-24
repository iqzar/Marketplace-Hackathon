import { type SchemaTypeDefinition } from 'sanity'
import { products } from './product'
import { orders } from './orders'
import { category } from './category'
import { subcategory } from './subcategories'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, orders, category, subcategory]
}
