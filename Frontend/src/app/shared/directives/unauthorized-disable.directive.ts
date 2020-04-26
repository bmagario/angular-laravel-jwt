import { Directive, ElementRef, OnInit, Input, Renderer2, AfterViewInit } from '@angular/core';
import { PermissionService } from '@app/core/services/auth/permission.service';
import { Permission } from '@app/constants/permission';

@Directive({
  selector: '[appUnauthorizedDisable]'
})
export class UnauthorizedDisableDirective implements AfterViewInit{
  @Input('appUnauthorizedDisable') resourceAction: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private permissionService: PermissionService
  ) { }


  ngAfterViewInit(){
    const items: string[] = this.resourceAction.split(',');
    const resource: string = items[0].trim();
    const action = items[1].trim();
    if (!this.permissionService.hasPermission(
      new Permission(resource, action)
    )) {
      this.el.nativeElement.disabled = true;
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    }
  }
}
