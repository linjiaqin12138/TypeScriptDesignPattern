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
    private amountFor(aRental: Rental): number {
        // This function use infomatrion of Rental class without information from Customer class
        // So maybe it can be put into Rental class
        // Most of time, Function Should Be Put Into The Object to which data it use belongs to!!
        // Use "Delegate Method" to refactor the following code
        let result = 0;
        switch(aRental.getMovie().getPriceCode()){
            case Movie.REGULAR:
                result += 2;
                if(aRental.getDaysRented() > 2)
                result += (aRental.getDaysRented() - 2) * 1.5
                break;
            case Movie.NEW_RELEASE:
                result += aRental.getDaysRented() * 3;
                break;
            case Movie.CHILDRENS:
                result += 1.5;
                if(aRental.getDaysRented() > 3)
                    result += (aRental.getDaysRented() - 3) * 1.5
                break;
        }
        return result;
    }
    statement(): string {
        let totalAmount = 0;
        let frequentRenterPoints = 0;

        let result = `Rental Record for ${this.getName()} \n`;
        this._rentals.forEach((rental)=>{
            const thisAmount = this.amountFor(rental);
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

async function main(): Promise<void> {
    const customer = new Customer('linjiaqin');

    console.log(customer.statement());
}

main();