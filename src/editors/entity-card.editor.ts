import { customElement } from 'lit/decorators.js';
import { BaseCardEditor } from './base-card.editor';
import { ENTITY_CARD_SCHEMA, ENTITY_CARD_LABELS } from './schemas';

@customElement('neoview-entity-card-editor')
export class EntityCardEditor extends BaseCardEditor {
    protected getSchema() {
        return ENTITY_CARD_SCHEMA;
    }
    protected computeLabel(schema: any): string {
        return ENTITY_CARD_LABELS[schema.name] ?? schema.name;
    }
}
