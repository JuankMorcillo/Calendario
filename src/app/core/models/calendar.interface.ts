export interface Calendar {
    id: number;
    title: string;
    description: string;
    image?: string;
    category: number;
    city: string;
    date: Date;
    time: string;
    status?: 'borrador' | 'bloqueado' | 'oculto';
    color?: string;
}