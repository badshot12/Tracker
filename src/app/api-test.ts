import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ApiTest {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:5000';

  public getData(){
    console.log("api gt data")
    const actualUrl = this.apiUrl + '/users' // Testing
    return this.http.get<string[]>(actualUrl);
  }

  public NewUserSend(UserInfo: object){
    console.log(UserInfo)
    const actualurl = this.apiUrl + '/addUser';
    return this.http.post<any>(actualurl,UserInfo);
  }

public getUserforRemove(){
    console.log("api gt data for removal")
    const actualUrl = this.apiUrl + '/usersforremove';
    return this.http.get<object[]>(actualUrl);
  }
public RemoveUser(UID:object){
    console.log(UID)
    const actualUrl = this.apiUrl + '/removeuser';
    return this.http.post<object[]>(actualUrl,UID);
}

public getUserDashboardData(UID: Number){
    const actualUrl = this.apiUrl + `/DashboardData/${UID}`;
    return this.http.get<any>(actualUrl);
  }
public getProjectInfo(UID: Number){
    const actualUrl = this.apiUrl + `/getprojectinfo/${UID}`;
    return this.http.get<any>(actualUrl)
}
public getstatusupdate(RID: number[]){
  const actualUrl = this.apiUrl + '/getstatusupdate';
    return this.http.post<any>(actualUrl,RID)
}

public get_invprojectinfo(RID: number){
  const actualUrl = this.apiUrl + `/get_invprojectinfo/${RID}`;
  return this.http.get<any>(actualUrl);
}
public getstatusupdate_Inv(RID: Number){
  const actualUrl = this.apiUrl + `/getstatusupdate_Inv/${RID}`;
    return this.http.get<any>(actualUrl)
}

public UpdateProject(ProjectInfo: any){
  console.log("did I make it to update api")
  console.log(ProjectInfo[0])
  const actualurl = this.apiUrl + '/UpdateProject';
  return this.http.post<any>(actualurl,ProjectInfo[0]);
}
public BacklogProjectList(){
  console.log("did I make it to Project List API")
  const actualurl = this.apiUrl + '/BacklogProjectList';
  return this.http.get<any>(actualurl)
}

public ProgramInfo(){
  console.log("did I make it to Program List API")
  const actualurl = this.apiUrl + '/ProgramInfo';
  return this.http.get<any>(actualurl)
}
public AssignUser(selecteduser: object){
  console.log("Made it to API for Assign User", selecteduser)
  const actualurl = this.apiUrl + '/AssignUser';
  return this.http.post<any>(actualurl,selecteduser);
}
public DeleteProject(RID: number){
  console.log(RID)
  const actualUrl = this.apiUrl + '/DeleteProject';
  return this.http.post<number>(actualUrl,RID);
}
public Unassign(RID:number){
  const actualUrl = this.apiUrl + '/Unassign';
  return this.http.post<number>(actualUrl,RID);
}
public SaveStatus(StatusInfo:object){
  const actualUrl = this.apiUrl + '/SaveStatus';
  return this.http.post<object>(actualUrl,StatusInfo);
}
public SubmitNewRequest(InputInfo:object){
  const actualUrl = this.apiUrl + '/SubmitNewRequest';
  console.log(InputInfo)
  return this.http.post<object>(actualUrl,InputInfo);
}
public Tooltype(){
  const actualUrl = this.apiUrl + '/Tooltype';
  return this.http.get<any>(actualUrl)
}
public ToolNumbers(){
  const actualUrl = this.apiUrl + '/ToolNumbers';
  return this.http.get<any>(actualUrl)
}
}
