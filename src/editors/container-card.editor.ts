import { html, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { LovelaceCardConfig } from 'custom-card-helpers';
import { BaseCardEditor } from './base-card.editor';
import {
    CARD_LABELS,
    CARD_SCHEMAS,
    CONTAINER_CARD_GRID_SCHEMA,
    CONTAINER_CARD_LABELS,
    CONTAINER_CARD_SCHEMA,
    type HaFormFieldSchema,
    type HaFormSchema,
    type HaLabels,
} from './schemas';
import { containerCardEditorStyles } from '../styles/container-card.editor.styles';

const CARD_STUBS: Record<string, LovelaceCardConfig> = {
    'custom:neoview-text-card': {
        type: 'custom:neoview-text-card',
        text: 'Nouveau texte',
    },
    'custom:neoview-entity-card': {
        type: 'custom:neoview-entity-card',
        entity: 'sun.sun',
    },
};

@customElement('neoview-container-card-editor')
export class ContainerCardEditor extends BaseCardEditor {
    @state() private _newCardType = 'custom:neoview-text-card';

    protected override getSchema(): HaFormSchema[] {
        const layout = (this.config?.layout as string) ?? 'vertical';
        return layout === 'grid'
            ? CONTAINER_CARD_GRID_SCHEMA
            : CONTAINER_CARD_SCHEMA;
    }

    protected override computeLabel(schema: HaFormSchema): string {
        const name = (schema as HaFormFieldSchema).name;
        return CONTAINER_CARD_LABELS[name] ?? name;
    }

    private _getChildSchema(type: string): HaFormSchema[] {
        return CARD_SCHEMAS[type] ?? [];
    }

    private _childComputeLabel(type: string, schema: HaFormSchema): string {
        const labels: HaLabels = CARD_LABELS[type] ?? {};
        const name = (schema as HaFormFieldSchema).name;
        return labels[name] ?? name;
    }

    private _addCard(): void {
        const cards = [...(this.config?.cards ?? [])];
        cards.push(
            CARD_STUBS[this._newCardType] ?? { type: this._newCardType },
        );
        this._valueChanged(
            new CustomEvent('value-changed', {
                detail: {
                    value: {
                        type: this.config!.type,
                        ...this.config,
                        cards,
                    },
                },
            }),
        );
    }

    private _removeCard(index: number): void {
        const cards = [...(this.config?.cards ?? [])];
        cards.splice(index, 1);
        this._valueChanged(
            new CustomEvent('value-changed', {
                detail: {
                    value: {
                        type: this.config!.type,
                        ...this.config,
                        cards,
                    },
                },
            }),
        );
    }

    private _updateCard(index: number, updated: LovelaceCardConfig): void {
        const cards = [...(this.config?.cards ?? [])];
        cards[index] = updated;
        this._valueChanged(
            new CustomEvent('value-changed', {
                detail: {
                    value: {
                        type: this.config!.type,
                        ...this.config,
                        cards,
                    },
                },
            }),
        );
    }

    private _renderChildCard(
        card: LovelaceCardConfig,
        index: number,
    ): TemplateResult {
        const label = card.type.replace('custom:neoview-', '');
        return html`
            <ha-expansion-panel outlined>
                <div slot="header" class="card-header">
                    <span class="card-label">${label}</span>
                    <button
                        class="delete-btn"
                        @click=${(e: Event) => {
                            e.stopPropagation();
                            this._removeCard(index);
                        }}
                    >
                        <ha-icon icon="mdi:delete"></ha-icon>
                    </button>
                </div>
                <ha-form
                    .hass=${this.hass}
                    .data=${card}
                    .schema=${this._getChildSchema(card.type)}
                    .computeLabel=${(s: HaFormSchema) =>
                        this._childComputeLabel(card.type, s)}
                    @value-changed=${(e: CustomEvent) =>
                        this._updateCard(index, e.detail.value)}
                ></ha-form>
            </ha-expansion-panel>
        `;
    }

    private _renderAddRow(): TemplateResult {
        return html`
            <div class="add-row">
                <select
                    @change=${(e: Event) => {
                        this._newCardType = (
                            e.target as HTMLSelectElement
                        ).value;
                    }}
                >
                    ${Object.keys(CARD_STUBS).map(
                        (type) => html`
                            <option value=${type}>
                                ${type.replace('custom:neoview-', '')}
                            </option>
                        `,
                    )}
                </select>
                <button @click=${this._addCard.bind(this)}>Ajouter</button>
            </div>
        `;
    }

    override render(): TemplateResult {
        if (!this.config || !this.hass) return html``;

        const cards: LovelaceCardConfig[] =
            (this.config?.cards as LovelaceCardConfig[]) ?? [];

        return html`
            <ha-expansion-panel outlined>
                <span slot="header">Container</span>
                <ha-form
                    .hass=${this.hass}
                    .data=${this.config}
                    .schema=${this.getSchema()}
                    .computeLabel=${this.computeLabel.bind(this)}
                    @value-changed=${this._valueChanged.bind(this)}
                ></ha-form>
            </ha-expansion-panel>

            <ha-expansion-panel outlined>
                <span slot="header">Cartes (${cards.length})</span>
                <div class="cards-list">
                    ${cards.map((card, index) =>
                        this._renderChildCard(card, index),
                    )}
                    ${this._renderAddRow()}
                </div>
            </ha-expansion-panel>
        `;
    }

    static override styles: CSSResultGroup = containerCardEditorStyles;
}
