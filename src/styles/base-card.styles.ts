import { css } from 'lit';

export const baseCardStyles = css`
    :host {
        display: block;
        min-width: 0;
        overflow: hidden;
        container-type: inline-size;

        --neoview-font-size-sm: 0.85rem;
        --neoview-font-size-md: 1rem;
        --neoview-font-size-lg: 1.2rem;

        --neoview-card-background: rgba(15, 15, 20, 0.15);
        --neoview-card-blur: 12px;
        --neoview-card-border-color: rgba(255, 255, 255, 0.12);
        --neoview-card-padding: 16px;
        --neoview-card-box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        --neoview-header-font-weight: 600;
        --neoview-header-divider-color: rgba(255, 255, 255, 0.08);
        --neoview-error-color: rgba(219, 68, 55, 1);
    }

    ha-card {
        background: rgba(
            var(--neoview-card-background-color),
            var(--card-opacity, 0.15)
        );
        backdrop-filter: blur(var(--neoview-card-blur));
        -webkit-backdrop-filter: blur(var(--neoview-card-blur));
        border: 1px solid var(--neoview-card-border-color);
        padding: var(--card-padding, var(--neoview-card-padding));
        box-shadow: var(--neoview-card-box-shadow);
        box-sizing: border-box;
        min-width: 0;
        overflow: hidden;
    }

    :host([seamless]) ha-card {
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        padding: 0;
    }

    .card-header {
        font-size: var(--neoview-font-size-lg);
        font-weight: var(--neoview-header-font-weight);
        color: var(--primary-text-color);
        margin-bottom: 8px;
        border-bottom: 1px solid var(--neoview-header-divider-color);
        padding-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-content {
        font-size: var(--neoview-font-size-md);
        opacity: 0.9;
        min-width: 0;
    }

    .empty-state {
        opacity: 0.5;
        font-style: italic;
        text-align: center;
        padding: 8px 0;
    }

    .empty-state.error {
        color: var(--neoview-error-color);
        opacity: 1;
        font-style: normal;
    }
`;
