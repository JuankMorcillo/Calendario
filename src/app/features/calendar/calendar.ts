import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar } from '../../core/models/calendar.interface';
import { Category } from '../../core/models/category.interface';
import { CATEGORY_MOCK } from '../../mocks/category.mock';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date(2026, 1); // Noviembre 2025
  weeks: (Date | null)[][] = [];
  events: Calendar[] = [];

  // Para el modal de crear evento
  showModal = false;
  newEvent: {
    title: string;
    description: string;
    time: string;
    category: number;
    city: string;
    status: "borrador" | "bloqueado" | "oculto" | undefined;
  } = {
      title: '',
      description: '',
      time: '',
      category: 0,
      city: '',
      status: undefined,
    };
  selectedDate: Date | null = null;

  // Categorias
  categories: Category[] = CATEGORY_MOCK

  // Colores disponibles
  colorOptions = [
    { value: 'pink', label: 'Rosa', class: 'bg-pink-300' },
    { value: 'blue', label: 'Azul', class: 'bg-blue-300' },
    { value: 'gray', label: 'Gris', class: 'bg-gray-400' },
    { value: 'red', label: 'Rojo', class: 'bg-red-300' }
  ];

  ngOnInit() {
    this.generateCalendar();
    this.loadEvents();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Día de la semana del primer día (0 = domingo)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.weeks = [];
    let week: (Date | null)[] = [];
    let currentDate = new Date(startDate);

    while (week.length < 7 || currentDate <= lastDay) {
      if (week.length === 7) {
        this.weeks.push([...week]);
        week = [];
      }

      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  loadEvents() {
    this.events = [
      {
        id: 1,
        title: 'Visita guiada al Taller',
        description: 'Tour por las instalaciones',
        date: new Date(2026, 2, 1),
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
        date: new Date(2026, 2, 2),
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
        date: new Date(2025, 10, 31),
        time: '19:30',
        category: 2,
        city: 'Cali',
        status: 'borrador',
        color: CATEGORY_MOCK.find(c => c.id === 2)?.color || 'blue'
      },
    ];
  }

  // Obtener eventos de un día específico
  getEventsForDate(date: Date | null): Calendar[] {
    if (!date) return [];
    return this.events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }

  // Navegar al mes anterior
  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    this.generateCalendar();
  }

  // Navegar al mes siguiente
  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );
    this.generateCalendar();
  }

  // Ir al mes actual
  today() {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  // Abrir modal para crear evento
  openModal(date: Date | null) {
    this.selectedDate = date;
    this.newEvent = { title: '', description: '', time: '10:00', category: 1, city: 'Cali', status: 'borrador' };
    this.showModal = true;
  }

  // Cerrar modal
  closeModal() {
    this.showModal = false;
    this.selectedDate = null;
  }

  // Crear nuevo evento
  createEvent() {
    if (!this.newEvent.title || !this.selectedDate) return;    

    const event: Calendar = {
      id: Math.max(...this.events.map(e => e.id), 0) + 1,
      title: this.newEvent.title,
      description: this.newEvent.description,
      date: this.selectedDate,
      time: this.newEvent.time,
      category: this.newEvent.category,
      city: this.newEvent.city,
      status: this.newEvent.status,
      color: this.categories.find(c => c.id == this.newEvent.category)?.color || 'pink'
    };

    this.events.push(event);
    this.closeModal();
  }

  // Eliminar evento
  deleteEvent(eventId: number) {
    this.events = this.events.filter(e => e.id !== eventId);
  }

  // Imprimir eventos
  printEvents() {
    window.print();
  }

  // Obtener clase de color para evento
  getColorClass(color: string | undefined): string {
    console.log(color);
    
    const colorCategory = this.categories.find(c => c.color === color);
    return colorCategory ? colorCategory.class_name : 'bg-gray-300';
  }

  // Comprobar si es el mes actual
  isCurrentMonth(date: Date | null): boolean {
    if (!date) return false;
    return date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear();
  }

  // Formato de mes y año
  getMonthYear(): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return this.currentDate.toLocaleDateString('es-ES', options);
  }
}
