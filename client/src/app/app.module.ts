import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './components/item/item.component';
import { CollectionComponent } from './components/collection/collection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PluginsComponent } from './components/plugins/plugins.component';
import { VisualizationsComponent } from './components/visualizations/visualizations.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ConfigComponent } from './components/config/config.component';
import { WordcloudComponent } from './components/visualizations/wordcloud/wordcloud.component';

import { NodeGraphVisualizationComponent } from './components/visualizations/node-graph-visualization/node-graph-visualization.component';
import { TextVisualizationComponent } from './components/visualizations/text-visualization/text-visualization.component';
import { NotesVisualizationComponent } from './components/visualizations/notes-visualization/notes-visualization.component';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { FocusTransitionsVisualizationComponent } from './components/visualizations/focus-transitions-visualization/focus-transitions-visualization.component';
import { ThreedVisualizationComponent } from './components/visualizations/threed-visualization/threed-visualization.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { VisualizationDirective } from './models/visualization.directive';
import { ProcessesComponent } from './components/processes/processes.component';
import { PluginsFilterPipe } from './plugins-filter';
import { CollectionViewComponent } from './views/collection-view/collection-view.component';
import { ItemViewComponent } from './views/item-view/item-view.component';
import { ProcessViewComponent } from './components/process-view/process-view.component';
import { ProcessCreateComponent } from './components/process-create/process-create.component';
import { SetComponent } from './components/set/set.component';
import { SetViewComponent } from './views/set-view/set-view.component';
import { CollectionDetailViewComponent } from './views/collection-detail-view/collection-detail-view.component';
import { SetDetailViewComponent } from './views/set-detail-view/set-detail-view.component';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { CollectionSidebarComponent } from './components/collection-sidebar/collection-sidebar.component';
import { SetSidebarComponent } from './components/set-sidebar/set-sidebar.component';
import { ItemSidebarComponent } from './components/item-sidebar/item-sidebar.component';
import { GroupsComponent } from './components/groups/groups.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateGroupComponent } from './views/create-group/create-group.component';
import { AddGroupComponent } from './views/add-group/add-group.component';
import { AddPeopleComponent } from './views/add-people/add-people.component';
import { GroupViewComponent } from './views/group-view/group-view.component';
import { ContactViewComponent } from './views/contact-view/contact-view.component';
import { BuilderComponent } from './components/visualizations/builder/builder.component';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { VisualizationComponent } from './components/visualization/visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CollectionsComponent,
    ItemComponent,
    CollectionComponent,
    PluginsComponent,
    VisualizationsComponent,
    SearchComponent,
    ConfigComponent,
    WordcloudComponent,
    VisualizationDirective,
    NodeGraphVisualizationComponent,
    TextVisualizationComponent,
    NotesVisualizationComponent,
    FocusTransitionsVisualizationComponent,
    ThreedVisualizationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProcessesComponent,
    PluginsFilterPipe,
    CollectionViewComponent,
    ItemViewComponent,
    ProcessViewComponent,
    ProcessCreateComponent,
    SetComponent,
    SetViewComponent,
    CollectionDetailViewComponent,
    SetDetailViewComponent,
    PersonComponent,
    PeopleComponent,
    KnowledgeComponent,
    CollectionSidebarComponent,
    SetSidebarComponent,
    ItemSidebarComponent,
    GroupsComponent,
    SettingsComponent,
    CreateGroupComponent,
    AddGroupComponent,
    AddPeopleComponent,
    GroupViewComponent,
    ContactViewComponent,
    BuilderComponent,
    NodeEditorComponent,
    ContentEditorComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    TabViewModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    SidebarModule,
    ToolbarModule,
    AvatarModule,
    CardModule,
    TagModule,
    LMarkdownEditorModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
