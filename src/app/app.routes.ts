import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { ENGPick } from './engpick/engpick';
import { AddUser } from './add-user/add-user';
import { RemoveUser } from './remove-user/remove-user';
import { TEDashboard } from './tedashboard/tedashboard';
import { ProjectDashboard } from './project-dashboard/project-dashboard';
import { BacklogDesign } from './backlog-design/backlog-design';
import { NewRequest } from './new-request/new-request';
import { RequestComplete } from './request-complete/request-complete';
import { ToolNumberGen } from './tool-number-gen/tool-number-gen';
import { DrawingReview } from './drawing-review/drawing-review';
import { ToolHistory } from './tool-history/tool-history';

export const routes: Routes = [
{path: '', component: Landing}, 
{path: 'engpick', component: ENGPick},
{path: 'adduser', component: AddUser},
{path: 'removeuser', component: RemoveUser},
{path: 'TEDashboard/:UID', component: TEDashboard},
{path: 'ProjectDashboard/:RID',component:ProjectDashboard},
{path: 'BacklogDesign/:UID',component: BacklogDesign},
{path: 'NewRequest', component: NewRequest},
{path: 'RequestComplete', component: RequestComplete},
{path: 'ToolNumberGen/:UID', component: ToolNumberGen},
{path: 'DrawingReview/:UID', component: DrawingReview},
{path: 'ToolHistory',component:ToolHistory},
];
