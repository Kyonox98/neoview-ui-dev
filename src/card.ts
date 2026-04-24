import { html, type TemplateResult } from 'lit';
import { BaseCard, type BaseCardSection } from './base-card';

export interface MyTsCardSectionConfig {
    id: string;
    label: string;
    value: string;
}

export interface MyTsCardConfig {
    type: string;
    title?: string;
    sections?: MyTsCardSectionConfig[];
}

export class MyTsCard extends BaseCard {
    private _config?: MyTsCardConfig;

    setConfig(config: MyTsCardConfig): void {
        if (!config) {
            throw new Error('Config required');
        }

        this._config = config;

        this.sections =
            config.sections?.map<BaseCardSection>((section) => ({
                id: section.id,
                label: section.label,
                value: section.value,
            })) ?? [];
    }

    render(): TemplateResult {
        return super.render();
    }
}
