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
    getFrequentRenterPoints(dayRented: number): number {
        if((this._priceCode === Movie.NEW_RELEASE && dayRented > 1))
            return 2;
        else
            return 1;
    }
    getCharge(dayRented: number): number {
        let result = 0;
        // 使用多态渠道switch语句 或 State Pattern
        // " Replace Type Code behavior with State/Strategy"
        switch(this._priceCode){
            case Movie.REGULAR:
                // Use "Self Encapsulate Field"
                result += 2;
                if(dayRented > 2)
                result += (dayRented- 2) * 1.5
                break;
            case Movie.NEW_RELEASE:
                result += dayRented * 3;
                break;
            case Movie.CHILDRENS:
                result += 1.5;
                if(dayRented > 3)
                    result += (dayRented - 3) * 1.5
                break;
        }
        return result;
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
    getFrequentRenterPoints(): number {
        return this._movie.getFrequentRenterPoints(this._daysRented)
    }
    getCharge(): number{
        return this._movie.getCharge(this._daysRented);
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
    getTotalCharge(): number {
        let result = 0;
        this._rentals.forEach((rental)=>{
            result += rental.getCharge();
        });
        return result;
    }
    getTotalFrequentRenterPoints(): number {
        let result = 0;
        this._rentals.forEach((rental)=>{
            result += rental.getFrequentRenterPoints();
        });
        return result;
    }
    statement(): string {
        let result = `Rental Record for ${this.getName()} \n`;
        result += `Amount own is ${this.getTotalCharge()} \n`;
        result += `You earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;
        return result;
    }
}

async function main(): Promise<void> {
    const customer = new Customer('linjiaqin');

    console.log(customer.statement());
}

main();