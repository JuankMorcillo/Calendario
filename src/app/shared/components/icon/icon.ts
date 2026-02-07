import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUsers, faPlus, faCirclePlus, faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-icon',
  imports: [FontAwesomeModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  @Input() type: string = 'home';
  @Input() fill: string = 'currentColor';
  @Input() classNames: string = '';

  icon: any;

  ngOnInit() {
    const icons: Record<string, any> = {
      home: faHome,
      clients: faUsers,
      plus: faPlus,
      circlePlus: faCirclePlus,
      xIcon: faXmark,
      eyeOpen: faEye,
      eyeClosed: faEyeSlash
    };
    this.icon = icons[this.type];
  }
}
