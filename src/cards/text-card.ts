import { html, type CSSResultGroup, type TemplateResult } from 'lit';
import { BaseCard, type BaseCardConfig } from './base-card';
import { baseCardStyles } from '../styles/base-card.styles';
import { textCardStyles } from '../styles/text-card.styles';

export interface TextCardConfig extends BaseCardConfig {
    text: string;
    font_size?: string;
    font_weight?: 'normal' | 'bold' | 'bolder' | 'lighter';
    font_style?: 'normal' | 'italic';
    align?: 'left' | 'center' | 'right';
    color?: string;
}

export class TextCard extends BaseCard {
    protected showHeader = false;

    setConfig(config: TextCardConfig): void {
        if (!config.text) throw new Error('text required');
        super.setConfig(config);
    }

    private get textConfig(): TextCardConfig {
        return this.config as TextCardConfig;
    }

    static getConfigElement() {
        return document.createElement('neoview-text-card-editor');
    }

    static getStubConfig() {
        return {
            type: 'custom:neoview-text-card',
            text: 'Mon texte',
            font_size: '1rem',
            font_weight: 'normal',
            font_style: 'normal',
            align: 'center',
        };
    }

    protected renderContent(): TemplateResult {
        const cfg = this.textConfig;

        const textStyle = [
            cfg.font_size ? `--text-font-size: ${cfg.font_size}` : '',
            cfg.font_weight ? `--text-font-weight: ${cfg.font_weight}` : '',
            cfg.font_style ? `--text-font-style: ${cfg.font_style}` : '',
            cfg.align ? `--text-align: ${cfg.align}` : '',
            cfg.color ? `--text-color: ${cfg.color}` : '',
        ]
            .filter(Boolean)
            .join('; ');

        return html`<p class="text" style=${textStyle}>${cfg.text}</p>`;
    }

    static styles: CSSResultGroup = [baseCardStyles, textCardStyles];
}
