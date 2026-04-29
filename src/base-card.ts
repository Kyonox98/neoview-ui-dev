import {
    LitElement,
    html,
    type TemplateResult,
    type PropertyValues,
    type CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { baseCardStyles } from './base-card.styles';

export interface BaseCardConfig extends LovelaceCardConfig {
    title?: string;
    show_title?: boolean;
    seamless?: boolean;
    padding?: number;
    opacity?: number;
    cards?: LovelaceCardConfig[];
}

export class BaseCard extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() protected config?: BaseCardConfig;
    @property({ type: Boolean, reflect: true }) seamless = false;

    protected showHeader: boolean = true;

    setConfig(config: BaseCardConfig): void {
        if (!config) throw new Error('Config required');
        this.config = config;
        this.seamless = !!(config as any).seamless;
    }

    getCardSize(): number {
        return this.config?.cards?.length
            ? Math.max(1, this.config.cards.length / 2)
            : 3;
    }

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has('hass')) {
            this.shadowRoot
                ?.querySelectorAll<any>('hui-card')
                .forEach((card) => {
                    card.hass = this.hass;
                });
        }
    }

    protected renderChildCards(): TemplateResult {
        if (!this.config?.cards?.length) {
            return html`
                <div class="empty-state">
                    <span>Aucune carte configurée.</span>
                </div>
            `;
        }

        return html`
            <div class="cards-container">
                ${this.config.cards.map(
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
            (this.config?.show_title ?? true) &&
            !!this.config?.title;

        const cardStyle = [
            this.config?.padding != null
                ? `--card-padding: ${this.config.padding}px`
                : '',
            this.config?.opacity != null
                ? `--card-opacity: ${this.config.opacity}`
                : '',
        ]
            .filter(Boolean)
            .join('; ');

        return html`
            <div class="card" style=${cardStyle}>
                ${displayHeader
                    ? html`<div class="card-header">${this.config!.title}</div>`
                    : ''}
                <div class="card-content">${this.renderContent()}</div>
            </div>
        `;
    }

    static styles: CSSResultGroup = baseCardStyles;
}
