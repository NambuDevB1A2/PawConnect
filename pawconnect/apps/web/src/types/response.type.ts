export interface ApiResponse {
    success: boolean;
    message?: string;
}

export interface PaginationResponse {
    page: number;
    limit: number;
    totalCount: number;
    totalPage: number;
}