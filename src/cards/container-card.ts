import { type CSSResultGroup, type TemplateResult, type PropertyValues, html } from 'lit';
import { BaseCard, type BaseCardConfig } from './base-card';
import { containerCardStyles } from '../styles/container-card.styles';

export type ContainerLayout = 'vertical' | 'horizontal' | 'grid';

export interface ContainerCardConfig extends BaseCardConfig {
    layout?: ContainerLayout;
    columns?: number;
    gap?: number;
    divider?: boolean;
}

export class ContainerCard extends BaseCard {
    private get containerConfig(): ContainerCardConfig {
        return this.config as ContainerCardConfig;
    }

    static getConfigElement(): HTMLElement {
        return document.createElement('neoview-container-card-editor');
    }

    static getStubConfig(): ContainerCardConfig {
        return {
            type: 'custom:neoview-container-card',
            layout: 'vertical',
            cards: [],
        };
    }

    override getCardSize(): number {
        const childCount = this.config?.cards?.length ?? 0;
        const layout = this.resolveLayout();
        const columns = this.containerConfig?.columns ?? 2;
        if (layout === 'grid' || layout === 'horizontal') {
            return Math.max(1, Math.ceil(childCount / columns));
        }
        return Math.max(1, childCount);
    }

    private resolveLayout(): ContainerLayout {
        const raw = this.containerConfig?.layout ?? 'vertical';
        const columns = this.containerConfig?.columns ?? 2;
        return raw !== 'vertical' && columns === 1 ? 'vertical' : raw;
    }

    protected override renderContent(): TemplateResult {
        if (!this.config?.cards?.length) {
            return this.renderEmptyState('Aucune carte configurée.');
        }

        const layout = this.resolveLayout();
        const columns =
            layout === 'grid' ? (this.containerConfig?.columns ?? 2) : this.config.cards.length;
        const showDivider = this.containerConfig?.divider ?? false;

        if (layout === 'vertical') {
            return html`
                <div class="cards-container">
                    ${this.config.cards.map(
                        (cardConfig, index) => html`
                            ${index > 0 && showDivider ? html`<div class="divider"></div>` : ''}
                            <hui-card
                                .config=${{ ...cardConfig, seamless: true }}
                                .hass=${this.hass}
                            ></hui-card>
                        `,
                    )}
                </div>
            `;
        }

        const cols: (typeof this.config.cards)[] = Array.from({ length: columns }, () => []);
        this.config.cards.forEach((card, i) => cols[i % columns].push(card));

        return html`
            <div class="cards-container">
                ${cols.map(
                    (colCards, colIndex) => html`
                        <div
                            class="column ${colIndex < columns - 1 && showDivider
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

    protected override updated(changedProps: PropertyValues): void {
        super.updated(changedProps);

        const layout = this.resolveLayout();
        const columns = this.containerConfig?.columns ?? 2;
        const container = this.shadowRoot?.querySelector<HTMLElement>('.cards-container');

        if (!container) return;

        container.dataset['layout'] = layout;

        if (layout === 'grid') {
            const template = `repeat(${columns}, minmax(0, 1fr))`;
            container.style.setProperty('--grid-template', template);
        } else {
            container.style.removeProperty('--grid-template');
        }

        if (this.containerConfig?.gap != null) {
            container.style.setProperty('--cards-gap', `${this.containerConfig.gap}px`);
        } else {
            container.style.removeProperty('--cards-gap');
        }
    }

    static override get styles(): CSSResultGroup {
        return [super.styles, containerCardStyles];
    }
}
