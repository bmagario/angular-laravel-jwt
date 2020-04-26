import { Directive, ElementRef, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@app/core/services/auth/permission.service';
import { Permission } from '@app/constants/permission';

@Directive({
  selector: '[appUnauthorizedHide]'
})
export class UnauthorizedHideDirective{
  @Input() set appUnauthorizedHide(resourceAction: string) {
    this.isGranted(resourceAction);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  isGranted(resourceAction: string){
    const items: string[] = resourceAction.split(',');
    const resource: string = items[0].trim();
    const action = items[1].trim();
    if (!this.permissionService.hasPermission(
      new Permission(resource, action)
    )) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
