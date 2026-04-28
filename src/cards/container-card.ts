import { css, type CSSResultGroup, type TemplateResult } from 'lit';
import { BaseCard, type BaseCardConfig } from '../base-card';
import { baseCardStyles, containerCardStyle } from '../styles/base-card.styles';

export type ContainerLayout = 'vertical' | 'horizontal' | 'grid';

export interface ContainerCardConfig extends BaseCardConfig {
    layout?: ContainerLayout;
    columns?: number;
}

export class ContainerCard extends BaseCard {
    // showHeader = true (inherited)

    setConfig(config: ContainerCardConfig): void {
        super.setConfig(config);
    }

    private get _containerConfig(): ContainerCardConfig {
        return this._config as ContainerCardConfig;
    }

    protected renderContent(): TemplateResult {
        return this.renderChildCards();
    }

    protected updated(changedProps: import('lit').PropertyValues): void {
        super.updated(changedProps);
        const layout = this._containerConfig?.layout ?? 'vertical';
        const columns = this._containerConfig?.columns ?? 2;

        const container =
            this.shadowRoot?.querySelector<HTMLElement>('.cards-container');
        if (!container) return;

        container.dataset['layout'] = layout;
        if (layout === 'grid') {
            container.style.setProperty('--grid-columns', String(columns));
        }
    }

    static styles: CSSResultGroup = [baseCardStyles, containerCardStyle];
}
