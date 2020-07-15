class Movie {
    static  CHILDRENS: number = 2;
    static  REGULAR: number = 0;
    static  NEW_RELEASE: number = 1;

    constructor(private _title: string, private _priceCode: number ) {

    }

    getPriceCode(): number {
        return this._priceCode;
    }
    setPriceCode(arg: number): void {
        this._priceCode = arg;
    }
    getTitle(): string {
        return this._title;
    }
}

class Rental {
    constructor(private _movie: Movie, private _daysRented: number) {}
    getDaysRented(): number {
        return this._daysRented;
    }
    getMovie(): Movie {
        return this._movie;
    }
}

class Customer {
    private _rentals: Rental[] = [];
    constructor(private _name: string){

    }
    addRental(arg: Rental){
        this._rentals.push(arg);
    }
    getName(): string {
        return this._name;
    }

    statement(): string {
        let totalAmount = 0;
        let frequentRenterPoints = 0;

        let result = `Rental Record for ${this.getName()} \n`;
        this._rentals.forEach((rental)=>{
            let thisAmount = 0;
            // Step 1: Find the logical clump of your code and use 'Extract Method' to refactor it
            // ------------ clump1 begin -------------
            // Step 2: Find the local variables (rental and thisAmount in this example)
            // Variable "rental" can be regarded as function parameter becasuse its value isn't changed.
            // Variable "thisAmount" can be regared as return value because its value is changed.
            switch(rental.getMovie().getPriceCode()){
                case Movie.REGULAR:
                    thisAmount += 2;
                    if(rental.getDaysRented() > 2)
                        thisAmount += (rental.getDaysRented() - 2) * 1.5
                    break;
                case Movie.NEW_RELEASE:
                    thisAmount += rental.getDaysRented() * 3;
                    break;
                case Movie.CHILDRENS:
                    thisAmount += 1.5;
                    if(rental.getDaysRented() > 3)
                        thisAmount += (rental.getDaysRented() - 3) * 1.5
                    break;
            }
            // ------------ clump1 end -------------

            frequentRenterPoints ++;

            if((rental.getMovie().getPriceCode() === Movie.NEW_RELEASE && rental.getDaysRented() > 1))
                frequentRenterPoints ++;
            
            result += `\t ${rental.getMovie().getTitle()} \t ${thisAmount} \n`
            totalAmount += thisAmount;
        });
        result += `Amount own is ${totalAmount} \n`;
        result += `You earned ${frequentRenterPoints} frequent renter points`;
        return result;
    }
}

function main() {
    const customer = new Customer('linjiaqin');

    console.log(customer.statement());
}

main();