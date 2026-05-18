import { customElement } from 'lit/decorators.js';
import { BaseCardEditor } from './base-card.editor';
import {
    ENTITY_CARD_SCHEMA,
    ENTITY_CARD_LABELS,
    type HaFormFieldSchema,
    type HaFormSchema,
} from './schemas';

@customElement('neoview-entity-card-editor')
export class EntityCardEditor extends BaseCardEditor {
    protected override getSchema(): HaFormSchema[] {
        return ENTITY_CARD_SCHEMA;
    }

    protected override computeLabel(schema: HaFormSchema): string {
        const name = (schema as HaFormFieldSchema).name;
        return ENTITY_CARD_LABELS[name] ?? name;
    }
}
