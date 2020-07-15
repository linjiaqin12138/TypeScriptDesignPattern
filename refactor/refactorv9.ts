abstract class Price {
    abstract getPriceCode(): number;
    abstract getCharge(dayRented: number): number;
    // default
    getFrequentRenterPoints(dayRented: number): number {
        if((this.getPriceCode() === Movie.NEW_RELEASE && dayRented > 1))
            return 2;
        else
            return 1;
    }
}

class ChildrensPrice extends Price {
    getPriceCode(): number {
        return Movie.CHILDRENS;
    }
    getCharge(dayRented: number): number {
        let result = 1.5;
        if(dayRented > 3){
            result += ( dayRented - 3 ) * 1.5;
        }
        return result;
    }
}
class NewReleasePrice extends Price {
    getPriceCode(): number {
        return Movie.NEW_RELEASE;
    }
    getCharge(dayRented: number): number {
        return dayRented * 3;
    }
    getFrequentRenterPoints(dayRented: number): number {
        return dayRented > 1 ? 2 : 1;
    }
}
class RegularPrice extends Price {
    getPriceCode(): number {
        return Movie.REGULAR;
    }
    getCharge(dayRented: number): number {
        let result = 2;
        if(dayRented > 2){
            result += ( dayRented - 2 ) * 1.5;
        }
        return result;
    }
}
class Movie {
    static  CHILDRENS: number = 2;
    static  REGULAR: number = 0;
    static  NEW_RELEASE: number = 1;
    private _price: Price;
    constructor(private _title: string, priceCode: number ) {
        this.setPriceCode(priceCode);
    }

    getPriceCode(): number {
        return this._price.getPriceCode();
    }
    setPriceCode(arg: number): void {
        switch(arg){
            case Movie.REGULAR:
                this._price = new RegularPrice();
                break;
            case Movie.CHILDRENS:
                this._price = new ChildrensPrice();
                break;
            case Movie.NEW_RELEASE:
                this._price = new NewReleasePrice();
                break;
            default:
                throw new Error('Incorrect Price Code');
        }
    }
    getTitle(): string {
        return this._title;
    }
    getFrequentRenterPoints(dayRented: number): number {
        // 使用getter的好处在这里吧，getPriceCode的逻辑变了，不用改这里代码
        if((this.getPriceCode() === Movie.NEW_RELEASE && dayRented > 1))
            return 2;
        else
            return 1;
    }
    getCharge(dayRented: number): number {
        return this._price.getCharge(dayRented)
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