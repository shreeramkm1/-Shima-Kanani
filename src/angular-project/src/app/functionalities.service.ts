import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FunctionalitiesService {
    
    
    constructor(private http: HttpClient) {
        
    }
    
    //check Login is done
    checkLogin(email, password, callback_fun){
        
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/login/'+email+'/'+password).subscribe(data => {
              
              callback_fun(data);
              
          });
    }
    
    checkEventInfo(city, date, callback_fun){
        
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/eventInfo/'+city+'/'+date).subscribe(data => {
              
              callback_fun(data);
              
          });
    }
    
    
    //get locations is DONE
    getLocations(callback_fun){
      this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/locations').subscribe(
        data => {
          callback_fun(data);
        });
    }
    
    //check eligibility is DONE
     checkEligibility(callback_fun){
      this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/eligibility').subscribe(
        data => {
            console.log(data);
          if( data[0].lastDate >= "2016-07-13T00:00:00.000Z"){
              callback_fun(true);
          }
          else 
            callback_fun(false);
            
        
          
        
        });
    }
    
    getUser(callback_fun){
        console.log("getting the user");
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/profile').subscribe({
           data => {
               console.log("testtttt");
               console.log("in func"+data);
               callback_fun(data);
           } 
        });
    }
    
    //get donation history working ON
    getDonationHistory(callback_fun){
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/history').subscribe(
        data => {
            callback_fun(data);
        });
    }
    
    getStats(callback_fun){
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/ranking').subscribe(
        data => {
            callback_fun(data);
        });
    }
    
    updateProfile(info){
        
         this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/update/'
            +info.firstName+'/'
            +info.lastName+'/'
            +info.email+'/'
            +info.healthCardNo+'/'
            +info.hiv+'/'
            +info.insuranceNo
         ).subscribe(
            data => {
                //callback_fun(data);
                console.log(data);
            });
    }
    
    
    bookAppointment(bookingInfo){
        //add an appointment to the db
        console.log(bookingInfo);
        
        this.http.get('https://blood-donation-database-izvonkov.c9users.io:8082/api/appointment/'+bookingInfo.date+'/'+bookingInfo.eventName+'/'+bookingInfo.time).subscribe(
                data =>{
                    console.log(data);
            });
    }
    
    
    
}
