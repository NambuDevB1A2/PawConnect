export const getPageSkip = (page: number, limit: number) => {
    return (page - 1) * limit;
}

export const getPageTake = (limit: number) => {
    return limit;
}

export const getPagination = (page: number, limit: number) => ({
    skip: getPageSkip(page, limit),
    take: getPageTake(limit),
});

export const getTotalPage = (total: number, limit: number) => (
    Math.ceil(total / limit)
);