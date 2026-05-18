import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { type HaFormFieldSchema, type HaFormSchema } from './schemas';
import { BaseCardConfig } from '../cards/base-card';

export class BaseCardEditor extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @property({ attribute: false }) config?: BaseCardConfig;

    setConfig(config: BaseCardConfig): void {
        this.config = { ...config };
    }

    protected getSchema(): HaFormSchema[] {
        return [];
    }

    protected computeLabel(schema: HaFormSchema): string {
        return (schema as HaFormFieldSchema).name ?? '';
    }

    protected _valueChanged(e: CustomEvent): void {
        this.dispatchEvent(
            new CustomEvent('config-changed', {
                detail: { config: e.detail.value },
                bubbles: true,
                composed: true,
            }),
        );
    }

    override render(): TemplateResult {
        if (!this.config || !this.hass) return html``;

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${this.getSchema()}
                .computeLabel=${(s: HaFormSchema) => this.computeLabel(s)}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}
