export interface ApiResponse {
    success: boolean;
    message?: string;
}

export interface PaginationResponse {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
}