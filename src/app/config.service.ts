import {Injectable} from '@angular/core';
import { User } from './Interfaces/UserInterface';
@Injectable()
export class UserService{
    setCurrentUser(currentUser: User){
      
    }  
    removeUserFromLocalStoage() {
      localStorage.clear();
    }
}