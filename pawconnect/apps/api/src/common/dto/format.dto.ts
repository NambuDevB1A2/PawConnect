export const TRANSFORM_STRING_TO_BOOLEAN = ({ value }) => 
    value === "on" ||value === "true" || value === true;

export const TRANSFORM_STRING_TO_ARRAY = ({ value }) => {
        if (value === undefined || value === null) return value;
        if (Array.isArray(value)) return value;

        const trimmed = value.trim();
        if (trimmed === '') return [];

        return trimmed.split(',').map((v: string) => v.trim());
    };