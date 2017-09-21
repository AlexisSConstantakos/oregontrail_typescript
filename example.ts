(function(){
    
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }
        /*
        * Interfaces
        */
    
        //interface describing what attributes and methods a traveler should have
        interface ITraveler {
            food: number;
            name: string;
            isHealthy: boolean;
    
            //when implemented, There should be 50% chance to increase the traveler's food by 100.
            //return the travelers new food value
            hunt(): number;
            
    
            //when implemented, we should check to see if the traveler has a food supply of 20
            //If they do then we should consume 20 of the available food supply
            //If they don't have 20 food then we should change isHealthy to false
            //return the travelers health after attempting to eat
            eat(): boolean;
    
    
        }
    
        //interface describing attributes and methods a wagon should have
        interface IWagon{
            capacity: number;
            passengerArray: Traveler[];
    
            //when implemented, we should add the traveler to the wagon if the capacity permits
            //this function should return the string "added" on success and "sorry" on failure
            addPassenger(traveler: Traveler): string;
    
            //this should return true if there is at least one unhealthy person in the wagon
            //if everyone is healthy false should be returned
            isQuarantined(): boolean;
    
            //Return the total amount of food among all passengers of the wagon.
            getFood(): number;
    
        }
    
        /*
        * Classes
        */
    
        //The traveler class that implements the ITraveler interface
        //This is currently in violation of its contract with the interface. 
        //Create the code required to satisfy the contract with the interface

        //Alexis note: first step, make this section compatible with the interface.  You don't need to add the methods, 
        //but you can to satisfy the typeScript error.

            // food: number;
            // name: string;
            // isHealthy: boolean;
            // hunt(){
            //     return 1;
            // };
            // eat(){
            //     return true;
            // };

            //Alexis note: correct code

            // hunt(){
            //     if(Math.random() > .5){
            //         this.food += 100
            //     }
            //     return this.food;
            // };

            // eat(){
            //     if(this.food <= 20){
            //         this.food -= 20;
            //     }else{
            //         this.isHealthy = false;
            //     }
            //     return this.isHealthy;
            // };
            

        class Traveler implements ITraveler {
            food: number;
            name: string;
            isHealthy: boolean;
        
            constructor(food: number, name: string, isHealthy: boolean){
                this.food = food; //set them on the class
                this.name = name;
                this.isHealthy = isHealthy;
            };
            
            hunt(){
                let food = getRandomIntInclusive(1, 100);
                if (food > 50){
                  food = food + 100;
                }
                return this.food;
              };

            eat(){
                this.food -= 20;
                if (this.food < 20) {
                    this.isHealthy = false;
                }
                return this.isHealthy;
            }
        };
    


        //The wagon class that implements the IWagon interface
        //This is currently in violation of its contract with the interface.
        //Create the code required to satisfy the contract with the interface 

        // addPassenger(traveler: Traveler): string {
        //     if(this.capacity > this.passengerArray.length) {
        //         this.passengerArray.push(travler)
        //         return "added";
        //     }
        //         return "sorry";
        // };

        // isQuarantined(): boolean {
        //     for(let i = 0; i < this.passengerArray.length; i++){
        //         if(this.passengerArray[i].isHealthy == false){
        //             return true;
        //         }
        //     }
        //     return false;
        // };

        // getFood() number {
        //     let totalFood = 0;
        //     for(let i = 0; i < this.passengerArray.length; i++){
        //         totalFood = totalFood + this.passengerArray[i].food;
        //     }
        //     return totalFood;
        // };

        class Wagon implements IWagon {
            capacity: number;
            passengerArray: Traveler[];

            constructor(capacity: number, passengerArray: Traveler[]){
                this.capacity = capacity;
                this.passengerArray = passengerArray;
            }

            addPassenger(traveler: Traveler): string {
                if (this.capacity > this.passengerArray.length){
                    this.passengerArray.push(traveler);
                    return "added"
                }
                return "false"
            }


            isQuarantined() {
            for (let i = 0; i < this.passengerArray.length; i++){
                if (this.passengerArray[i].isHealthy === false){
                    return true;
                }
            } 
            return false;
            }
            
            getFood() {
                let totalFood = 0;
                for (let i = 0; i < this.passengerArray.length; i++){
                    totalFood = totalFood + this.passengerArray[i].food;
                }
                return totalFood;
            }

        }
    
    
        // * Play the game
    
    
        // Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
        // Alexis note: this is instantiating the travelers.  This ia where the constructor is called, and
        // it is called only once.
        
        let Traveler1 = new Traveler(getRandomIntInclusive(1, 100), "Mike", true);
        let Traveler2 = new Traveler(getRandomIntInclusive(1, 100), "Brian", true);
        let Traveler3 = new Traveler(getRandomIntInclusive(1, 100), "Dennis", true);
        let Traveler4 = new Traveler(getRandomIntInclusive(1, 100), "Carl", true);
        let Traveler5 = new Traveler(getRandomIntInclusive(1, 100), "Bruce", true);


        // Create wagon with an empty passenger list and a capacity of 4.
        
        let main = new Wagon(4);

        // Make 3 of 5 the travelers eat by calling their eat methods

        // console.log(Traveler1.eat());
        // console.log(Traveler2.eat());
        // console.log(Traveler3.eat());

        
        Traveler1.eat()
        Traveler3.eat()
        Traveler5.eat()

        // Make the remaining 2 travelers hunt

        // console.log(Traveler4.hunt());
        // console.log(Traveler5.hunt());
        
        Traveler2.hunt()
        Traveler4.hunt()

        // Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
        // of attempting to be being added to the wagon using the wagons addPassenger method.
        
        let ourTravelers = [Traveler1, Traveler2, Traveler3, Traveler4, Traveler5]

        ourTravelers.forEach(function(traveler, index){
            if(Math.random() > .5){
                console.log(main.addPassenger(traveler))
            }
        });

        console.log(main.isQuarantined());
        
        console.log(main.getFood())

        // Run the isQuarantined method for the wagon
        
        // Run the getFood method for the wagon
        // the return values of all the methods should be displayed in the console using console.log()
        // the console.log statements should not live inside any methods on the objects 


    })();
    
    