import { type CSSResultGroup, type TemplateResult, html } from 'lit';
import { BaseCard, type BaseCardConfig } from '../base-card';
import {
    baseCardStyles,
    containerCardStyles,
} from '../styles/base-card.styles';

export type ContainerLayout = 'vertical' | 'horizontal' | 'grid';

export interface ContainerCardConfig extends BaseCardConfig {
    layout?: ContainerLayout;
    columns?: number;
    min_width?: number;
}

export class ContainerCard extends BaseCard {
    setConfig(config: ContainerCardConfig): void {
        super.setConfig(config);
    }

    private get containerConfig(): ContainerCardConfig {
        return this.config as ContainerCardConfig;
    }

    protected renderContent(): TemplateResult {
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
                            style="--ha-card-background: transparent; --ha-card-box-shadow: none; --ha-card-border-width: 0px; background: transparent;"
                            .config=${{ ...cardConfig, seamless: true }}
                            .hass=${this.hass}
                        ></hui-card>
                    `,
                )}
            </div>
        `;
    }

    protected updated(changedProps: import('lit').PropertyValues): void {
        super.updated(changedProps);

        const layout = this.containerConfig?.layout ?? 'vertical';
        const container =
            this.shadowRoot?.querySelector<HTMLElement>('.cards-container');

        if (!container) return;

        container.dataset.layout = layout;

        if (layout === 'grid') {
            const minWidth = this.containerConfig?.min_width;
            const columns = this.containerConfig?.columns ?? 2;
            const template = minWidth
                ? `repeat(auto-fill, minmax(${minWidth}px, 1fr))`
                : `repeat(${columns}, minmax(0, 1fr))`;
            container.style.setProperty('--grid-template', template);
        } else {
            container.style.removeProperty('--grid-template');
        }
    }

    static styles: CSSResultGroup = [baseCardStyles, containerCardStyles];
}
