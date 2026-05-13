import { type CSSResultGroup, type TemplateResult, html } from 'lit';
import { BaseCard, type BaseCardConfig } from './base-card';
import { baseCardStyles } from '../styles/base-card.styles';
import { containerCardStyles } from '../styles/container-card.styles';

export type ContainerLayout = 'vertical' | 'horizontal' | 'grid';

export interface ContainerCardConfig extends BaseCardConfig {
    layout?: ContainerLayout;
    columns?: number;
    min_width?: number;
    gap?: number;
    divider?: boolean;
}

export class ContainerCard extends BaseCard {
    setConfig(config: ContainerCardConfig): void {
        super.setConfig(config);
    }

    private get containerConfig(): ContainerCardConfig {
        return this.config as ContainerCardConfig;
    }

    static getConfigElement() {
        return document.createElement('neoview-container-card-editor');
    }
    static getStubConfig() {
        return {
            type: 'custom:neoview-container-card',
            layout: 'vertical',
            cards: [],
        };
    }

    protected renderContent(): TemplateResult {
        if (!this.config?.cards?.length) {
            return html`<div class="empty-state">
                <span>Aucune carte configurée.</span>
            </div>`;
        }

        const rawLayout = this.containerConfig?.layout ?? 'vertical';
        const columns =
            rawLayout === 'grid'
                ? (this.containerConfig?.columns ?? 2)
                : this.config.cards.length;
        const layout =
            rawLayout !== 'vertical' && columns === 1 ? 'vertical' : rawLayout;
        const showDivider = this.containerConfig?.divider ?? false;

        if (layout === 'vertical') {
            return html`
                <div class="cards-container">
                    ${this.config.cards.map(
                        (cardConfig, index) => html`
                            ${index > 0 && showDivider
                                ? html`<div class="divider"></div>`
                                : ''}
                            <hui-card
                                .config=${{ ...cardConfig, seamless: true }}
                                .hass=${this.hass}
                            ></hui-card>
                        `,
                    )}
                </div>
            `;
        }

        const cols: (typeof this.config.cards)[] = Array.from(
            { length: columns },
            () => [],
        );
        this.config.cards.forEach((card, i) => cols[i % columns].push(card));

        return html`
            <div class="cards-container">
                ${cols.map(
                    (colCards, colIndex) => html`
                        <div
                            class="column ${colIndex < columns - 1 &&
                            showDivider
                                ? 'has-divider'
                                : ''}"
                        >
                            ${colCards.map(
                                (cardConfig) => html`
                                    <hui-card
                                        .config=${{
                                            ...cardConfig,
                                            seamless: true,
                                        }}
                                        .hass=${this.hass}
                                    ></hui-card>
                                `,
                            )}
                        </div>
                    `,
                )}
            </div>
        `;
    }

    protected updated(changedProps: import('lit').PropertyValues): void {
        super.updated(changedProps);

        const rawLayout = this.containerConfig?.layout ?? 'vertical';
        const columns = this.containerConfig?.columns ?? 2;
        const layout =
            rawLayout !== 'vertical' && columns === 1 ? 'vertical' : rawLayout;
        const container =
            this.shadowRoot?.querySelector<HTMLElement>('.cards-container');

        if (!container) return;

        container.dataset.layout = layout;

        if (layout === 'grid') {
            const minWidth = this.containerConfig?.min_width;
            const template = minWidth
                ? `repeat(auto-fill, minmax(${minWidth}px, 1fr))`
                : `repeat(${columns}, minmax(0, 1fr))`;
            container.style.setProperty('--grid-template', template);
        } else {
            container.style.removeProperty('--grid-template');
        }

        if (this.containerConfig?.gap != null) {
            container.style.setProperty(
                '--cards-gap',
                `${this.containerConfig.gap}px`,
            );
        } else {
            container.style.removeProperty('--cards-gap');
        }

        // if (this.containerConfig?.divider) {
        //     container.style.setProperty('--show-divider', '1');
        // } else {
        //     container.style.removeProperty('--show-divider');
        // }
    }

    static styles: CSSResultGroup = [baseCardStyles, containerCardStyles];
}
