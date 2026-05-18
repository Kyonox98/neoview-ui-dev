import { css } from 'lit';

export const entityCardStyles = css`
    .entity-wrapper {
        font-size: var(--entity-font-size, var(--neoview-font-size-md));
        font-weight: var(--entity-font-weight, normal);
        font-style: var(--entity-font-style, normal);
        color: var(--entity-color, var(--primary-text-color));
        display: flex;
        align-items: center;
        justify-content: var(--entity-justify, flex-start);
        gap: 8px;
        min-width: 0;
        overflow: hidden;
        line-height: 1;
        flex-wrap: wrap;
    }

    .entity-wrapper > * {
        flex-shrink: 0;
    }

    ha-icon {
        --mdc-icon-size: var(--entity-font-size, var(--neoview-font-size-md));
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--entity-font-size, var(--neoview-font-size-md));
        width: var(--entity-font-size, var(--neoview-font-size-md));
    }

    .name,
    .state {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
        min-width: 0;
        white-space: nowrap;
    }
`;
