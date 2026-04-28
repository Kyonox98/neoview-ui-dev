import { html, type CSSResultGroup, type TemplateResult } from 'lit';
import { BaseCard, type BaseCardConfig } from '../base-card';
import { baseCardStyles, textCardStyles } from '../styles/base-card.styles';

export interface TextCardConfig extends BaseCardConfig {
    text: string;
}

export class TextCard extends BaseCard {
    protected showHeader = false;

    setConfig(config: TextCardConfig): void {
        if (!config.text) throw new Error('text required');
        super.setConfig(config);
    }

    private get _textConfig(): TextCardConfig {
        return this._config as TextCardConfig;
    }

    protected renderContent(): TemplateResult {
        return html`<p class="text">${this._textConfig.text}</p>`;
    }

    static styles: CSSResultGroup = [baseCardStyles, textCardStyles];
}
