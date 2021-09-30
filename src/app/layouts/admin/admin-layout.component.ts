import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import PerfectScrollbar from 'perfect-scrollbar';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AppState } from '../../logic/store/reducer';
import * as documentsActions from '../../logic/store/documents/documents.actions';

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public navItems: NavItem[];
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  url: string;
  location: Location;

  @ViewChild('sidebar') sidebar: any;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private router: Router, location: Location, private store: Store<AppState>) {
    this.location = location;
  }

  ngOnInit() {
    this.store.dispatch(new documentsActions.LoadDocuments());
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.navbar.sidebarClose();
    });

    this.navItems = [
      {type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard'},

      {
        type: NavItemType.NavbarRight,
        title: '',
        iconClass: 'fa fa-bell-o',
        numNotifications: 5,
        dropdownItems: [
          {title: 'Notification 1'},
          {title: 'Notification 2'},
          {title: 'Notification 3'},
          {title: 'Notification 4'},
          {title: 'Another Notification'}
        ]
      },
      {
        type: NavItemType.NavbarRight,
        title: '',
        iconClass: 'fa fa-list',

        dropdownItems: [
          {iconClass: 'pe-7s-mail', title: 'Messages'},
          {iconClass: 'pe-7s-help1', title: 'Help Center'},
          {iconClass: 'pe-7s-tools', title: 'Settings'},
          'separator',
          {iconClass: 'pe-7s-lock', title: 'Lock Screen'},
          {iconClass: 'pe-7s-close-circle', title: 'Log Out'}
        ]
      },
      {type: NavItemType.NavbarLeft, title: 'Search', iconClass: 'fa fa-search'},

      {type: NavItemType.NavbarLeft, title: 'Account'},
      {
        type: NavItemType.NavbarLeft,
        title: 'Dropdown',
        dropdownItems: [
          {title: 'Action'},
          {title: 'Another action'},
          {title: 'Something'},
          {title: 'Another action'},
          {title: 'Something'},
          'separator',
          {title: 'Separated link'},
        ]
      },
      {type: NavItemType.NavbarLeft, title: 'Log out'}
    ];
  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  public isMap() {
    return this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen';
  }

  public isMac(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0;
  }

  private runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      ps.update();
    }
  }
}
