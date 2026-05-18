import { css } from 'lit';

export const containerCardStyles = css`
    :host {
        --neoview-divider-color: rgba(255, 255, 255, 0.08);
        --neoview-cards-gap: 8px;
    }

    .cards-container {
        display: flex;
        flex-direction: column;
        gap: var(--cards-gap, var(--neoview-cards-gap));
    }

    .cards-container[data-layout='horizontal'] {
        flex-direction: row;
        gap: 0;
    }

    .cards-container[data-layout='grid'] {
        display: grid;
        grid-template-columns: var(--grid-template, repeat(2, minmax(0, 1fr)));
        gap: var(--cards-gap, var(--neoview-cards-gap));
    }

    .column {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: var(--cards-gap, var(--neoview-cards-gap));
        padding: 0 var(--cards-gap, var(--neoview-cards-gap));
        min-width: 0;
    }

    .column:first-child {
        padding-left: 0;
    }

    .column:last-child {
        padding-right: 0;
    }

    .column.has-divider {
        border-right: 1px solid var(--neoview-divider-color);
    }

    .cards-container[data-layout='vertical'] .divider {
        border-top: 1px solid var(--neoview-divider-color);
        margin: 4px 0;
    }
`;
