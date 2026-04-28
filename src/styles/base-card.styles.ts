import { css } from 'lit';

export const baseCardStyles = css`
    :host {
        display: block;
        min-width: 0;
        overflow: hidden;
        border-radius: 16px;
        container-type: inline-size;
    }

    .card {
        background: rgba(15, 15, 20, 0.15);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        min-width: 0;
        overflow: hidden;
    }

    :host([seamless]) .card {
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        padding: 0;
    }

    .card-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-content {
        font-size: 0.95rem;
        opacity: 0.9;
        min-width: 0;
    }
`;

export const entityCardStyles = css`
    .state {
        font-size: 1rem;
        font-weight: bold;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        min-width: 0;
    }

    .unit {
        font-size: 1rem;
        color: var(--secondary-text-color);
    }
`;

export const textCardStyles = css`
    .text {
        margin: 0;
        font-size: 1rem;
        color: var(--primary-text-color);
        overflow-wrap: break-word;
        word-break: break-word;
    }
`;

export const containerCardStyles = css`
    .cards-container[data-layout='vertical'] {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .cards-container[data-layout='horizontal'] {
        display: flex;
        flex-direction: row;
        gap: 8px;
        flex-wrap: wrap;
    }

    .cards-container[data-layout='horizontal'] > * {
        flex: 1;
        min-width: 0;
    }

    .cards-container[data-layout='grid'] {
        display: grid;
        grid-template-columns: var(--grid-template, repeat(2, minmax(0, 1fr)));
        gap: 8px;
    }

    .cards-container[data-layout='grid'] > * {
        min-width: 0;
        overflow: hidden;
    }

    .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0px;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }
`;
