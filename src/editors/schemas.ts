// ─── Types ───────────────────────────────────────────────────────────────────

export type HaSelector =
    | { text: Record<string, never> }
    | { boolean: Record<string, never> }
    | { entity: Record<string, never> }
    | { icon: Record<string, never> }
    | {
          number: {
              min: number;
              max: number;
              step: number;
              mode: 'slider' | 'box';
          };
      }
    | { select: { options: { value: string; label: string }[] } };

export interface HaFormFieldSchema {
    name: string;
    required?: boolean;
    selector: HaSelector;
    context?: Record<string, string>;
}

export interface HaFormGridSchema {
    type: 'grid';
    name: string;
    flatten?: boolean;
    schema: HaFormSchema[];
}

export interface HaFormExpandableSchema {
    type: 'expandable';
    name: string;
    flatten?: boolean;
    title?: string;
    schema: HaFormSchema[];
}

export type HaFormSchema =
    | HaFormFieldSchema
    | HaFormGridSchema
    | HaFormExpandableSchema;

export type HaLabels = Record<string, string>;

// ─── Shared ──────────────────────────────────────────────────────────────────

export const FONT_STYLE_SCHEMA: HaFormSchema[] = [
    { name: 'font_size', selector: { text: {} } },
    {
        type: 'grid',
        name: '',
        flatten: true,
        schema: [
            {
                name: 'font_weight',
                selector: {
                    select: {
                        options: [
                            { value: 'normal', label: 'Normal' },
                            { value: 'bold', label: 'Gras' },
                            { value: 'bolder', label: 'Plus gras' },
                            { value: 'lighter', label: 'Léger' },
                        ],
                    },
                },
            },
            {
                name: 'font_style',
                selector: {
                    select: {
                        options: [
                            { value: 'normal', label: 'Normal' },
                            { value: 'italic', label: 'Italique' },
                        ],
                    },
                },
            },
            {
                name: 'align',
                selector: {
                    select: {
                        options: [
                            { value: 'left', label: 'Gauche' },
                            { value: 'center', label: 'Centré' },
                            { value: 'right', label: 'Droite' },
                        ],
                    },
                },
            },
        ],
    },
];

export const BASE_CARD_SCHEMA: HaFormSchema[] = [
    {
        type: 'grid',
        name: '',
        flatten: true,
        schema: [
            { name: 'title', selector: { text: {} } },
            { name: 'show_title', selector: { boolean: {} } },
        ],
    },
];

export const BASE_CARD_LABELS: HaLabels = {
    title: 'Titre',
    show_title: 'Afficher le titre',
    seamless: 'Seamless',
    padding: 'Padding (px)',
    opacity: 'Opacité',
    font_size: 'Taille de police (ex: 1.2rem)',
    font_weight: 'Graisse',
    font_style: 'Style',
    align: 'Alignement',
    color: 'Couleur',
};

// ─── Text Card ───────────────────────────────────────────────────────────────

export const TEXT_CARD_SCHEMA: HaFormSchema[] = [
    { name: 'text', required: true, selector: { text: {} } },
    ...FONT_STYLE_SCHEMA,
];

export const TEXT_CARD_LABELS: HaLabels = {
    ...BASE_CARD_LABELS,
    text: 'Texte',
};

// ─── Entity Card ─────────────────────────────────────────────────────────────

export const ENTITY_CARD_SCHEMA: HaFormSchema[] = [
    ...BASE_CARD_SCHEMA,
    { name: 'entity', required: true, selector: { entity: {} } },
    {
        type: 'grid',
        name: '',
        flatten: true,
        schema: [
            { name: 'name', selector: { text: {} } },
            { name: 'unit', selector: { text: {} } },
            {
                name: 'icon',
                selector: { icon: {} },
                context: { icon_entity: 'entity' },
            },
        ],
    },
    {
        type: 'grid',
        name: '',
        flatten: true,
        schema: [
            { name: 'color', selector: { text: {} } },
            { name: 'state_color', selector: { boolean: {} } },
        ],
    },
    ...FONT_STYLE_SCHEMA,
];

export const ENTITY_CARD_LABELS: HaLabels = {
    ...BASE_CARD_LABELS,
    entity: 'Entité',
    name: 'Nom',
    unit: 'Unité',
    icon: 'Icône',
    state_color: "Couleur selon l'état",
};

// ─── Container Card ──────────────────────────────────────────────────────────

const LAYOUT_FIELD: HaFormFieldSchema = {
    name: 'layout',
    selector: {
        select: {
            options: [
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'grid', label: 'Grille' },
            ],
        },
    },
};

export const CONTAINER_CARD_SCHEMA: HaFormSchema[] = [
    ...BASE_CARD_SCHEMA,
    LAYOUT_FIELD,
    {
        name: 'gap',
        selector: { number: { min: 0, max: 64, step: 1, mode: 'slider' } },
    },
    { name: 'divider', selector: { boolean: {} } },
];

export const CONTAINER_CARD_GRID_SCHEMA: HaFormSchema[] = [
    ...CONTAINER_CARD_SCHEMA,
    {
        name: 'columns',
        selector: { number: { min: 1, max: 12, step: 1, mode: 'box' } },
    },
    {
        name: 'min_width',
        selector: { number: { min: 50, max: 800, step: 10, mode: 'box' } },
    },
];

export const CONTAINER_CARD_LABELS: HaLabels = {
    ...BASE_CARD_LABELS,
    layout: 'Layout',
    columns: 'Colonnes',
    min_width: 'Largeur min. par colonne (px)',
    gap: 'Gap entre les cartes (px)',
    divider: 'Séparateur',
};

// ─── Registry ────────────────────────────────────────────────────────────────

export const CARD_SCHEMAS: Record<string, HaFormSchema[]> = {
    'custom:neoview-text-card': TEXT_CARD_SCHEMA,
    'custom:neoview-entity-card': ENTITY_CARD_SCHEMA,
};

export const CARD_LABELS: Record<string, HaLabels> = {
    'custom:neoview-text-card': TEXT_CARD_LABELS,
    'custom:neoview-entity-card': ENTITY_CARD_LABELS,
};
