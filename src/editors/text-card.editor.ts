import { customElement } from 'lit/decorators.js';
import { BaseCardEditor } from './base-card.editor';
import { TEXT_CARD_SCHEMA, TEXT_CARD_LABELS } from './schemas';

@customElement('neoview-text-card-editor')
export class TextCardEditor extends BaseCardEditor {
    protected getSchema() {
        return TEXT_CARD_SCHEMA;
    }
    protected computeLabel(schema: any): string {
        return TEXT_CARD_LABELS[schema.name] ?? schema.name;
    }
}
