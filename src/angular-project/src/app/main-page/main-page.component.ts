import { Component, OnInit } from '@angular/core';
import { FunctionalitiesService } from '../functionalities.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  providers: [FunctionalitiesService], //doesn't work without this for some reason
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  locations = []; //stores all possible locations
  donationHistory = []; //stores donationHistory for user
  bloodStats = []; //stores blood stats of user
  eligibility = false;
  donationEvents = [];
  bookingEventName = '';
  bookingEventDate = '';
  userInfo = '';
  
  nextAppointment = "December 2nd, 2017";

  constructor(private _funcService: FunctionalitiesService) {
    
  }

  ngOnInit() {
    this._funcService.getLocations(this.onLocationsResponse.bind(this));
    this._funcService.checkEligibility(this.onEligibilityResponse.bind(this));
    this._funcService.getUser(this.onUserResponse.bind(this));
  }
  
  onUserResponse(res){
    console.log("user"+res);
    this.userInfo = res;
  }
  
  showDonationEvents(form, city){
  
    var date = form.value['date'];
    console.log(city+" and "+date);
    
    this._funcService.checkEventInfo(city, date, this.onDonationEventsResponse.bind(this));
  }
  
  onDonationEventsResponse(res){
    this.donationEvents = res;
    console.log(this.donationEvents);
  }
  
  onEligibilityResponse(res){
    this.eligibility = res;
  }
  
  onLocationsResponse(res){
    this.locations = res;
  }
  
  getHistoryButton(){
    this._funcService.getDonationHistory(this.onHistoryResponse.bind(this));
  }
  
  onHistoryResponse(res){
    this.donationHistory = res;
  }
  
  getStatsButton(){
    this._funcService.getStats(this.onStatsResponse.bind(this));
  }
  
  onStatsResponse(res){
    console.log(res);
    this.bloodStats = res;
  }
  
  checkEligibility(){
    this._funcService.checkEligibility(this.onEligibilityResponse.bind(this));
  }
  
  updateInfo(form){
    var firstName = form.value['first-name'];
    var lastName = form.value['last-name'];
    var email = form.value['email'];
    var healthCardNo = form.value['health-card-no'];
    var hiv = form.value['hiv-status'];
    var insuranceNo = form.value['insurance-no'];

    var info = {
      firstName: firstName, 
      lastName: lastName,
      email: email,
      healthCardNo: healthCardNo,
      hiv: hiv,
      insuranceNo: insuranceNo
    };
    
    
    
    $('#update-modal').modal("hide");
    
    this._funcService.updateProfile(info);
    
  }
  
  bookAtEvent(name, date){
    this.bookingEventName = name;
    this.bookingEventDate = date;
    $(".modal").modal("hide");
  }
  
  bookAppointmentButton(form){
    
    const bookingInfo = {
      date: this.bookingEventDate,
      time: form.value['donation-time'],
      eventName: this.bookingEventName
    };
    
    this._funcService.bookAppointment(bookingInfo);
    
    $(".modal").modal("hide");
    alert('Appointment booked at '+bookingInfo.eventName +'!');
    
  }
  
  
 

}
