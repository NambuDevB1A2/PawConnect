export interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}
