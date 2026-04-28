import {
    LitElement,
    html,
    type TemplateResult,
    type PropertyValues,
    type CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { baseCardStyles } from './styles/base-card.styles';

export interface BaseCardConfig extends LovelaceCardConfig {
    title?: string;
    show_title?: boolean;
    cards?: LovelaceCardConfig[];
}

export class BaseCard extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() protected _config?: BaseCardConfig;

    protected showHeader: boolean = true;

    setConfig(config: BaseCardConfig): void {
        if (!config) throw new Error('Config required');
        this._config = config;
    }

    getCardSize(): number {
        return this._config?.cards?.length
            ? Math.max(1, this._config.cards.length * 2)
            : 3;
    }

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has('hass') && this.hass) {
            this.shadowRoot
                ?.querySelectorAll<any>('hui-card')
                .forEach((card) => (card.hass = this.hass));
        }
    }

    protected renderChildCards(): TemplateResult {
        if (!this._config?.cards?.length) {
            return html`
                <div class="empty-state">
                    <span>Aucune carte configurée.</span>
                </div>
            `;
        }
        return html`
            <div class="cards-container">
                ${this._config.cards.map(
                    (cardConfig) => html`
                        <hui-card
                            .config=${cardConfig}
                            .hass=${this.hass}
                        ></hui-card>
                    `,
                )}
            </div>
        `;
    }

    protected renderContent(): TemplateResult {
        return this.renderChildCards();
    }

    render(): TemplateResult {
        const displayHeader =
            this.showHeader &&
            (this._config?.show_title ?? true) &&
            !!this._config?.title;

        return html`
            <div class="card">
                ${displayHeader
                    ? html`<div class="card-header">
                          ${this._config!.title}
                      </div>`
                    : ''}
                <div class="card-content">${this.renderContent()}</div>
            </div>
        `;
    }

    static styles: CSSResultGroup = baseCardStyles;
}
