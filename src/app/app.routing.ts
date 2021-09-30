import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './logic/guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      }, {
        path: 'forms',
        loadChildren: './forms/forms.module#Forms'
      }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
      }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
      }, {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
      }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
      }, {
        path: 'user',
        loadChildren: './userpage/user.module#UserModule'
      }, {
        path: 'timeline',
        loadChildren: './timeline/timeline.module#TimelineModule'
      }, {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      }, {
        path: '',
        loadChildren: './template/template.module#TemplateModule'
      },
    ]
  },
  {
    path: 'pages',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  }
];
