import { Calendar } from "../core/models/calendar.interface";
import { CATEGORY_MOCK } from "./category.mock";

export const MOCK_CALENDARS: Calendar[] = [
    {
        id: 1,
        title: 'Visita guiada al Taller',
        description: 'Tour por las instalaciones',
        date: new Date(2026, 1, 1),
        time: '10:00',
        category: 1,
        city: 'Cali',
        status: 'borrador',
        color: CATEGORY_MOCK.find(c => c.id === 1)?.color || 'pink'
    },
    {
        id: 2,
        title: 'Visita guiada al Taller',
        description: 'Tour por las instalaciones',
        date: new Date(2026, 1, 2),
        time: '10:00',
        category: 1,
        city: 'Cali',
        status: 'borrador',
        color: CATEGORY_MOCK.find(c => c.id === 1)?.color || 'pink'
    },
    {
        id: 3,
        title: 'Teatro "Inmaculado"',
        description: 'Evento teatral',
        date: new Date(2026, 1, 28),
        time: '19:30',
        category: 2,
        city: 'Cali',
        status: 'borrador',
        color: CATEGORY_MOCK.find(c => c.id === 2)?.color || 'blue'
    },
]