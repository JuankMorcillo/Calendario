import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar } from '../../core/models/calendar.interface';
import { Category } from '../../core/models/category.interface';
import { CATEGORY_MOCK } from '../../mocks/category.mock';
import { Icon } from "../../shared/components/icon/icon";
import { MOCK_CALENDARS } from '../../mocks/calendar.mock';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, Icon],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date(2026, 1); // Noviembre 2025
  weeks: (Date | null)[][] = [];
  events: Calendar[] = [];

  authService = inject(AuthService);

  // Para el modal de crear evento
  showModal = false;
  showModalUpdate = false;
  eventId: number | null = null;
  selectedCategory: number | null = null;
  selectedStatus: string | null = null;

  newEvent: {
    title: string;
    description: string;
    date: Date;
    time: string;
    category: number;
    city: string;
    status: "borrador" | "bloqueado" | "oculto" | undefined;
  } = {
      title: '',
      description: '',
      date: new Date(),
      time: '',
      category: 0,
      city: '',
      status: undefined,
    };

  // Categorias
  categories: Category[] = CATEGORY_MOCK

  // Colores disponibles

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
    this.events = MOCK_CALENDARS;
  }

  setEvent(id: number) {
    this.newEvent = { ...this.events.find(e => e.id === id) } as any;
  }

  setEventId(id: number | null) {
    this.eventId = id;
  }

  filterEventsByCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;
  }

  filterEventsByStatus(status: string | null) {
    this.selectedStatus = status;
  }

  // Obtener eventos de un día específico
  getEventsForDate(date: Date | null) {
    if (!date) return [];

    // Filtrar eventos por fecha
    let filtered = this.events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );

    if (this.selectedCategory !== null) {
      filtered = filtered.filter(e => e.category === this.selectedCategory);
    }

    if (this.selectedStatus !== null) {
      filtered = filtered.filter(e => e.status === this.selectedStatus);
    }

    return filtered;
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

  // Abrir modal para crear evento
  openModal() {
    this.showModal = true;
  }

  // Cerrar modal
  closeModal() {
    this.showModal = false;
  }

  openModalUpdate() {
    this.showModalUpdate = true;
  }

  closeModalUpdate() {
    this.showModalUpdate = false;
  }

  // Crear nuevo evento
  createEvent() {
    if (!this.newEvent.title
      || !this.newEvent.date
      || !this.newEvent.category) return;

    const dateString = typeof this.newEvent.date === 'string'
      ? this.newEvent.date
      : (this.newEvent.date as Date).toISOString().split('T')[0];

    const [year, month, day] = dateString.split('-').map(Number);
    const properDate = new Date(year, month - 1, day);

    const event: Calendar = {
      id: Math.max(...this.events.map(e => e.id), 0) + 1,
      title: this.newEvent.title,
      description: this.newEvent.description,
      date: properDate,
      time: this.newEvent.time,
      category: this.newEvent.category,
      city: this.newEvent.city,
      status: this.newEvent.status,
      color: this.categories.find(c => c.id == this.newEvent.category)?.color || 'pink'
    };

    this.events.push(event);
    this.closeModal();
    this.newEvent = {
      title: '',
      description: '',
      date: new Date(),
      time: '',
      category: 0,
      city: '',
      status: undefined,
    }
  }

  updateEvent() {
    if (!this.newEvent.title
      || !this.newEvent.date
      || !this.newEvent.category) return;

    const dateString = typeof this.newEvent.date === 'string'
      ? this.newEvent.date
      : (this.newEvent.date as Date).toISOString().split('T')[0];

    const [year, month, day] = dateString.split('-').map(Number);
    const properDate = new Date(year, month - 1, day);

    const eventIndex = this.events.findIndex(e => e.id === this.eventId);
    if (eventIndex === -1) return;

    this.events[eventIndex] = {
      id: this.eventId as number,
      title: this.newEvent.title,
      description: this.newEvent.description,
      date: properDate,
      time: this.newEvent.time,
      category: this.newEvent.category,
      city: this.newEvent.city,
      status: this.newEvent.status,
      color: this.categories.find(c => c.id == this.newEvent.category)?.color || 'pink'
    };

    this.closeModalUpdate();
    this.newEvent = {
      title: '',
      description: '',
      date: new Date(),
      time: '',
      category: 0,
      city: '',
      status: undefined,
    }

  }

  // Eliminar evento
  deleteEvent(eventId: number) {
    this.events = this.events.filter(e => e.id !== eventId);
  }

  // Obtener clase de color para evento
  getColorClass(color: string | undefined): string {
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
