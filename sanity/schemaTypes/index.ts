import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { playerType } from './playerType'
import { scoutingReportType } from './scoutingReportType'
import { playerAnalysisType } from './playerAnalysisType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    playerType,
    scoutingReportType,
    playerAnalysisType,
  ],
}
