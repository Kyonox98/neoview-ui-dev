import { customElement } from 'lit/decorators.js';
import { BaseCardEditor } from './base-card.editor';
import {
    TEXT_CARD_SCHEMA,
    TEXT_CARD_LABELS,
    type HaFormFieldSchema,
    type HaFormSchema,
} from './schemas';

@customElement('neoview-text-card-editor')
export class TextCardEditor extends BaseCardEditor {
    protected override getSchema(): HaFormSchema[] {
        return TEXT_CARD_SCHEMA;
    }

    protected override computeLabel(schema: HaFormSchema): string {
        const name = (schema as HaFormFieldSchema).name;
        return TEXT_CARD_LABELS[name] ?? name;
    }
}
