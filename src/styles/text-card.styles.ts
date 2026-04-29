import { css } from 'lit';

export const textCardStyles = css`
    .text {
        margin: 0;
        font-size: var(--text-font-size, 1rem);
        font-weight: var(--text-font-weight, normal);
        font-style: var(--text-font-style, normal);
        color: var(--text-color, var(--primary-text-color));
        text-align: var(--text-align, left);
        overflow-wrap: break-word;
        word-break: break-word;
    }
`;
