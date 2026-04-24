import { html, type TemplateResult } from 'lit';
import { BaseCard } from './base-card';

export interface MyTsCardConfig {
    type: string;
    title?: string;
}

export class MyTsCard extends BaseCard {
    private _config?: MyTsCardConfig;

    setConfig(config: MyTsCardConfig): void {
        if (!config) {
            throw new Error('Config required');
        }

        this._config = config;
    }

    render(): TemplateResult {
        const title = this._config?.title ?? 'Ma super carte TS';

        return html`
            <div class="card">
                <div class="card-header">${title}</div>
                <div class="card-content">Contenu fixe pour le moment.</div>
            </div>
        `;
    }
}
