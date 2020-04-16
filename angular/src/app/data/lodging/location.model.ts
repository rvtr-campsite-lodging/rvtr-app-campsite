/*
represnts a location object. 
LocationId - Location Identifier, CultureInfo - Culture info for localiztion
*/
export class Location{
    LocationId: number;  
    Address1: string;    
    Address2: string;    
    City: string;        
    State: string;       
    Zip: string;         
    Latitude: number;    
    Longitude: number;   
    CultureInfo: string; 
  }