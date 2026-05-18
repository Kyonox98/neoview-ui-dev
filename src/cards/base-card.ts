import {
    LitElement,
    html,
    type TemplateResult,
    type PropertyValues,
    type CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { baseCardStyles } from '../styles/base-card.styles';

export interface BaseCardConfig extends LovelaceCardConfig {
    title?: string;
    show_title?: boolean;
    seamless?: boolean;
    padding?: number;
    opacity?: number;
    cards?: LovelaceCardConfig[];
}

export abstract class BaseCard extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() protected config?: BaseCardConfig;
    @property({ type: Boolean, reflect: true }) seamless = false;

    protected showHeader: boolean = true;

    setConfig(config: BaseCardConfig): void {
        if (!config) throw new Error('[BaseCard] Config required');
        this.config = { ...config };
        this.seamless = !!config.seamless;
    }

    getCardSize(): number {
        const childCount = this.config?.cards?.length ?? 0;
        return childCount > 0 ? Math.max(1, Math.ceil(childCount / 2)) : 3;
    }

    protected override updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has('hass') && this.hass) {
            this.shadowRoot
                ?.querySelectorAll<
                    HTMLElement & { hass?: HomeAssistant }
                >('hui-card')
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

    override render(): TemplateResult {
        const displayHeader =
            this.showHeader &&
            (this.config?.show_title ?? true) &&
            !!this.config?.title;

        const inlineStyles = [
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
            <ha-card style=${inlineStyles}>
                ${displayHeader
                    ? html`<div class="card-header">${this.config!.title}</div>`
                    : ''}
                <div class="card-content">${this.renderContent()}</div>
            </ha-card>
        `;
    }

    static override styles: CSSResultGroup = baseCardStyles;
}
