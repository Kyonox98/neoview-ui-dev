import { LitElement, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { HaFormFieldSchema, HaFormSchema } from './schemas';

export class BaseCardEditor extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @property({ attribute: false }) config?: Record<string, any>;

    setConfig(config: Record<string, any>): void {
        this.config = config;
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

    render(): TemplateResult {
        if (!this.config || !this.hass) return html``;

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${this.getSchema()}
                .computeLabel=${this.computeLabel.bind(this)}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}
