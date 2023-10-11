import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionsComponent } from './components/collections/collections.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfigComponent } from './components/config/config.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { PluginsComponent } from './components/plugins/plugins.component';
import { SearchComponent } from './components/search/search.component';
import { ProcessesComponent } from './components/processes/processes.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionViewComponent } from './views/collection-view/collection-view.component';
import { ItemViewComponent } from './views/item-view/item-view.component';
import { ProcessViewComponent } from './components/process-view/process-view.component';
import { HttpParams } from '@angular/common/http';
import { ProcessCreateComponent } from './components/process-create/process-create.component';
import { SetViewComponent } from './views/set-view/set-view.component';
import { CollectionResolverService } from './resolvers/collection-resolver.service';
import { CollectionDetailViewComponent } from './views/collection-detail-view/collection-detail-view.component';
import { SetResolverService } from './resolvers/set-resolver.service';
import { SetDetailViewComponent } from './views/set-detail-view/set-detail-view.component';
import { ItemResolverService } from './resolvers/item-resolver.service';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { GroupsComponent } from './components/groups/groups.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateGroupComponent } from './views/create-group/create-group.component';
import { AddGroupComponent } from './views/add-group/add-group.component';
import { AddPeopleComponent } from './views/add-people/add-people.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'search',
        component: SearchComponent,
        outlet: 'primary'
      },
      {
        path: 'collections',
        component: CollectionsComponent,
        outlet: 'primary'
      },
      {
        path: 'collections/:id',
        component: CollectionViewComponent,
        resolve: {
          collection: CollectionResolverService
        },
        outlet: 'primary',
        children: [
          { 
            path: '',
            component: CollectionDetailViewComponent
          },
          { 
            path: 'sets/:id',
            component: SetViewComponent,
            outlet: 'primary',
            resolve: {
              set: SetResolverService
            },
            children: [
              {
                path: '',
                component: SetDetailViewComponent
              },
              {
                path: 'items/:id',
                component: ItemViewComponent,
                resolve: {
                  item: ItemResolverService
                }
              }
            ]
          },
        ]
      },
      {
        path: 'plugins',
        component: PluginsComponent,
        outlet: 'primary'
      },
      {
        path: 'config',
        component: ConfigComponent,
        outlet: 'primary'
      },
      {
        path: 'knowledge',
        component: KnowledgeComponent,
        outlet: 'primary'
      },
      {
        path: 'processes/:id',
        component: ProcessViewComponent,
        outlet: 'primary'
      },
      { 
        path: 'process-create',
        component: ProcessCreateComponent,
        outlet: 'primary'
      },
      { 
        path: 'people',
        component: PeopleComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      {
        path: 'add-people',
        component: AddPeopleComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      { 
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      {
        path: 'create-group',
        component: CreateGroupComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      {
        path: 'add-group',
        component: AddGroupComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      { 
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      },
      { 
        path: 'person',
        component: PersonComponent,
        canActivate: [AuthGuard],
        outlet: 'primary'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
